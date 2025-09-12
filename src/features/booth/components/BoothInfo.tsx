import * as S from './BoothInfo.styles';
import { FavoriteButton } from '@/components/favorite-button';
import { newlineToBr } from '@/utils/newlineToBr';
import { useFavorites } from '@/hooks/useFavorites';
import { OPERATING_HOURS } from '@/constants/booth/operating-hours';
import PubBeerIcon from '@/assets/icons/pub_beer.svg?react';
import TimeIcon from '@/assets/icons/time_pub.svg?react';
import { Booth } from '@/types/booth.types';

interface BoothInfoProps {
  booth: Booth;
}

export default function BoothInfo({ booth }: BoothInfoProps) {
  const { handleToggleFavorite, isFavorited } = useFavorites();

  const isBoothFavorited = isFavorited(booth.id);

  return (
    <S.Container>
      <S.ImageBtnFrame>
        <S.Image src={booth.profileImage} $boothId={booth.id} />
        <FavoriteButton
          id={booth.id}
          isFavorited={isBoothFavorited}
          onClick={handleToggleFavorite}
          variant="large"
          position="relative"
        />
      </S.ImageBtnFrame>
      <S.TextSection>
        <S.TextFrame>
          <S.Text>{booth.affiliation}</S.Text>
        </S.TextFrame>
        <S.BoothName
          dangerouslySetInnerHTML={{
            __html: newlineToBr(booth.pubName),
          }}
        />
        <S.InfoRow>
          <S.OperatingHours>
            <TimeIcon width="0.75rem" height="0.75rem" />
            {OPERATING_HOURS}
          </S.OperatingHours>
          <S.VerticalLine_black />
          <S.LocationButton
            onClick={() => {
              const locationSection = document.querySelector('[data-section="location"]');
              locationSection?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            위치보기
          </S.LocationButton>
        </S.InfoRow>

        {booth.takeout && (
          <S.TakeOut>
            <PubBeerIcon width="0.75rem" height="0.75rem" />
            포장가능
          </S.TakeOut>
        )}
      </S.TextSection>
    </S.Container>
  );
}
