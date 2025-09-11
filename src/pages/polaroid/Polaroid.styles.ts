import styled, { css } from 'styled-components';

export const Container = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1; /* 레이아웃 Main 위 */
  width: 100%;
  height: 100dvh;
  max-height: 100dvh;
  background-color: ${(p) => p.theme.colors.grayScale.white};
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const Fullscreen = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  overflow: hidden auto;
  min-height: 0; /* 헤더 높이 고려한 내부 스크롤 이슈 방지 */
  padding-bottom: 2rem;
  margin-top: 3.875rem;
  gap: 8px; /* 요소간 간격 추가 */
`;

// Intro swiper
export const SliderWrapper = styled.div`
  flex: 1;
  width: 100%;
  min-height: 0; /* flex-child 높이 이슈 방지 */

  /* slick-slider customizations */
  .slick-slider,
  .slick-list,
  .slick-track {
    height: 100%;
  }

  .slick-slide > div {
    height: 100%;
    display: flex;
    width: 100%;
  }
`;

export const Slide = styled.div`
  width: 100%;
  display: flex !important;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  position: relative;
`;

export const OnboardingImage = styled.img`
  width: 90%;
  max-height: calc(100dvh - 24rem);

  /* max-width: 320px; */
  aspect-ratio: 1;
  border-radius: 12px;
  background: transparent;
  object-fit: contain;
`;

export const SlideText = styled.p`
  ${(p) => p.theme.fonts.body.medium500};
  color: ${(p) => p.theme.colors.grayScale.gy700};
  text-align: center;
  white-space: pre-line;
  line-height: 1.5;
`;

export const Dots = styled.div`
  display: flex;
  gap: 6px;
  padding: 8px 0 16px;
`;

export const Dot = styled.span<{ $active?: boolean }>`
  width: ${(p) => (p.$active ? '24px' : '8px')};
  height: 8px;
  border-radius: ${(p) => (p.$active ? '4px' : '50%')};
  background: ${(p) =>
    p.$active ? p.theme.colors.primary.violet : p.theme.colors.grayScale.gy100};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`;

// Buttons
const buttonBase = css`
  min-height: 2rem;
  border-radius: 10rem;
  padding: 0.8rem 1rem;
  width: calc(100% - 32px);
  margin: 0 16px 16px;
  border: none;
`;

export const PrimaryButton = styled.button`
  ${buttonBase};
  background: ${(p) => p.theme.colors.primary.violet};
  color: ${(p) => p.theme.colors.grayScale.white};
  border-radius: 10rem;
  ${(p) => p.theme.fonts.body.medium500};
`;

export const SecondaryButton = styled.button`
  ${buttonBase};
  background: ${(p) => p.theme.colors.grayScale.gy100};
  color: ${(p) => p.theme.colors.grayScale.gy800};
  border-radius: 10rem;
  ${(p) => p.theme.fonts.body.medium500};
`;

export const SkipLink = styled.a`
  display: block;
  text-decoration: underline;
  color: ${(p) => p.theme.colors.primary.violet};
  ${(p) => p.theme.fonts.body.small600};
  padding-bottom: 3rem;
`;

export const ButtonRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  padding: 0.8rem 1rem;

  & > button {
    margin: 0;
    width: 100%;
  }
`;

// Frame preview
export const FramePreview = styled.div`
  flex: 1;
  display: grid;
  place-items: center;
  padding: 24px 16px 8px;
  max-height: 70vh;
  overflow: visible;
  min-height: 100px;
`;

export const PolaroidCard = styled.div<{ $shaking?: boolean }>`
  position: relative;
  background: ${(p) => p.theme.colors.grayScale.white};
  border: 1px solid ${(p) => p.theme.colors.grayScale.gy200};
  box-shadow: 0 2px 8px rgb(0 0 0 / 6%);
  transition: transform 0.3s ease;

  /* 흔들기 애니메이션 */
  ${(p) =>
    p.$shaking &&
    `
    animation: shake 1s ease-in-out;
  `}

  @keyframes shake {
    0%,
    100% {
      transform: translateX(0);
    }

    10%,
    30%,
    50%,
    70%,
    90% {
      transform: translateX(-10px) rotate(-2deg);
    }

    20%,
    40%,
    60%,
    80% {
      transform: translateX(10px) rotate(2deg);
    }
  }

  /* width/height는 inline-style로 제어 (정확한 비율 유지) */
`;

