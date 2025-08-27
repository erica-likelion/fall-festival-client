import * as S from './ImageTextFrame.styles';
import { MenuFrameProps } from './ImageTextFrame.types';

/**
 * 메뉴 항목을 표시하는 프레임 컴포넌트
 *
 * @component
 * @param {string} menu - 메뉴 이름
 * @param {string} description - 메뉴에 대한 설명
 * @param {string} price - 메뉴 가격 (숫자 형식)
 * @param {string} [width] - 프레임 너비 (예: "100%", "10rem" 등)
 * @returns {React.ReactElement} 메뉴 프레임 컴포넌트
 *
 * @example
 * // 기본 사용법
 * <MenuFrame
 *   menu="햄계란말이"
 *   description="햄을 넣어 더욱 맛있는 계란말이"
 *   price={5500}
 * />
 */
export default function MenuFrame({ menu, description, price, width }: MenuFrameProps) {
  return (
    <S.MenuContainer $width={width}>
      <S.MenuTextWrap>
        <S.menuTitle>{menu}</S.menuTitle>
        <S.MenuDescription>{description}</S.MenuDescription>
      </S.MenuTextWrap>
      <S.Price>{price}</S.Price>
    </S.MenuContainer>
  );
}
