import { useKakaoMap } from '@/hooks/useKakaoMap';
import * as S from './BoothLocation.styles';
import { useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMarkerStore } from '@/stores/useMarkerStore';
import RightIcon from '@/assets/icons/arrow-right.svg?react';

export default function BoothLocation({
  id,
  boothLocation,
}: {
  id: number;
  boothLocation: string;
}) {
  const mapRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { markers, fetchMarkers, isInitialized } = useMarkerStore();

  // 현재 부스 마커 데이터
  const boothMarker = useMemo(
    () => markers.find((marker) => marker.id === id && marker.category === '주점'),
    [markers, id],
  );

  // 단일 부스용 맵 데이터
  const singleBoothData = useMemo(() => {
    if (!boothMarker) return null;

    return {
      id: boothMarker.id,
      title: boothMarker.name,
      subtitle: '주점',
      lat: boothMarker.latitude,
      lng: boothMarker.longitude,
      time: boothMarker.time,
      image: boothMarker.image,
      path: `/booth/${boothMarker.id}`,
      closeDay: boothMarker.closedDays as ('1일차' | '2일차' | '3일차')[],
    };
  }, [boothMarker]);

  const { showItemMarker } = useKakaoMap(
    {
      mapRef,
      center: {
        lat: boothMarker?.latitude || 37.295936,
        lng: boothMarker?.longitude || 126.835424,
      },
      level: 2,
      draggable: true,
      zoomable: true,
      scrollwheel: true,
    },
    '주점',
    '1일차',
    true, // 단일 아이템 모드
    singleBoothData,
    // singleBoothData가 있을 때만 customMapData 제공, 없으면 빈 객체 제공
    {
      주점: singleBoothData ? [singleBoothData] : [],
      '주류 구매 위치': [],
      플리마켓: [],
      프로모션: [],
      콘텐츠: [],
      화장실: [],
      '온열질환 대비소': [],
      공연장: [],
      셔틀콕: [],
      푸드트럭: [],
      흡연구역: [],
      AED: [],
    },
  );

  // 데이터 로드
  useEffect(() => {
    if (!isInitialized) fetchMarkers();
  }, [fetchMarkers, isInitialized]);

  // 마커 표시
  useEffect(() => {
    if (singleBoothData) {
      const timer = setTimeout(() => showItemMarker(singleBoothData), 500);
      return () => clearTimeout(timer);
    }
  }, [singleBoothData, showItemMarker]);

  return (
    <S.Container>
      <S.Title>위치</S.Title>
      <S.Locate>{boothLocation.replace('.', '-')}</S.Locate>
      <S.Map ref={mapRef}>
        <S.Button onClick={() => navigate(`/map/${id}`, { replace: true })}>
          <S.ButtonText>지도에서 보기</S.ButtonText>
          <RightIcon width="0.55rem" height="0.55rem" />
        </S.Button>
      </S.Map>
    </S.Container>
  );
}