export const PhotoWindow = styled.div`
  position: absolute;
  overflow: hidden;
  background: ${(p) => p.theme.colors.grayScale.gy100};
`;

export const Photo = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.15s ease-out;
`;

export const FramePicker = styled.div`
  display: flex;
  gap: 16px;
  justify-content: flex-start;
  padding: 16px 20px;
  max-width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  /* 스크롤바 숨기기 */
  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const FrameOption = styled.button<{ $selected?: boolean; $disabled?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 0;
  border: none;
  background: transparent;
  flex-shrink: 0;
  opacity: ${(p) => (p.$disabled ? 0.5 : 1)};
  cursor: ${(p) => (p.$disabled ? 'not-allowed' : 'pointer')};
  transition: opacity 0.2s ease;

  img {
    width: 48px;
    height: 48px;
    object-fit: cover;
    border-radius: 4px;
    border: 2px solid
      ${(p) => (p.$selected ? p.theme.colors.primary.violet : p.theme.colors.grayScale.gy200)};
  }

  span {
    ${(p) => p.theme.fonts.body.small400};
    font-size: 12px;
    color: ${(p) => (p.$selected ? p.theme.colors.primary.violet : p.theme.colors.grayScale.gy600)};
    font-weight: ${(p) => (p.$selected ? '600' : '400')};
    white-space: nowrap;
  }
`;

export const CategoryPicker = styled.div`
  display: flex;
  width: 100%;
  margin: 0;
  border-bottom: 1px solid ${(p) => p.theme.colors.grayScale.gy200};
`;

export const CategoryTab = styled.button<{ $active?: boolean }>`
  flex: 1;
  padding: 16px;
  border: none;
  border-bottom: 2px solid ${(p) => (p.$active ? p.theme.colors.primary.violet : 'transparent')};
  ${(p) => p.theme.fonts.body.medium500};
  background: transparent;
  color: ${(p) => (p.$active ? p.theme.colors.primary.violet : p.theme.colors.grayScale.gy300)};
  transition: all 0.2s ease;
  font-weight: ${(p) => (p.$active ? '600' : '400')};
`;

export const SubtleText = styled.p`
  ${(p) => p.theme.fonts.body.xsmall600};
  color: ${(p) => p.theme.colors.primary.violet};
  text-align: center;
  padding: 0 0 1rem;
`;

// 흔들기 관련 스타일
export const ShakeInstructions = styled.div`
  text-align: center;
  padding: 16px;
  margin: 16px 0;
  width: 100%;
`;

export const ShakeText = styled.p`
  ${(p) => p.theme.fonts.body.medium500};
  color: ${(p) => p.theme.colors.grayScale.gy500};
  margin-bottom: 1.5em;
`;

/*
export const ProgressBar = styled.div`
  width: 100%;
  max-width: 280px;
  height: 6px;
  background: ${(p) => p.theme.colors.grayScale.gy200};
  border-radius: 3px;
  overflow: hidden;
  margin: 0 auto 12px;
`;

export const ProgressFill = styled.div<{ $width: number }>`
  height: 100%;
  background: linear-gradient(90deg, #4caf50, #8bc34a);
  width: ${(p) => p.$width}%;
  transition: width 0.3s ease;
  border-radius: 3px;
`;
*/

export const ShakeCounter = styled.span`
  ${(p) => p.theme.fonts.body.small400};
  color: ${(p) => p.theme.colors.primary.violet};
  text-align: center;
  background-color: ${(p) => p.theme.colors.secondary.vl50};
  padding: 0.3rem 0.8rem;
  box-shadow: 0 0 10px 0 #dbc2e3;
  border-radius: 3rem;
`;

export const PermissionButton = styled.button`
  background-color: ${(p) => p.theme.colors.primary.violet};
  color: ${(p) => p.theme.colors.grayScale.white};
  border: none;
  padding: 0.8rem 1rem;
  border-radius: 10rem;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  margin: 16px auto;
  display: block;
  width: 100%;
  box-shadow: 0 4px 15px rgb(0 0 0 / 20%);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgb(0 0 0 / 30%);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const ErrorMessage = styled.div`
  background: rgb(255 107 107 / 10%);
  color: ${(p) => p.theme.colors.secondary.rd500};
  padding: 15px;
  border-radius: 10px;
  margin: 16px;
  text-align: center;
  ${(p) => p.theme.fonts.body.small400};
  border: 1px solid rgb(255 107 107 / 20%);
`;
