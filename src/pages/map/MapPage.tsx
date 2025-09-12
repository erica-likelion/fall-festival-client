import { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { MapPageBottomSheet } from '@/features/map';
import { NavBar } from '@/components/nav-bar';
import { Tabs } from '@/components/tabs';
import SearchBar from '@/components/search-bar/SearchBar';
import DaySelectorModal from '@/components/day-selector-modal/DaySelectorModal';
import { DAYS, CATEGORIES } from '@/constants/map';
import { FESTIVAL_START_DATE, FESTIVAL_TOTAL_DAYS } from '@/constants/festival/dates';
import { getCurrentFestivalDayKorea } from '@/utils/newDateUtils';
import * as S from './MapPage.styles';
import { useLayoutStore } from '@/stores/useLayoutStore';
import ReCenterButtonIcon from '@/assets/icons/re-center.svg?react';
import { useKakaoMap } from '@/hooks/useKakaoMap';
import { MapDataItem } from '@/features/map/bottomsheet/BottomSheet.types';
import { useMarkerStore } from '@/stores/useMarkerStore';
import { useBooths } from '@/hooks/useBooth';

export default function Map() {
  // URL에서 itemId 파라미터 가져오기
  const { itemId: itemIdParam } = useParams<{ itemId?: string }>();
  // 파라미터를 숫자로 변환
  const itemId = itemIdParam ? Number(itemIdParam) : undefined;
  const navigate = useNavigate();
  const location = useLocation();
  const mapRef = useRef<HTMLDivElement>(null);

  // 현재 날짜에 기반한 페스티벌 일차 계산 (한국 시간 기준)
  const currentDay = getCurrentFestivalDayKorea(FESTIVAL_START_DATE, FESTIVAL_TOTAL_DAYS) as DAYS;

  // 날짜 및 카테고리 관련 상태
  const [selectedDay, setSelectedDay] = useState<DAYS>(currentDay);
  const [selectedCategory, setSelectedCategory] = useState<CATEGORIES | null>(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false);

  // 지도 카테고리 상태
  const [selectedMapCategory, setSelectedMapCategory] = useState<string>('');
  const [isFromSearchPage, setIsFromSearchPage] = useState<boolean>(false);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  // 🔥 단일 아이템 검색 모드 상태 추가
  const [singleItemMode, setSingleItemMode] = useState<boolean>(false);
  const [singleItem, setSingleItem] = useState<MapDataItem | null>(null);
  const [singleItemSearchKeyword, setSingleItemSearchKeyword] = useState<string>('');

  // Marker store 사용
  const {
    fetchMarkers,
    markers,
    loading: isApiLoading,
    error: markerError,
    isInitialized,
  } = useMarkerStore();

  // Booth API 사용
  const { booths } = useBooths();

  // 모달 상태
  const [isDayModalOpen, setIsDayModalOpen] = useState<boolean>(false);

  // 카테고리 매핑
  const categoryMapping: Record<string, CATEGORIES | null> = useMemo(
    () => ({
      프로모션: '프로모션',
      주점: '주점',
      푸드트럭: '푸드트럭',
      콘텐츠: '콘텐츠',
      화장실: '화장실',
      AED: 'AED',
      '온열질환 대비소': '온열질환 대비소',
      셔틀콕: '셔틀콕',
      공연장: '공연장',
      흡연실: '흡연구역',
      '주류 구매': '주류 구매',
      플리마켓: '플리마켓',
    }),
    [],
  );

  // API 카테고리를 내부 카테고리로 매핑
  const apiCategoryMapping: Record<string, string> = useMemo(
    () => ({
      이벤트: '프로모션',
      콘텐츠: '콘텐츠',
      화장실: '화장실',
      AED: 'AED',
      의무실: '온열질환 대비소',
      셔틀콕: '셔틀콕',
      공연장: '공연장',
      푸드트럭: '푸드트럭',
      흡연실: '흡연구역',
      '주류 구매': '주류 구매',
      플리마켓: '플리마켓',
    }),
    [],
  );

  // API 데이터를 MapData 형식으로 변환하는 함수
  const convertApiDataToMapData = useCallback((): MapDataItem[] => {
    return markers
      .filter((item) => {
        // closedDays에 현재 선택된 날짜가 포함되어 있으면 제외
        const currentDayString = selectedDay.replace('일차', '일차');
        return !item.closedDays.includes(currentDayString);
      })
      .map((item) => ({
        id: item.id,
        image: item.image,
        title: item.name,
        subtitle: apiCategoryMapping[item.category] || item.category,
        time: item.time,
        lat: item.latitude,
        lng: item.longitude,
        closeDay: item.closedDays as ('1일차' | '2일차' | '3일차')[],
        path:
          item.linkType === 'STATIC' ? undefined : `/${item.linkType.toLowerCase()}/${item.linkId}`,
      }));
  }, [selectedDay, apiCategoryMapping, markers]);

  // 통합된 맵 데이터 (모든 카테고리를 API 데이터로 사용)
  const integratedMapData = useMemo(() => {
    // API 데이터가 로딩 중이면 빈 데이터 반환 (하드코딩된 데이터 사용 안함)
    if (isApiLoading || booths.length === 0 || markers.length === 0) {
      return {
        주점: [],
        '주류 구매': [],
        플리마켓: [],
        프로모션: [],
        콘텐츠: [],
        화장실: [],
        공연장: [],
        셔틀콕: [],
        푸드트럭: [],
        흡연구역: [],
        '온열질환 대비소': [],
        AED: [],
      };
    }

    const apiMapData = convertApiDataToMapData();

    // Booth API 데이터를 MapDataItem 형태로 변환
    // /api/markers에서 주점 카테고리의 좌표 정보를 가져와서 매칭
    const boothMarkers = apiMapData.filter((item: MapDataItem) => item.subtitle === '주점');

    const boothApiData: MapDataItem[] = booths.map((booth) => {
      // markers API에서 해당 주점의 좌표 정보 찾기
      const markerInfo = boothMarkers.find((marker) => marker.id === booth.id);

      return {
        id: booth.id,
        image: booth.profileImage,
        title: booth.pubName,
        subtitle: '주점',
        time: markerInfo?.time || '18:00-24:00',
        path: `/booth/${booth.id}`,
        lat: markerInfo?.lat,
        lng: markerInfo?.lng,
        closeDay: markerInfo?.closeDay || [],
        canPickup: booth.takeout, // 포장가능 정보 추가
      };
    });

    return {
      // 모든 카테고리를 API 데이터로만 구성 (하드코딩된 MapData 제거)
      주점: boothApiData, // Booth API 데이터 사용
      '주류 구매': apiMapData.filter((item: MapDataItem) => item.subtitle === '주류 구매'),
      플리마켓: apiMapData.filter((item: MapDataItem) => item.subtitle === '플리마켓'),
      프로모션: apiMapData.filter((item: MapDataItem) => item.subtitle === '프로모션'),
      콘텐츠: apiMapData.filter((item: MapDataItem) => item.subtitle === '콘텐츠'),
      화장실: apiMapData.filter((item: MapDataItem) => item.subtitle === '화장실'),
      공연장: apiMapData.filter((item: MapDataItem) => item.subtitle === '공연장'),
      셔틀콕: apiMapData.filter((item: MapDataItem) => item.subtitle === '셔틀콕'),
      푸드트럭: apiMapData.filter((item: MapDataItem) => item.subtitle === '푸드트럭'),
      흡연구역: apiMapData.filter((item: MapDataItem) => item.subtitle === '흡연구역'),
      '온열질환 대비소': apiMapData.filter(
        (item: MapDataItem) => item.subtitle === '온열질환 대비소',
      ),
      AED: apiMapData.filter((item: MapDataItem) => item.subtitle === 'AED'),
    };
  }, [convertApiDataToMapData, isApiLoading, booths, markers]);

  // 카카오맵 커스텀 훅 사용 - 단일 아이템 모드와 단일 아이템 데이터 전달
  const { moveToCurrentLocation, showItemMarker, kakaoMap } = useKakaoMap(
    {
      mapRef,
      center: { lat: 37.294711, lng: 126.833163 }, // 대운동장
      level: 3,
      draggable: true,
      zoomable: true,
      scrollwheel: true,
      isBottomSheetOpen: isBottomSheetOpen || !!selectedMapCategory,
    },
    selectedMapCategory ? categoryMapping[selectedMapCategory] : selectedCategory,
    selectedDay,
    singleItemMode,
    singleItem,
    integratedMapData,
  );

  // itemId가 있을 경우 해당 아이템 자동 선택
  useEffect(() => {
    if (location.state?.fromCloseClick) {
      // fromCloseClick 상태일 때는 모든 선택 상태를 초기화
      setSelectedMapCategory('');
      setSelectedCategory(null);
      setIsBottomSheetOpen(false);
      setSelectedItemId(null);

      // fromCloseClick 상태를 초기화 (한 번만 실행되도록)
      navigate('/map', { replace: true, state: {} });
      return;
    }

    // 탭을 통해 카테고리를 직접 선택한 상태에서는 itemId 처리를 하지 않음
    if (itemId && kakaoMap && !selectedMapCategory && !isApiLoading) {
      // 통합된 데이터에서 아이템 찾기
      let foundItem: MapDataItem | undefined;
      let foundCategory: CATEGORIES | null = null;

      Object.entries(integratedMapData).some(([category, items]) => {
        const item = items.find((it) => it.id === itemId);
        if (item) {
          foundItem = item;
          foundCategory = category as CATEGORIES;
          return true;
        }
        return false;
      });

      if (foundItem && foundCategory) {
        if (selectedCategory !== foundCategory) {
          setSelectedCategory(foundCategory);
        }
        if (selectedItemId !== itemId) {
          setSelectedItemId(itemId);
        }

        setIsFromSearchPage(true);

        // 단일 아이템 모드 활성화
        setSingleItemMode(true);
        setSingleItem(foundItem);
        setSingleItemSearchKeyword(foundItem.title);

        // 해당 카테고리의 selectedMapCategory 설정
        const categoryKey = Object.keys(categoryMapping).find(
          (key) => categoryMapping[key] === foundCategory,
        );
        if (categoryKey) {
          setSelectedMapCategory(categoryKey);
        }

        setTimeout(() => {
          showItemMarker(foundItem as MapDataItem);
        }, 500);
      }
    } else if (!itemId && selectedItemId) {
      // itemId가 없어졌는데 selectedItemId가 있으면 초기화
      setSelectedItemId(null);
      setSingleItemMode(false);
      setSingleItem(null);
      setSingleItemSearchKeyword('');
    }
  }, [
    itemId,
    kakaoMap,
    showItemMarker,
    selectedCategory,
    selectedItemId,
    isApiLoading,
    integratedMapData,
    categoryMapping,
    selectedMapCategory,
    location.state, // ✅ 가드가 동작하도록 반드시 추가
    navigate, // navigate 의존성 추가
  ]);

  // 바텀시트 열기/닫기
  useEffect(() => {
    if (selectedCategory) {
      setIsBottomSheetOpen(true);
    } else {
      setIsBottomSheetOpen(false);
    }
  }, [selectedCategory]);

  // SearchPage에서 전달받은 카테고리 선택 상태 처리
  useEffect(() => {
    // ✅ fromCloseClick 상태가 있으면 처리하지 않음
    if (location.state?.fromCloseClick) {
      return;
    }

    if (location.state?.selectedCategory && location.state?.showBottomSheet) {
      const categoryName = location.state.selectedCategory;

      setSelectedMapCategory(categoryName);
      setIsFromSearchPage(true);

      // 카테고리 매핑을 통해 CATEGORIES 타입으로 변환
      const mappedCategory = categoryMapping[categoryName];
      if (mappedCategory) {
        setSelectedCategory(mappedCategory);
        setIsBottomSheetOpen(true);
      }

      // location state 초기화 (뒤로가기 시 중복 실행 방지)
      navigate(location.pathname, { replace: true });
    }
  }, [location.state, navigate, location.pathname, categoryMapping]);

  // selectedMapCategory가 변경될 때마다 selectedCategory도 동기화
  useEffect(() => {
    // ✅ fromCloseClick 상태가 있으면 처리하지 않음
    if (location.state?.fromCloseClick) {
      return;
    }

    if (selectedMapCategory) {
      const mappedCategory = categoryMapping[selectedMapCategory];
      if (mappedCategory && mappedCategory !== selectedCategory) {
        setSelectedCategory(mappedCategory);
      }
    }
  }, [selectedMapCategory, categoryMapping, selectedCategory, location.state]);

  // 바텀시트가 열리면 하단 네비게이션 숨김 및 지도 리사이즈
  useEffect(() => {
    const shouldHideNav = isBottomSheetOpen || isDayModalOpen;

    if (shouldHideNav) {
      // 바텀시트가 열릴 때 네비게이션 숨김
      useLayoutStore.getState().setIsNav(false);
    } else {
      // 바텀시트가 닫힐 때 네비게이션 다시 표시
      useLayoutStore.getState().setIsNav(true);
    }

    // 카카오맵 리사이즈 (timeout을 통해 DOM 업데이트 이후 실행)
    const timeoutId = setTimeout(() => {
      if (kakaoMap) {
        kakaoMap.relayout();
      }
    }, 300); // 바텀시트 애니메이션이 완료되는 시간과 맞춤

    // cleanup 함수로 timeout 제거
    return () => clearTimeout(timeoutId);
  }, [isBottomSheetOpen, isDayModalOpen, kakaoMap]);

  // 페이지를 벗어날 때 네비게이션 바를 원상복구
  useEffect(() => {
    return () => {
      // 언마운트 시 네비게이션 바를 다시 표시
      useLayoutStore.getState().setIsNav(true);
    };
  }, []);

  // 날짜 바꾸면 카테고리 초기화
  useEffect(() => {
    setSelectedCategory(null);
    // 🔥 단일 아이템 모드도 해제
    setSingleItemMode(false);
    setSingleItem(null);
    setSingleItemSearchKeyword('');
  }, [selectedDay]);

  // 컴포넌트 마운트 시 한 번만 데이터 가져오기
  useEffect(() => {
    if (!isInitialized) {
      fetchMarkers();
    }
  }, [fetchMarkers, isInitialized]);

  // 에러 발생 시 에러 페이지로 이동
  useEffect(() => {
    if (markerError) {
      navigate('/error', {
        state: {
          mainText: '앗! 지도 정보를 불러올 수 없어요.',
          subText: '잠시 후에 다시 시도해주세요!',
          showBackButton: true,
          showHomeButton: true,
        },
      });
    }
  }, [markerError, navigate]);

  const handleSearchClick = () => {
    navigate('/map/search');
  };

  const handleDayChange = (day: string) => {
    if (day === 'open-modal') {
      setIsDayModalOpen(true);
    } else {
      // 선택된 날짜를 상태로 업데이트
      setSelectedDay(day as DAYS);
    }
  };

  const handleDayModalClose = () => {
    setIsDayModalOpen(false);
  };

  const handleMapCategoryChange = (category: string) => {
    // **🔥 탭 카테고리 클릭 시 단일 항목 검색 상태 완전 초기화**
    // 새로운 카테고리를 선택하는 경우 (카테고리 해제가 아닌 경우)
    if (category !== selectedMapCategory && category !== '') {
      setSelectedItemId(null);
      setIsFromSearchPage(false);

      // 🔥 단일 아이템 모드 해제
      setSingleItemMode(false);
      setSingleItem(null);
      setSingleItemSearchKeyword('');

      // URL에 itemId가 있다면 제거
      if (itemId) {
        navigate('/map', { replace: true });
      }
    }

    // 같은 카테고리를 클릭하면 선택 해제, 다른 카테고리를 클릭하면 선택
    const newCategory = category === selectedMapCategory ? '' : category;
    setSelectedMapCategory(newCategory);

    // **검색 상태 관리 로직 간소화**
    if (newCategory) {
      setIsFromSearchPage(false);
    }

    // 바텀시트를 위한 카테고리 설정
    if (newCategory) {
      const mappedCategory = categoryMapping[newCategory];
      setSelectedCategory(mappedCategory);
    } else {
      setSelectedCategory(null);
      setSelectedItemId(null);
      // 🔥 단일 아이템 모드도 해제
      setSingleItemMode(false);
      setSingleItem(null);
      setSingleItemSearchKeyword('');
    }
  };

  // 현재 위치로 이동 핸들러
  const handleReCenterClick = () => {
    moveToCurrentLocation(); // 현재 위치로 이동
  };

  // 홈으로 이동 핸들러
  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <S.MapContainer>
      <S.MapWrapper ref={mapRef} $isBottomSheetOpen={isBottomSheetOpen || !!selectedMapCategory} />
      <S.ReCenterButton
        $isBottomSheetOpen={isBottomSheetOpen || !!selectedMapCategory}
        onClick={handleReCenterClick}
      >
        <ReCenterButtonIcon />
      </S.ReCenterButton>
      <S.ContentContainer>
        <S.TopBarBackground $isFromSearch={!!(isFromSearchPage && selectedMapCategory)} />
        <NavBar
          isBack={isFromSearchPage && selectedMapCategory ? true : false}
          hideLeft={isFromSearchPage && selectedMapCategory ? false : true}
          title={
            isFromSearchPage && selectedMapCategory
              ? singleItemMode
                ? singleItemSearchKeyword // 단일 검색어일 때는 검색어 표시
                : selectedMapCategory // 카테고리 검색일 때는 카테고리명 표시
              : '지도'
          }
          isClose={true} // 항상 X 버튼 표시
          backPath={isFromSearchPage && selectedMapCategory ? '/map/search' : undefined}
          onCloseClick={() => {
            if (isFromSearchPage && selectedMapCategory) {
              // 검색 페이지에서 온 경우: 검색 상태 초기화 후 /map으로 이동
              setSelectedMapCategory(() => '');
              setSelectedCategory(() => null);
              setIsBottomSheetOpen(() => false);
              setIsFromSearchPage(() => false);
              setSingleItemMode(() => false);
              setSingleItem(() => null);
              setSingleItemSearchKeyword(() => '');
              setSelectedItemId(() => null);

              navigate('/map', {
                replace: true,
                state: { fromCloseClick: true },
              });
            } else {
              // 일반적인 경우: 홈으로 이동
              handleHomeClick();
            }
          }}
          opacity={true}
          isSearchMode={isFromSearchPage && selectedMapCategory ? true : false}
        />
        {!(isFromSearchPage && selectedMapCategory) && (
          <S.SearchBarContainer>
            <SearchBar
              selectedDay={`${selectedDay}`}
              onSearchClick={handleSearchClick}
              onDayChange={handleDayChange}
            />
          </S.SearchBarContainer>
        )}
        <S.CategoryTabsContainer $isFromSearch={!!(isFromSearchPage && selectedMapCategory)}>
          <Tabs
            tabs={[
              '프로모션',
              '주점',
              '푸드트럭',
              '콘텐츠',
              '화장실',
              'AED',
              '온열질환 대비소',
              '셔틀콕',
              '공연장',
              '흡연실',
              '주류 구매',
              '플리마켓',
            ]}
            activeTab={selectedMapCategory}
            onTabClick={handleMapCategoryChange}
            autoWidth={true}
            margin="1.5rem"
            gap="0.25rem"
          />
        </S.CategoryTabsContainer>
        {(isBottomSheetOpen || selectedMapCategory) && (
          <S.BottomSheetContainer>
            <MapPageBottomSheet
              key={`bottomsheet-${selectedCategory}-${selectedDay}`}
              selectedCategory={selectedCategory}
              selectedDay={selectedDay}
              onItemClick={showItemMarker}
              selectedItemId={selectedItemId}
              customMapData={integratedMapData}
            />
          </S.BottomSheetContainer>
        )}
      </S.ContentContainer>

      <DaySelectorModal
        isOpen={isDayModalOpen}
        selectedDay={`${selectedDay}`}
        onDaySelect={handleDayChange}
        onClose={handleDayModalClose}
      />
    </S.MapContainer>
  );
}
