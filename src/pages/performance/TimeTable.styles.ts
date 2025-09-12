import styled, { keyframes } from 'styled-components';

const slideUp = keyframes`
from {
  opacity: 0;
  transform: translateY(20%);
}
to {
  opacity: 1;
  transform: translateY(0);
}
`;

export const Container = styled.div`
  position: relative;
  width: 100%;
  min-height: 100dvh;
  background-color: ${(p) => p.theme.colors.grayScale.white};
  display: flex;
  flex-direction: column;
`;

export const Header = styled.header`
  height: 3.5rem; /* 56px */
  display: grid;
  grid-template-columns: 3.5rem 1fr 3.5rem; /* 56px 1fr 56px */
  align-items: center;
  border-bottom: 0.0625rem solid ${(p) => p.theme.colors.grayScale.gy100}; /* 1px */
`;

export const HeaderButton = styled.button`
  height: 100%;
  background: transparent;
  border: none;
  color: ${(p) => p.theme.colors.grayScale.gy900};
  ${(p) => p.theme.fonts.header.h3};
`;

export const HeaderTitle = styled.div`
  text-align: center;
  ${(p) => p.theme.fonts.header.h4};
  color: ${(p) => p.theme.colors.grayScale.gy900};
`;

export const TimeWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  position: relative;
  flex: 1;
  margin-top: 8.625rem;
  min-height: 34.6875rem;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 5rem;
`;

export const TimeAndBarContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
`;

export const TimeContainer = styled.div`
  display: flex;
  width: 2.5rem;
  height: 45.25rem; /* 724px - 막대기와 같은 높이 */
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
`;

export const TimeBoxWrap = styled.div`
  display: flex;
  align-items: center;
`;

export const TimeTable = styled.div`
  position: absolute;
  top: -0.23rem;
  left: 0;
  display: flex;
  width: 20.9375rem;
  gap: 0.5rem;
  flex-direction: column;
  align-items: flex-start;
  z-index: -1;
`;

export const BoxWrap = styled.div<{ $isFirst?: boolean; $block?: number }>`
  display: flex;
  height: ${({ $block = 1 }) => {
    const duration = $block * 5; // minutes
    let heightRem = duration / 5; // base height in rem

    if (duration > 30) {
      const extra = Math.floor(duration / 15) - 2;
      heightRem += 0.25 * extra;
    } else if (duration < 20) {
      const deduction = 4 - Math.floor(duration / 5);
      heightRem -= 0.25 * deduction;
    }

    return `${heightRem}rem`;
  }};
  flex-direction: column;
  align-items: flex-start;
  gap: 0.625rem;
  align-self: stretch;
  margin-top: ${({ $isFirst }) => ($isFirst ? '0.5rem' : '0rem')};
  animation: ${slideUp} 0.3s ease-in-out;
`;

export const Wrap = styled.div`
  display: flex;
  align-items: center;
  flex: 1 0 0;
`;

export const TimeBox = styled.div<{ $isActive: boolean; $isEmpty?: boolean }>`
  width: 4.5rem;
  align-self: stretch;
  border-radius: 0.75rem 0rem 0rem 0.75rem;
  background-color: ${({ $isActive, $isEmpty, theme }) =>
    $isEmpty
      ? 'transparent'
      : $isActive
        ? theme.colors.primary.bl400
        : theme.colors.grayScale.gy100};
`;

export const TimeText = styled.p`
  color: ${({ theme }) => theme.colors.grayScale.gy850};
  text-align: center;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 142%;
  letter-spacing: -0.0175rem; /* -0.28px */
`;

export const ContentBox = styled.div<{ $isActive: boolean; $isEmpty?: boolean }>`
  display: flex;
  width: 16.4375rem;
  padding: 0.25rem 1rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;
  align-self: stretch;
  border-radius: 0rem 0.75rem 0.75rem 0rem;
  background-color: ${({ $isActive, $isEmpty, theme }) =>
    $isEmpty
      ? 'transparent'
      : $isActive
        ? 'rgba(79, 117, 249, 0.30)'
        : theme.colors.grayScale.gy50};
`;

