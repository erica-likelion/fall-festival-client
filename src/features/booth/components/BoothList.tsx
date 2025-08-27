import * as S from './BoothList.styles';
import { ImageTextFrameWithOrganization } from '@/components/image-text-frame';
import { Notification } from '@/components/notification';
import { useNavigate, useLocation } from 'react-router-dom';
import { BOOTH_LIST } from '@/constants/booth/booth';
import { Fragment } from 'react/jsx-runtime';
import { useFavorites } from '@/hooks/useFavorites';

import FavoriteOn from 'src/assets/icons/favorite-on.svg?react';
import FavoriteOff from 'src/assets/icons/favorite-off.svg?react';

export default function BoothList() {
  const navigate = useNavigate();
  const location = useLocation();
  const { handleToggleFavorite, isFavorited } = useFavorites();

  return (
    <S.Container>
      <Notification title="[공지] 미취학 아동 입장 제한" width="100%" />
      <S.Header>
        <S.Count>전체 26개</S.Count>
      </S.Header>
      <S.BoothList>
        <S.BoothItem>
          {BOOTH_LIST.map((booth) => {
            const isBoothFavorited = isFavorited(booth.id);

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
                    onClick={() =>
                      navigate(`/booth/${booth.id}`, {
                        state: { from: location.pathname + location.search },
                      })
                    }
                  />
                  <S.FavoriteButton
                    onClick={(e) => handleToggleFavorite(booth.id, e)}
                    $isFavorited={isBoothFavorited}
                    aria-label={isBoothFavorited ? '찜 완료' : '찜하기'}
                  >
                    {isBoothFavorited ? <FavoriteOn /> : <FavoriteOff />}
                    {isBoothFavorited ? '찜 완료' : '찜하기'}
                  </S.FavoriteButton>
                </S.BoothItemWrapper>
                <S.HorizontalLine />
              </Fragment>
            );
          })}
        </S.BoothItem>
      </S.BoothList>
    </S.Container>
  );
}
