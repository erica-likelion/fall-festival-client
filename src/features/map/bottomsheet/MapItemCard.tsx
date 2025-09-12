import { MapDataItem } from './BottomSheet.types';
import * as S from './MapItemCard.styles';
import { FavoriteButton } from '@/components/favorite-button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PubBeerIcon from '@/assets/icons/pub_beer.svg?react';

interface MapItemCardProps {
  item: MapDataItem;
  onItemClick?: (item: MapDataItem) => void;
  category?: string; // 카테고리 정보를 전달받기 위한 prop 추가
}

export function MapItemCard({ item, onItemClick, category }: MapItemCardProps) {
  const navigate = useNavigate();

  // 찜하기 기능 상태 관리 (localStorage)
  const [favorites, setFavorites] = useState<number[]>(() => {
    const saved = localStorage.getItem('booth-favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const handleToggleFavorite = (boothId: number, event: React.MouseEvent) => {
    event.stopPropagation();

    setFavorites((prev) => {
      const newFavorites = prev.includes(boothId)
        ? prev.filter((id) => id !== boothId)
        : [...prev, boothId];

      localStorage.setItem('booth-favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  // 주점 카테고리인 경우 찜하기 버튼과 함께 표시
  if (category === '주점' && item.id) {
    const isFavorited = favorites.includes(item.id);

    return (
      <S.BoothItemWrapper>
        <S.MapItemCardContainer
          onClick={() => {
            // 주점 카테고리인 경우 상세페이지로 이동
            if (category === '주점' && item.id) {
              navigate(`/booth/${item.id}`, {
                state: { from: '/map', fromType: 'map' },
              });
            } else if (onItemClick && item.lat && item.lng) {
              onItemClick(item);
            }
          }}
        >
          <S.ItemImage src={item.image} alt={item.title} />
          <S.ItemContent>
            <S.ItemTitle>{item.title}</S.ItemTitle>
            <S.ItemCategory>{category}</S.ItemCategory>
            {item.canPickup && (
              <S.Pickup>
                <PubBeerIcon width="0.75rem" height="0.75rem" />
                포장가능
              </S.Pickup>
            )}
          </S.ItemContent>
        </S.MapItemCardContainer>
        <FavoriteButton
          id={item.id}
          isFavorited={isFavorited}
          onClick={handleToggleFavorite}
          mode="favorite"
        />
      </S.BoothItemWrapper>
    );
  }

  // 푸드트럭 카테고리인 경우 특별 처리
  if (category === '푸드트럭') {
    return (
      <S.MapItemCardContainer
        onClick={() => {
          // 푸드트럭 클릭 시 공지사항으로 이동
          navigate('/main/notice/21');
        }}
      >
        <S.ItemImage src={item.image} alt={item.title} />
        <S.ItemContent>
          <S.ItemTitle>{item.title}</S.ItemTitle>
          <S.ItemCategory>{category}</S.ItemCategory>
        </S.ItemContent>
      </S.MapItemCardContainer>
    );
  }

  // 주류 구매 카테고리인 경우 특별 처리
  if (category === '주류 구매') {
    return (
      <S.MapItemCardContainer
        onClick={() => {
          // 주류 구매 클릭 시 공지사항으로 이동
          navigate('/main/notice/18');
        }}
      >
        <S.ItemImage src={item.image} alt={item.title} />
        <S.ItemContent>
          <S.ItemTitle>{item.title}</S.ItemTitle>
          <S.ItemCategory>{category}</S.ItemCategory>
        </S.ItemContent>
      </S.MapItemCardContainer>
    );
  }

  // 플리마켓 카테고리인 경우 특별 처리
  if (category === '플리마켓') {
    return (
      <S.MapItemCardContainer
        onClick={() => {
          // 플리마켓 클릭 시 공지사항으로 이동
          navigate('/main/notice/10');
        }}
      >
        <S.ItemImage src={item.image} alt={item.title} />
        <S.ItemContent>
          <S.ItemTitle>{item.title}</S.ItemTitle>
          <S.ItemCategory>{category}</S.ItemCategory>
        </S.ItemContent>
      </S.MapItemCardContainer>
    );
  }

  // 주점이 아닌 경우 기본 디자인 사용
  return (
    <S.MapItemCardContainer
      onClick={() => {
        if (onItemClick && item.lat && item.lng) {
          onItemClick(item);
        }
      }}
    >
      <S.ItemImage src={item.image} alt={item.title} />
      <S.ItemContent>
        <S.ItemTitle>{item.title}</S.ItemTitle>
        <S.ItemCategory>{category}</S.ItemCategory>
      </S.ItemContent>
    </S.MapItemCardContainer>
  );
}
