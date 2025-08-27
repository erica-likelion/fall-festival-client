import * as S from './BoothInfo.styles';
import { newlineToBr } from '@/utils/newlineToBr';
import { BOOTH_LIST } from '@/constants/booth/booth';
import { OPERATING_HOURS } from '@/constants/booth/operating-hours';
import PubBeerIcon from '@/assets/icons/pub_beer.svg?react';
import TimeIcon from '@/assets/icons/time_pub.svg?react';
import LocationIcon from '@/assets/icons/location_black.svg?react';

export default function BoothInfo({ id }: { id: number }) {
  const booth = BOOTH_LIST.find((booth) => booth.id === id);
  if (!booth) {
    return null; // or handle the case when the booth is not found
  }
  return (
    <S.Container>
      <S.ImageBtnFrame>
        <S.Image src={booth.profileImage} />
      </S.ImageBtnFrame>
      <S.TextSection>
        <S.TextFrame>
          <S.Text>{booth.type}</S.Text>
          <S.VerticalLine />
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
          <S.Location>
            <LocationIcon width="0.85rem" height="0.95rem" />
            위치 정보
          </S.Location>
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
