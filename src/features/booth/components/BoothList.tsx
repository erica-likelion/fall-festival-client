import * as S from './BoothList.styles';
import { ImageTextFrameWithOrganization } from '@/components/image-text-frame';
import { Notification } from '@/components/notification';
import { FavoriteButton } from '@/components/favorite-button';
import PageLoadingSpinner from '@/components/loading/PageLoadingSpinner';
import { useNavigate, useLocation } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';
import { useState } from 'react';
import { useBooths } from '@/hooks/useBooth';
import { useBoothNotificationStore } from '@/stores/useBoothNotificationStore';
import { CATEGORY_NOTIFICATIONS } from '@/constants/map/CategoryNotifications';

interface BoothListProps {
  showFavoritesOnly?: boolean;
  hideTabs?: boolean;
}

export default function BoothList({ showFavoritesOnly = false, hideTabs = false }: BoothListProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { booths, loading, error } = useBooths();
  const { isBoothNotificationClosed, closeBoothNotification } = useBoothNotificationStore();

  // 찜하기 기능 상태 관리 추가 (localStorage)
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

  // 찜한 주점들만 필터링 (showFavoritesOnly가 true일 때)
  const displayBooths = showFavoritesOnly
    ? booths.filter((booth) => favorites.includes(booth.id))
    : booths;

  if (loading) {
    return <PageLoadingSpinner />;
  }

  if (error) {
    navigate('/error', {
      state: {
        mainText: '서버가 힘들어하고 있어요.',
        subText: '멋사가 금방 고쳐올테니, 잠시 후에 다시 와주세요!',
        showBackButton: true,
        showHomeButton: true,
      },
    });
    return null;
  }

  const boothNotification = CATEGORY_NOTIFICATIONS['주점'];

  const handleNotificationClick = () => {
    if (boothNotification?.path) {
      navigate(boothNotification.path);
    }
  };

  return (
    <S.Container>
      {!isBoothNotificationClosed && boothNotification && (
        <Notification
          title={boothNotification.title}
          width="100%"
          onClick={handleNotificationClick}
          onClose={closeBoothNotification}
        />
      )}
      {!hideTabs && (
        <S.TabContainer width="100%">
          <S.TabSlider $activeIndex={showFavoritesOnly ? 1 : 0} />
          <S.TabButton $active={!showFavoritesOnly} onClick={() => navigate('/booth')}>
            전체 주점
          </S.TabButton>
          <S.TabButton $active={showFavoritesOnly} onClick={() => navigate('/favorites')}>
            찜한 주점
          </S.TabButton>
        </S.TabContainer>
      )}
      <S.Header>
        <S.Count>전체 {displayBooths.length}개</S.Count>
      </S.Header>

      {showFavoritesOnly && displayBooths.length === 0 ? (
        <S.EmptyState>
          <S.EmptyText>
            찜한 주점이 없어요.{'\n'}
            원하는 주점의 찜하기 버튼을 눌러보세요!
          </S.EmptyText>
        </S.EmptyState>
      ) : (
        <S.BoothList>
          <S.BoothItem>
            {displayBooths.map((booth) => {
              const isFavorited = favorites.includes(booth.id);

              return (
                <Fragment key={booth.id}>
                  <S.BoothItemWrapper>
                    <ImageTextFrameWithOrganization
                      key={booth.id}
                      width="100%"
                      image={booth.profileImage}
                      title={booth.pubName}
                      organization={booth.affiliation}
                      canPickup={booth.takeout}
                      boothId={booth.id}
                      onClick={() =>
                        navigate(`/booth/${booth.id}`, {
                          state: { from: location.pathname + location.search },
                        })
                      }
                    />
                    <FavoriteButton
                      id={booth.id}
                      isFavorited={isFavorited}
                      onClick={handleToggleFavorite}
                      mode={showFavoritesOnly ? 'delete' : 'favorite'}
                    />
                  </S.BoothItemWrapper>
                  {!hideTabs && <S.HorizontalLine />}
                </Fragment>
              );
            })}
          </S.BoothItem>
        </S.BoothList>
      )}
    </S.Container>
  );
}
