import * as S from './ImageTextFrame.styles';
import { ImageTextFrameWithOrganizationProps } from './ImageTextFrame.types';
import PubBeerIcon from '@/assets/icons/pub_beer.svg?react';

/**
 * 이미지와 제목, 소속, 포장가능 여부를 함께 표시하는 프레임 컴포넌트
 *
 * @component
 * @param {string} image - 표시할 이미지 URL
 * @param {string} title - 주요 제목
 * @param {string} organization - 소속 정보
 * @param {boolean} [canPickup] - 포장 가능 여부 (기본값: false)
 * @param {Function} [onClick] - 프레임 클릭 시 실행할 콜백 함수
 * @param {string} [width] - 프레임 너비 (예: "100%", "10rem" 등)
 * @param {boolean} [activeStyle] - 활성화 스타일 여부 (기본값: true)
 * @returns {React.ReactElement} 이미지와 텍스트, 포장가능 여부가 포함된 프레임 컴포넌트
 *
 * @example
 * // 기본 사용법
 * <ImageTextFrameWithTime
 *   image="/path/to/image.webp"
 *   title="기가막힌주점"
 *   organization="소융대"
 *   canPickup={true}
 *   onClick={() => handleClick()}
 * />
 */
export default function ImageTextFrameWithOrganization({
  image,
  title,
  organization,
  canPickup = false,
  onClick,
  width,
  activeStyle = false,
  boothId,
}: ImageTextFrameWithOrganizationProps) {
  return (
    <S.Container onClick={onClick} $width={width} $activeStyle={activeStyle}>
      <S.Image src={image} alt="" $boothId={boothId} />
      <S.ContentsWrap>
        <S.Title>{title}</S.Title>
        <S.Organization>{organization}</S.Organization>
        {canPickup && (
          <S.Pickup>
            <PubBeerIcon width="0.75rem" height="0.75rem" />
            포장가능
          </S.Pickup>
        )}
      </S.ContentsWrap>
    </S.Container>
  );
}
