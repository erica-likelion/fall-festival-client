import { useEffect, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { NavBar } from '@/components/nav-bar';
import * as S from './BoothDetail.styles';
import { BoothInfo, BoothLocation, MenuList } from '@/features/booth';
import { BOOTH_LIST } from '@/constants/booth/booth';
import FavoriteOn from 'src/assets/icons/favorite-on.svg?react';
import FavoriteOff from 'src/assets/icons/favorite-off.svg?react';
import { useFavorites } from '@/hooks/useFavorites';

export default function BoothDetail() {
  const { id } = useParams();
  const location = useLocation();
  const fromRef = useRef(location.state?.from || '/booth');
  const booth = BOOTH_LIST.find((booth) => booth.id === Number(id)); // ✅ 타입 일치
  const { handleToggleFavorite, isFavorited } = useFavorites();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!booth) {
    return null; // or handle the case when the booth is not found
  }

  const isBoothFavorited = isFavorited(booth.id);

  return (
    <S.Container>
      <NavBar isBack title="주점" backPath={fromRef.current} />
      <S.BackgroundImg src={booth.posterImage} />
      <S.FavoriteButton
        onClick={(e) => handleToggleFavorite(booth.id, e)}
        $isFavorited={isBoothFavorited}
        aria-label={isBoothFavorited ? '찜 완료' : '찜하기'}
      >
        {isBoothFavorited ? <FavoriteOn /> : <FavoriteOff />}
        {isBoothFavorited ? '찜 완료' : '찜하기'}
      </S.FavoriteButton>
      <S.Section style={{ marginTop: '-2rem' }}>
        <BoothInfo id={booth.id} />
      </S.Section>
      <S.HorizontalLine />
      <S.BorderSection>
        <MenuList id={booth.id} />
      </S.BorderSection>
      <S.HorizontalLine />
      <S.BorderSection data-section="location">
        <BoothLocation id={booth.id} boothLocation={booth.locate} />
      </S.BorderSection>
      <S.HorizontalLine />
      <S.BottomPadding />
    </S.Container>
  );
}
