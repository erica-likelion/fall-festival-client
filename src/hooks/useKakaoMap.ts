import { useEffect, useRef, useCallback, useState } from 'react';
import { KakaoMapOptions } from '@/types/kakao-maps';
import { getCategoryMarkerImage, markerIcons } from '@/utils/markerIcons';
import { CATEGORIES } from '@/constants/map';
import { DAYS } from '@/constants/map';
import { MapData, MapDataItem } from '@/constants/map/MapData';

export function useKakaoMap(
  options: KakaoMapOptions = {},
  selectedCategory: CATEGORIES | null = null,
  selectedDay: DAYS,
  singleItemMode: boolean = false, // 단일 아이템 모드 매개변수 추가
  singleItem: MapDataItem | null = null, // 단일 아이템 데이터 매개변수 추가
  customMapData?: Record<CATEGORIES, MapDataItem[]>, // 통합된 맵 데이터
) {
  // 커스텀 오버레이 참조 저장
  const internalMapRef = useRef<HTMLDivElement>(null);
  const kakaoMapRef = useRef<kakao.maps.Map | null>(null);
  const myLocationMarkerRef = useRef<kakao.maps.Marker | null>(null);
  const customOverlaysRef = useRef<kakao.maps.CustomOverlay[]>([]);
  const customPolygonsRef = useRef<kakao.maps.Polygon[]>([]);

  // 사용할 데이터 소스 결정 (customMapData가 있으면 사용, 없으면 기본 MapData 사용)
  const dataSource = customMapData || MapData;

  // 지도 크기가 변경될 때 relayout 호출
  useEffect(() => {
    const map = kakaoMapRef.current;
    if (!map) return;

    // 바텀시트 애니메이션 완료 후에 relayout 호출
    const timeoutId = setTimeout(() => {
      map.relayout();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [options.isBottomSheetOpen]);
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);
  const [scriptLoaded, setScriptLoaded] = useState<boolean>(false);
  // 선택된 개별 항목의 마커를 위한 상태
  const selectedItemMarkerRef = useRef<kakao.maps.CustomOverlay | null>(null);
  // 드래그 상태 관리를 위한 상태
  const isDraggingRef = useRef<boolean>(false);

  // 타입 안전성을 위해 mapRef를 정의
  const mapRef = options.mapRef || internalMapRef;

  useEffect(() => {
    const initializeMap = () => {
      // 초기화 조건이 모두 충족되지 않았다면 초기화 시도 안함
      if (!scriptLoaded || !mapRef.current || kakaoMapRef.current) {
        return;
      }

      try {
        console.log('[KakaoMap] 지도 초기화 시작');
        // 지도 옵션 설정
        const mapOptions = {
          center: new window.kakao.maps.LatLng(
            options.center?.lat ?? 37.29644017218779,
            options.center?.lng ?? 126.83516599926162,
          ),
          level: options.level ?? 3,
          draggable: options.draggable ?? true,
          zoomable: options.zoomable ?? true,
          scrollwheel: options.scrollwheel ?? true,
        };
        console.log('[KakaoMap] 지도 옵션:', mapOptions);

        // 지도 초기화
        const map = new window.kakao.maps.Map(mapRef.current, mapOptions);
        console.log('[KakaoMap] 지도 객체 생성 완료:', !!map);

        kakaoMapRef.current = map;

        // 모바일 핀치 줌 관련 설정
        map.setZoomable(true);
        enableMultiTouch(mapRef.current);

        setMapLoaded(true);
        console.log('[KakaoMap] 지도 초기화 완료');
      } catch (error) {
        console.error('[KakaoMap] 지도 초기화 중 오류 발생:', error);
      }
    };

    const enableMultiTouch = (element: HTMLDivElement | null) => {
      if (!element) return;

      // 터치 이벤트 전파 막지 않도록 설정
      element.style.touchAction = 'manipulation';

      // 제스처 이벤트 핸들러
      const preventGesture = (e: Event) => e.preventDefault();

      // 모바일 사파리 등에서 핀치 줌 제스처 허용
      document.addEventListener('gesturestart', preventGesture, { passive: false });
      document.addEventListener('gesturechange', preventGesture, { passive: false });
      document.addEventListener('gestureend', preventGesture, { passive: false });

      // 이벤트 리스너 정리 함수 반환
      return () => {
        document.removeEventListener('gesturestart', preventGesture);
        document.removeEventListener('gesturechange', preventGesture);
        document.removeEventListener('gestureend', preventGesture);
      };
    };

    // 초기화 조건 로깅
    console.log('[KakaoMap] 초기화 조건 상태:', {
      scriptLoaded,
      mapRefExists: !!mapRef.current,
      kakaoMapRefNotExists: !kakaoMapRef.current,
    });

    // 초기화 시도
    initializeMap();

    // 이벤트 리스너 제거를 위한 정리 함수
    const cleanup = enableMultiTouch(mapRef.current);
    return () => {
      if (cleanup) cleanup();
    };
  }, [options, mapRef, scriptLoaded]);

  // 카카오맵 SDK 로드를 위한 별도 useEffect
  useEffect(() => {
    const loadKakaoSDK = () => {
      // 이미 로드되었거나 로드 중인 경우 중복 로드 방지
      if (window.kakao && window.kakao.maps) {
        console.log('[KakaoMap] 이미 로드된 kakao 객체 감지');
        setScriptLoaded(true);
        return;
      }

      console.log('[KakaoMap] 카카오맵 스크립트 로드 시작');

      // 기존 스크립트가 있다면 제거 (중복 로드 방지)
      const existingScript = document.querySelector('script[src*="dapi.kakao.com"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }

      const script = document.createElement('script');
      const apiKey = import.meta.env.VITE_KAKAO_MAP_API_KEY;

      // 스크립트 속성 설정
      script.type = 'text/javascript';
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&libraries=services,clusterer,drawing&autoload=false`;
      script.async = true; // 비동기 로드 사용

      // 로드 이벤트 핸들러
      script.onload = () => {
        console.log('[KakaoMap] 스크립트 로드 성공');
        if (window.kakao && window.kakao.maps) {
          window.kakao.maps.load(() => {
            console.log('[KakaoMap] kakao.maps.load 콜백 실행');
            setScriptLoaded(true);
          });
        }
      };

      script.onerror = (error) => {
        console.error('[KakaoMap] 스크립트 로드 실패:', error);
      };

      document.head.appendChild(script);
    };

    loadKakaoSDK();

    // 컴포넌트가 언마운트될 때 상태 초기화
    return () => {
      setScriptLoaded(false);
      setMapLoaded(false);
    };
  }, []);

  const moveToCurrentLocation = useCallback(() => {
    console.log('[KakaoMap] 현재 위치로 이동 요청');

    // 지도가 아직 초기화되지 않은 경우 실행하지 않음
    if (!kakaoMapRef.current) {
      console.warn('[KakaoMap] 지도가 초기화되지 않아 현재 위치 이동을 수행할 수 없습니다.');
      return;
    }

    // 미리 기본 위치 설정 (한양대 에리카 캠퍼스)
    const defaultLocation = {
      lat: 37.29644017218779,
      lng: 126.83516599926162,
    };

    // 기본 위치로 먼저 이동 (위치 정보 획득 실패 시 폴백으로 사용)
    if (kakaoMapRef.current) {
      const defaultPosition = new window.kakao.maps.LatLng(
        defaultLocation.lat,
        defaultLocation.lng,
      );

      // 지도 중심 이동
      kakaoMapRef.current.setCenter(defaultPosition);
      kakaoMapRef.current.setLevel(3);
    }

    if ('geolocation' in navigator) {
      console.log('[KakaoMap] Geolocation API 사용 가능');

      // 기존 마커 제거
      if (myLocationMarkerRef.current) {
        myLocationMarkerRef.current.setMap(null);
      }

      // 위치 정보 권한 상태 확인 (크롬과 같은 일부 브라우저에서만 작동)
      try {
        if (navigator.permissions && navigator.permissions.query) {
          navigator.permissions.query({ name: 'geolocation' }).then((result) => {
            console.log(`[KakaoMap] 위치 권한 상태: ${result.state}`);
            if (result.state === 'denied') {
              alert(
                '위치 정보 접근이 차단되어 있습니다. 브라우저 설정에서 위치 정보 접근을 허용해주세요.',
              );

              // 권한 거부 시 기본 위치에 마커 표시
              showDefaultMarker();
              return;
            }
          });
        }
      } catch (error) {
        console.log('[KakaoMap] 권한 상태 확인 실패:', error);
      }

      // 로딩 인디케이터 표시하거나 사용자에게 알림
      console.log('[KakaoMap] 위치 정보 요청 중...');

      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('[KakaoMap] 위치 정보 수신 성공');
          const { latitude: lat, longitude: lng } = position.coords;
          console.log(`[KakaoMap] 위도: ${lat}, 경도: ${lng}`);

          if (kakaoMapRef.current) {
            // 정확히 동일한 LatLng 객체를 사용하여 일관성 유지
            const currentPosition = new window.kakao.maps.LatLng(lat, lng);

            // 지도 중심 이동
            kakaoMapRef.current.setCenter(currentPosition);

            // 적절한 줌 레벨 설정
            kakaoMapRef.current.setLevel(2);

            // 마커 생성
            const marker = new window.kakao.maps.Marker({
              position: currentPosition,
              map: kakaoMapRef.current,
              image: getCategoryMarkerImage('myLocation'),
              title: '내 위치',
            });

            // 마커 참조 저장
            myLocationMarkerRef.current = marker;
          }
        },
        (error) => {
          console.error('[KakaoMap] 위치 정보 오류:', error.code, error.message);

          // 오류 코드와 메시지 로깅
          let errorMessage = '위치 정보를 가져올 수 없습니다.';

          switch (error.code) {
            case 1: // PERMISSION_DENIED
              errorMessage =
                '위치 정보 접근 권한이 거부되었습니다. 설정에서 위치 서비스를 허용해주세요.';
              break;
            case 2: // POSITION_UNAVAILABLE
              errorMessage =
                '현재 위치를 확인할 수 없습니다. 와이파이나 셀룰러 데이터를 확인해보세요.';
              break;
            case 3: // TIMEOUT
              errorMessage = '위치 정보를 가져오는 데 시간이 너무 오래 걸립니다.';
              break;
          }

          // 사용자에게 오류 알림
          alert(errorMessage);

          // 기본 위치에 마커 표시
          showDefaultMarker();
        },
        {
          enableHighAccuracy: false, // 고정밀도 비활성화 (배터리 절약, 성공률 향상)
          maximumAge: 60000, // 1분까지의 캐시된 위치 허용
          timeout: 15000, // 15초 타임아웃 (충분한 시간 제공)
        },
      );
    } else {
      console.error('이 브라우저에서는 위치 정보를 제공하지 않습니다.');
      alert('이 브라우저에서는 위치 정보 기능을 사용할 수 없습니다.');
      showDefaultMarker();
    }

    // 기본 위치에 마커를 표시하는 내부 함수
    function showDefaultMarker() {
      if (kakaoMapRef.current) {
        const defaultPosition = new window.kakao.maps.LatLng(
          defaultLocation.lat,
          defaultLocation.lng,
        );

        // 마커 생성
        const marker = new window.kakao.maps.Marker({
          position: defaultPosition,
          map: kakaoMapRef.current,
          image: getCategoryMarkerImage('myLocation'),
          title: '기본 위치',
        });

        // 마커 참조 저장
        myLocationMarkerRef.current = marker;
      }
    }
  }, []);

  // 특정 항목의 위치로 이동하고 마커를 표시하는 함수
  const showItemMarker = useCallback(
    (selectedItem: MapDataItem) => {
      const map = kakaoMapRef.current;
      if (
        !map ||
        !selectedItem ||
        !selectedCategory ||
        selectedItem.lat === undefined ||
        selectedItem.lng === undefined
      ) {
        console.warn('[KakaoMap] 지도가 초기화되지 않았거나 항목에 좌표 정보가 없습니다.');
        return;
      }

      console.log(`[KakaoMap] 항목 마커 표시: ${selectedItem.title}`);

      // 선택된 마커의 위치
      const selectedPosition = new kakao.maps.LatLng(selectedItem.lat, selectedItem.lng);

      // 기존의 선택된 마커가 있다면 제거
      if (selectedItemMarkerRef.current) {
        selectedItemMarkerRef.current.setMap(null);
        selectedItemMarkerRef.current = null;
      }

      // 기존의 모든 카테고리 마커를 제거
      customOverlaysRef.current.forEach((overlay) => {
        overlay.setMap(null);
      });
      customOverlaysRef.current = [];

      // 먼저 모든 마커들을 생성하고 저장
      const overlays: { overlay: kakao.maps.CustomOverlay; isSelected: boolean }[] = [];

      // dataSource에서 모든 위치를 처리
      dataSource[selectedCategory].forEach((location) => {
        // closeDay에 해당되는 마커는 건너뛰기
        if (location.closeDay && location.closeDay.includes(selectedDay)) {
          return;
        }

        const isSelected = location.lat === selectedItem.lat && location.lng === selectedItem.lng;
        const position = new kakao.maps.LatLng(location.lat!, location.lng!);

        const overlay = createCustomMarker(
          map,
          position,
          selectedCategory,
          selectedCategory === '주점' ? (isSelected ? location.title : '') : location.title, // 주점만 선택시에 라벨 표시, 나머지는 항상 표시
          () => {
            const mapData = dataSource[selectedCategory].find(
              (item: MapDataItem) => item.lat === location.lat && item.lng === location.lng,
            );
            if (mapData) {
              showItemMarker(mapData);
            }
          },
          isSelected, // 선택된 마커는 큰 크기
          customPolygonsRef, // 다각형 참조 전달
        );

        overlays.push({ overlay, isSelected });
      });

      // 선택되지 않은 마커를 먼저 표시하고, 선택된 마커를 마지막에 표시
      overlays.sort((a, b) => Number(a.isSelected) - Number(b.isSelected));

      // 정렬된 순서대로 마커를 지도에 표시
      overlays.forEach(({ overlay }) => {
        overlay.setMap(map);
        customOverlaysRef.current.push(overlay);
      });

      // 지도 중심 이동 (줌 레벨 유지)
      kakaoMapRef.current?.setCenter(selectedPosition);
    },
    [selectedCategory, selectedDay, dataSource],
  );

  // 지도 크기 변경 감지 및 리사이즈
  useEffect(() => {
    const map = kakaoMapRef.current;
    if (!map) return;

    // 지도 크기가 변경될 때마다 relayout 호출
    map.relayout();
  }, [options]);

  // 🔥 카테고리별 마커 추가 (단일 아이템 모드 지원)
  useEffect(() => {
    // 지도가 로드되지 않은 경우 처리하지 않음
    if (!kakaoMapRef.current) {
      return;
    }

    // MapWrapper 크기 변경 인식을 위한 relayout 호출
    kakaoMapRef.current.relayout();

    // 카테고리가 변경될 때마다 기존 마커와 폴리곤 모두 제거
    // 이전 커스텀 오버레이와 다각형 제거
    customOverlaysRef.current.forEach((overlay) => {
      overlay.setMap(null);
    });
    customPolygonsRef.current.forEach((polygon) => {
      polygon.setMap(null);
    });
    customOverlaysRef.current = [];
    customPolygonsRef.current = [];

    // 선택된 항목 마커가 있다면 제거
    if (selectedItemMarkerRef.current) {
      selectedItemMarkerRef.current.setMap(null);
      selectedItemMarkerRef.current = null;
    }

    // 카테고리가 선택되지 않은 경우 (null) 여기서 종료
    if (!selectedCategory) {
      return;
    }

    console.log(`[KakaoMap] '${selectedCategory}' 카테고리 마커 표시 시작`);
    console.log(`[KakaoMap] 단일 아이템 모드:`, singleItemMode);
    console.log(`[KakaoMap] 단일 아이템:`, singleItem?.title);

    const categoryData = dataSource[selectedCategory];
    console.log(`[KakaoMap] 카테고리 데이터 개수:`, categoryData?.length || 0);

    // categoryData가 없으면 함수 종료
    if (!categoryData) {
      console.log(`[KakaoMap] '${selectedCategory}' 카테고리 데이터가 없습니다.`);
      return;
    }

    // 이전 커스텀 오버레이 제거
    customOverlaysRef.current.forEach((overlay) => {
      overlay.setMap(null);
    });
    customOverlaysRef.current = [];

    // 새 마커 추가
    const overlays: kakao.maps.CustomOverlay[] = [];
    // 경계 계산을 위한 LatLngBounds 객체 생성
    const bounds = new window.kakao.maps.LatLngBounds();

    // 해당 카테고리에 표시할 마커가 있는지 확인하기 위한 플래그
    let hasVisibleMarkers = false;

    // 🔥 단일 아이템 모드인 경우 특정 아이템만 표시
    if (singleItemMode && singleItem) {
      console.log(`[KakaoMap] 단일 아이템 모드 - ${singleItem.title}만 표시`);

      // 해당 아이템과 일치하는 위치 정보 찾기
      const targetLocation = categoryData.find(
        (location) => location.lat === singleItem.lat && location.lng === singleItem.lng,
      );

      if (
        targetLocation &&
        (!targetLocation.closeDay || !targetLocation.closeDay.includes(selectedDay))
      ) {
        const position = new window.kakao.maps.LatLng(targetLocation.lat!, targetLocation.lng!);

        const overlay = createCustomMarker(
          kakaoMapRef.current as kakao.maps.Map,
          position,
          selectedCategory,
          selectedCategory === '주점' ? targetLocation.title : targetLocation.title, // 단일 아이템 모드에서는 항상 라벨 표시
          () => {
            // 마커 클릭 시 실행될 함수
            console.log(`[KakaoMap] 마커 클릭: ${targetLocation.title}`);
            showItemMarker(singleItem);
          },
          true, // 단일 아이템은 항상 선택된 상태로 표시 (큰 크기)
          customPolygonsRef, // 다각형 참조 전달
        );

        // 오버레이를 지도에 표시하고 배열에 추가
        overlay.setMap(kakaoMapRef.current);
        overlays.push(overlay);

        // 경계 확장
        bounds.extend(position);
        hasVisibleMarkers = true;

        console.log(`[KakaoMap] 단일 아이템 마커 생성 완료: ${targetLocation.title}`);
      } else {
        console.log(`[KakaoMap] 단일 아이템을 찾을 수 없거나 운영하지 않는 날입니다.`);
      }
    } else {
      // 🔥 일반 모드인 경우 카테고리 전체 아이템 표시 (기존 로직)
      console.log(`[KakaoMap] 일반 모드 - 전체 ${selectedCategory} 마커 표시`);

      categoryData.forEach((location) => {
        console.log(`[KakaoMap] 마커 생성 시도: ${location.title}`);
        // closeDay에 현재 선택된 날짜가 포함되어 있으면 마커를 표시하지 않음
        if (location.closeDay && location.closeDay.includes(selectedDay)) {
          console.log(`[KakaoMap] ${location.title}은(는) ${selectedDay}에 운영하지 않습니다.`);
          return;
        }

        const position = new window.kakao.maps.LatLng(location.lat!, location.lng!);

        // 텍스트가 있는 커스텀 오버레이 생성
        const overlay = createCustomMarker(
          kakaoMapRef.current as kakao.maps.Map,
          position,
          selectedCategory,
          selectedCategory === '주점' ? '' : location.title, // 주점이 아닌 경우에는 항상 라벨 표시
          () => {
            // 마커 클릭 시 실행될 함수
            console.log(`[KakaoMap] 마커 클릭: ${location.title}`);

            const mapData = dataSource[selectedCategory].find(
              (item: MapDataItem) => item.lat === location.lat && item.lng === location.lng,
            );
            if (mapData) {
              showItemMarker(mapData);
            }
          },
          false, // 초기에는 작은 크기로 표시
          customPolygonsRef, // 다각형 참조 전달
        );

        // 오버레이를 지도에 표시하고 배열에 추가
        overlay.setMap(kakaoMapRef.current);
        overlays.push(overlay);

        // 경계 확장
        bounds.extend(position);
        hasVisibleMarkers = true;
      });
    }

    // 참조 업데이트
    customOverlaysRef.current = overlays;

    // 표시할 마커가 있는 경우에만 지도 이동
    if (hasVisibleMarkers) {
      // MapWrapper 크기 변경이 완료될 때까지 대기
      setTimeout(() => {
        // 🔥 단일 아이템 모드인 경우 해당 위치로 바로 이동
        if (singleItemMode && singleItem) {
          const singlePosition = new window.kakao.maps.LatLng(singleItem.lat!, singleItem.lng!);
          kakaoMapRef.current?.setCenter(singlePosition);
          kakaoMapRef.current?.setLevel(3); // 적절한 줌 레벨 설정
        } else {
          // 일반 모드인 경우 전체 영역을 보여주도록 bounds 설정
          const padding = 50;
          kakaoMapRef.current?.relayout(); // 현재 크기 재계산
          kakaoMapRef.current?.setBounds(bounds, padding);
        }
      }, 100); // 애니메이션 시작 후 약간의 지연을 두어 크기 변경이 완료되도록 함
    }
  }, [selectedCategory, selectedDay, showItemMarker, singleItemMode, singleItem, dataSource]);

  // 드래그 이벤트 처리
  useEffect(() => {
    const map = kakaoMapRef.current;
    if (!map) return;

    // 드래그 시작 시
    const handleDragStart = () => {
      isDraggingRef.current = true;
    };

    // 드래그 종료 시
    const handleDragEnd = () => {
      // 드래그 종료 후 약간의 딜레이를 두고 상태 해제
      setTimeout(() => {
        isDraggingRef.current = false;
      }, 100);
    };

    // 지도 클릭 이벤트 핸들러 (위도/경도 콘솔 출력용)
    const handleMapClick = (mouseEvent: kakao.maps.event.MouseEvent) => {
      const latlng = mouseEvent.latLng;
      console.log('지도 클릭 위치:', {
        위도: latlng.getLat(),
        경도: latlng.getLng(),
        위도_문자열: latlng.getLat().toString(),
        경도_문자열: latlng.getLng().toString(),
      });
    };

    // 이벤트 리스너 등록 및 리스너 ID 저장
    const dragStartListener = kakao.maps.event.addListener(map, 'dragstart', handleDragStart);
    const dragEndListener = kakao.maps.event.addListener(map, 'dragend', handleDragEnd);
    const clickListener = kakao.maps.event.addListener(map, 'click', handleMapClick);

    // 클린업 함수
    return () => {
      // 각 리스너 제거
      kakao.maps.event.removeListener(dragStartListener);
      kakao.maps.event.removeListener(dragEndListener);
      kakao.maps.event.removeListener(clickListener);
    };
  }, []);

  return {
    mapRef,
    kakaoMap: kakaoMapRef.current,
    myLocationMarker: myLocationMarkerRef.current,
    mapLoaded,
    scriptLoaded,
    moveToCurrentLocation,
    showItemMarker, // 바텀시트에서도 마커 선택 기능을 사용할 수 있도록 추가
  };
}

// 로컬에서 사용할 createCustomMarker 함수
const createCustomMarker = (
  _map: kakao.maps.Map,
  position: kakao.maps.LatLng,
  category: CATEGORIES,
  label: string,
  onClick?: () => void,
  isSelected: boolean = false,
  polygonsRef?: React.MutableRefObject<kakao.maps.Polygon[]>,
) => {
  // 카테고리에 맞는 아이콘 URL 가져오기
  const iconUrl = markerIcons[category];
  const shouldShowLabel = category === '주점' ? isSelected : true;
  const content = `
    <div style="position: absolute; display: flex; flex-direction: column; align-items: center; width: 80px; left: 0; top: 0; transform: ${isSelected ? 'translate(-50%, calc(-3.66rem))' : 'translate(-50%, calc(-2.5rem))'};">
      <img src="${iconUrl}" alt="${category}" 
        style="width: ${isSelected ? '3.66rem' : '2.5rem'}; 
               height: ${isSelected ? '3.66rem' : '2.5rem'}; 
               flex-shrink: 0; 
               filter: drop-shadow(0 2px 2px rgb(0 0 0 / 30%)); 
               display: block; 
               margin: 0 auto; 
               position: relative; 
               z-index: 1; 
               pointer-events: auto; 
               cursor: pointer;" 
        class="marker-icon" />
      ${
        label
          ? `<div style="margin-top: 6px; 
                            padding: 0px 4px; 
                            font-size: 12px; 
                            font-weight: bold; 
                            color: #333; 
                            text-align: center; 
                            word-break: keep-all; 
                            white-space: nowrap; 
                            overflow: hidden; 
                            text-overflow: ellipsis; 
                            pointer-events: auto; 
                            display: ${shouldShowLabel ? 'inline-block' : 'none'}; 
                            position: relative; 
                            z-index: 2000; 
                            text-shadow: 0 0 1px #fff, 0 0 2px #fff, 1px 0 0 #fff, -1px 0 0 #fff, 0 1px 0 #fff, 0 -1px 0 #fff, 1px 1px 0 #fff, -1px -1px 0 #fff;">
                 ${label}
               </div>`
          : ''
      }
    </div>
  `;

  const overlay = new kakao.maps.CustomOverlay({
    position,
    content,
    zIndex: isSelected ? 1000 : 1,
    yAnchor: 0.5,
  });

  // 푸드트럭, 플리마켓, 프로모션인 경우 아래에 직사각형 영역 추가
  if (category === '푸드트럭' || category === '플리마켓' || category === '프로모션') {
    const angle = category === '푸드트럭' ? 59 : category === '플리마켓' ? 59 : 59; // 각도 설정
    const angle_rad = angle * (Math.PI / 180); // 라디안으로 변환
    const width = category === '푸드트럭' ? 0.00014 : category === '플리마켓' ? 0.00014 : 0.00014; // 직사각형의 너비
    const height = category === '푸드트럭' ? 0.0015 : category === '플리마켓' ? 0.0011 : 0.0011; // 직사각형의 높이

    // 중심점으로부터의 회전된 꼭지점 계산
    const dx = width / 2;
    const dy = height / 2;

    // 회전된 꼭지점 좌표 계산
    const path = [
      new kakao.maps.LatLng(
        position.getLat() + (Math.cos(angle_rad) * dx - Math.sin(angle_rad) * dy),
        position.getLng() + (Math.sin(angle_rad) * dx + Math.cos(angle_rad) * dy),
      ),
      new kakao.maps.LatLng(
        position.getLat() + (-Math.cos(angle_rad) * dx - Math.sin(angle_rad) * dy),
        position.getLng() + (-Math.sin(angle_rad) * dx + Math.cos(angle_rad) * dy),
      ),
      new kakao.maps.LatLng(
        position.getLat() + (-Math.cos(angle_rad) * dx + Math.sin(angle_rad) * dy),
        position.getLng() + (-Math.sin(angle_rad) * dx - Math.cos(angle_rad) * dy),
      ),
      new kakao.maps.LatLng(
        position.getLat() + (Math.cos(angle_rad) * dx + Math.sin(angle_rad) * dy),
        position.getLng() + (Math.sin(angle_rad) * dx - Math.cos(angle_rad) * dy),
      ),
    ];

    // 카테고리별 색상 설정
    const colors = {
      푸드트럭: { stroke: '#F893AD', fill: 'rgba(248, 147, 173, 0.20)' },
      플리마켓: { stroke: '#F893AD', fill: 'rgba(248, 147, 173, 0.20)' },
      프로모션: { stroke: '#F893AD', fill: 'rgba(248, 147, 173, 0.20)' },
    };

    const polygon = new kakao.maps.Polygon({
      path: path,
      strokeWeight: 1,
      strokeColor: colors[category as keyof typeof colors].stroke,
      strokeOpacity: 1,
      strokeStyle: 'solid',
      fillColor: colors[category as keyof typeof colors].fill,
      fillOpacity: 0.3,
    });

    polygon.setMap(_map);
    // 다각형 참조 저장
    if (polygonsRef) {
      polygonsRef.current.push(polygon);
    }
  }

  if (onClick) {
    const overlayElement = overlay.getContent();
    if (overlayElement && typeof overlayElement === 'string') {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = overlayElement;
      const markerIcon = tempDiv.querySelector('.marker-icon');
      if (markerIcon) {
        markerIcon.addEventListener('click', onClick);
        overlay.setContent(tempDiv);
      }
    }
  }

  return overlay;
};
