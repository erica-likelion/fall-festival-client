import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, #7e419a 0%, #2d1c46 49%);
  display: flex;
  flex-direction: column;
  overflow: auto;
  overscroll-behavior: none;
  touch-action: pan-y;
`;

export const Content = styled.div`
  padding: 1rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
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

export const CardSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0rem;
  width: 523px;
  height: 523px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary.violet}20;
  box-shadow: 0px 0px 8px ${({ theme }) => theme.colors.primary.violet}20;
  margin-top: 1rem;
`;

export const CardRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 0rem;
  width: 100%;
  margin-bottom: 18px;
`;

export const Card = styled.img`
  height: 170px;
  cursor: pointer;
  transition: all 0.2s ease;
  will-change: transform;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  transform: translateZ(0);

  /* 크롬 이미지 선명도 최적화 */
  image-rendering: optimize-contrast;
  -webkit-font-smoothing: subpixel-antialiased;

  &:hover {
    transform: translateY(-4px) scale(1.02) translateZ(0);
  }

  &:active {
    transform: translateY(-2px) scale(0.98) translateZ(0);
  }

  @media (hover: none) {
    &:hover {
      transform: none;
    }
  }
`;

export const SelectedCardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 500px;
  margin-top: 2rem;
`;

export const SelectedCard = styled.img<{ $isFlipped: boolean }>`
  width: 295px;
  height: 440px;
  cursor: pointer;
  transition: all 0.8s ease;
  transform-style: preserve-3d;
  box-shadow:
    0 20px 40px rgb(0 0 0 / 30%),
    0 8px 16px rgb(0 0 0 / 20%);
  border-radius: 12px;

  /* 크롬 이미지 선명도 최적화 */
  image-rendering: optimize-contrast;
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-transform: translateZ(0);
  -webkit-font-smoothing: subpixel-antialiased;
  will-change: transform;

  ${({ $isFlipped }) =>
    $isFlipped &&
    `
    transform: translateZ(0) rotateY(180deg);
  `}

  &:hover {
    transform: ${({ $isFlipped }) =>
      $isFlipped ? 'translateZ(0) rotateY(180deg) scale(1.02)' : 'translateZ(0) scale(1.02)'};
    box-shadow:
      0 25px 50px rgb(0 0 0 / 40%),
      0 12px 24px rgb(0 0 0 / 30%);
  }

  &:active {
    transform: ${({ $isFlipped }) =>
      $isFlipped ? 'translateZ(0) rotateY(180deg) scale(0.98)' : 'translateZ(0) scale(0.98)'};
  }
`;