export const Divider = styled.div`
  display: flex;
  height: 0.5rem;
  padding: 0rem 0.125rem;
  flex-direction: column;
  align-items: flex-start;
`;

export const Line = styled.div`
  width: 4.38rem;
  height: 0.0625rem; /* 1px */
  background-color: ${({ theme }) => theme.colors.grayScale.gy50};
`;

export const TabNavWrap = styled.div`
  position: fixed;
  top: 3.5rem;
  left: 0;
  right: 0;
  padding-top: 0.875rem;
  background-color: ${(props) => props.theme.colors.grayScale.white};
  z-index: 100;
`;

export const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  margin-top: 19rem;
  margin-bottom: 11.5rem;
`;

export const EmptyStateText = styled.div`
  align-self: stretch;
  color: ${(props) => props.theme.colors.primary.violet};
  text-align: center;
  ${(props) => props.theme.fonts.body.medium500};
  white-space: pre-line;
`;

export const NorthStarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const NorthStarLine = styled.div`
  width: 0.0663rem;
  height: 45.25rem; /* 724px */
  background: ${(props) => props.theme.colors.primary.violet};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const NorthStarTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const NorthStarBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ArtistBoxContainer = styled.div`
  position: relative;
  margin-left: 2.125rem;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
`;

export const ArtistBox = styled.div<{ $isActive: boolean }>`
  display: flex;
  width: 15.3125rem;
  height: 6.25rem;
  padding: 0.75rem 1.25rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.625rem;
  flex-shrink: 0;
  border-radius: 1rem;
  background: ${({ $isActive, theme }) =>
    $isActive ? 'rgba(126, 65, 154, 0.20)' : theme.colors.grayScale.white};
  box-shadow: 0 0 0.75rem 0 rgb(126 65 154 / 30%);
`;

export const ArtistName = styled.div<{ $isActive: boolean }>`
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.primary.violet : theme.colors.grayScale.gy850};
  ${(props) => props.theme.fonts.body.small600};
`;

export const ArtistTime = styled.div<{ $isActive: boolean }>`
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.primary.violet : theme.colors.grayScale.gy400};
  ${(props) => props.theme.fonts.body.xsmall500};
`;

export const ArtistInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

// 새로운 공연 컨테이너 스타일들
export const PerformanceBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 2.125rem;
  gap: 0.75rem;
`;

export const Day2Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;
`;

export const Day3Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;
`;

export const PerformanceBox = styled.div<{
  $boxSize: 'large' | 'large-day3' | 'medium' | 'small';
  $isActive: boolean;
}>`
  display: flex;
  width: 15.3125rem; /* 245px */
  height: ${({ $boxSize }) => {
    switch ($boxSize) {
      case 'large':
        return '16.5rem'; /* 264px for day 2 */
      case 'large-day3':
        return '15.125rem'; /* 242px for day 3 */
      case 'medium':
        return '5.5rem'; /* 88px */
      case 'small':
        return '4.125rem'; /* 66px */
      default:
        return '5.5rem';
    }
  }};
  padding: 0.75rem 1.25rem; /* 12px 20px */
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem; /* 0.5rem */
  border-radius: 1rem; /* 16px */
  background: ${({ $isActive, theme }) =>
    $isActive ? 'rgba(126, 65, 154, 0.20)' : theme.colors.grayScale.white};
  box-shadow: 0 0 0.75rem 0 rgb(126 65 154 / 30%); /* 12px */
  transition: all 0.3s ease;
`;

export const PerformanceInfo = styled.div<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 0.5rem; /* 8px */
`;

export const PerformanceName = styled.div<{ $isActive: boolean }>`
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.primary.violet : theme.colors.grayScale.gy800};
  font-weight: 600;
  font-size: 0.875rem; /* 14px */
  line-height: 142%; /* 19.88px */
  letter-spacing: -0.0175rem; /* -0.28px */
`;

export const PerformanceTime = styled.div<{ $isActive: boolean }>`
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.primary.violet : theme.colors.grayScale.gy400};
  font-weight: 500;
  font-size: 0.625rem; /* 10px */
  line-height: 150%; /* 15px */
  letter-spacing: -0.0125rem; /* -0.2px */
`;
