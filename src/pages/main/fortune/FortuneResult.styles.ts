import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, #7e419a 0%, #2d1c46 49%);
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
`;

export const Content = styled.div`
  padding: 1rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  flex: 1;
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
`;

export const Title = styled.p`
  margin-top: 2rem;
  ${(props) => props.theme.fonts.header.h4};
  color: ${({ theme }) => theme.colors.grayScale.white};
  text-shadow: 0px 0px 6px ${({ theme }) => theme.colors.grayScale.white};
  text-align: center;
  line-height: 1.5;
  white-space: pre-line;
`;

export const CardContainer = styled.div`
  display: grid;
  place-items: center;
  width: 100%;
  height: 500px;
  margin-top: 1rem;
  perspective: 1000px;
`;

// 회전하는 박스
export const CardInner = styled.button<{ $isFlipped: boolean; $isVisible: boolean }>`
  -webkit-tap-highlight-color: transparent;
  appearance: none;
  border: 0;
  background: transparent;
  cursor: pointer;
  position: relative;
  width: 295px;
  height: 440px;
  transform-style: preserve-3d;
  transform: ${({ $isVisible }) =>
    $isVisible ? 'translateZ(0) scale(1)' : 'translateZ(0) scale(0)'};
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  transition:
    transform 1.8s cubic-bezier(0.2, 0.7, 0.2, 1),
    opacity 1.8s cubic-bezier(0.2, 0.7, 0.2, 1),
    box-shadow 0.3s ease;
  box-shadow:
    0 0 20px 6px ${({ theme }) => theme.colors.secondary.DS_Card}50,
    0 0 30px 12px ${({ theme }) => theme.colors.secondary.DS_Card}30;
  border-radius: 21.13px;

  /* 크롬 렌더링 최적화 */
  will-change: transform, opacity;
  -webkit-transform: translateZ(0);
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;

  ${({ $isFlipped }) =>
    $isFlipped &&
    `
    transform: translateZ(0) rotateY(180deg) scale(1.02); 
  `}

  &:hover {
    transform: ${(props) => {
      const baseScale = props.$isVisible ? 'translateZ(0) scale(1.02)' : 'translateZ(0) scale(0)';
      return props.$isFlipped ? 'translateZ(0) rotateY(180deg) scale(1.02)' : baseScale;
    }};
  }

  &:active {
    transform: ${(props) => {
      const baseScale = props.$isVisible ? 'translateZ(0) scale(0.98)' : 'translateZ(0) scale(0)';
      return props.$isFlipped ? 'translateZ(0) rotateY(180deg) scale(0.98)' : baseScale;
    }};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary.violet};
    outline-offset: 4px;
    border-radius: 21.13px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

// 앞/뒤 공통: 카드 면(겹쳐서 배치)
const CardFace = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 21.13px;
  overflow: hidden;
  backface-visibility: hidden;
  box-shadow:
    0 20px 40px rgb(0 0 0 / 30%),
    0 8px 16px rgb(0 0 0 / 20%);

  > img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    background: transparent;

    /* 크롬 이미지 선명도 최적화 */
    image-rendering: optimize-contrast;
    -webkit-backface-visibility: hidden;
    -moz-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-font-smoothing: subpixel-antialiased;
  }
`;

export const CardFaceFront = styled(CardFace)`
  transform: translateZ(0) rotateY(0deg);
`;

// CardContainer가 회전하면 정방향으로 보이도록
export const CardFaceBack = styled(CardFace)`
  transform: translateZ(0) rotateY(180deg);
`;
