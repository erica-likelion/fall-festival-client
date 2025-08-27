import { useKakaoMap } from '@/hooks/useKakaoMap';
import * as S from './BoothLocation.styles';
import { useEffect, useRef } from 'react';
import { LOCATION_DATA } from '@/constants/map/LOC_DATA';
import { MapData, MapDataItem } from '@/constants/map/MapData';
import { useNavigate } from 'react-router-dom';
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
  const locate = LOCATION_DATA.주점.find((item) => item.id === id); // 예시로 첫 번째 주점 데이터 사용
  const mapData = MapData.주점.find((item) => item.id === id); // 예시로 첫 번째 주점 데이터 사용
  const selectedCategory = '주점'; // 카테고리 선택 로직 필요
  const selectedDay = '1일차'; // 날짜 선택 로직 필요
  const { showItemMarker } = useKakaoMap(
    {
      mapRef,
      center: {
        lat: locate?.lat ? locate?.lat : 37.295936,
        lng: locate?.lng ? locate?.lng : 126.835424,
      }, // 대운동장
      level: 2,
      draggable: true,
      zoomable: true,
      scrollwheel: true,
    },
    selectedCategory, // 카테고리 선택 로직은 필요에 따라 구현
    selectedDay,
  );

  useEffect(() => {
    setTimeout(() => {
      showItemMarker(mapData as MapDataItem);
    }, 500);
  });

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
