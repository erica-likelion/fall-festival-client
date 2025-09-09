import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const CarouselWrapper = styled.div`
  width: 100dvw;
  max-width: 21rem;

  /* slick-track 스타일링 */
  .slick-track {
    display: flex;
    flex-wrap: nowrap;
  }

  .slick-list {
    overflow: visible;
    padding: 0 1.25rem;
  }
`;

export const CarouselItem = styled.div`
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  width: 12.25rem;
`;

export const ArtistTimeBox = styled.div<{ fade: 'in' | 'out' }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: ${(props) => (props.fade === 'in' ? 1 : 0)};
  transition: opacity 0.3s ease;
`;

export const ArtistName = styled.h3`
  ${(props) => props.theme.fonts.header.h4_600};
  color: ${(props) => props.theme.colors.grayScale.black_1a1a};
  text-align: center;
`;

export const TimeBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

export const TimeText = styled.span`
  ${(props) => props.theme.fonts.body.xsmall500};
  color: ${(props) => props.theme.colors.grayScale.gy850};
`;

export const NorthStar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const VerticalLine = styled.div`
  width: 0.063rem;
  height: calc(100dvh - 45rem);
  min-height: 1.2rem;
  max-height: 10rem;
  background: ${(props) => props.theme.colors.primary.violet};
`;

export const ArtistCircle = styled.div<{ $isActive?: boolean }>`
  width: 12.25rem;
  height: 12.25rem;
  border-radius: 50%;
  background: ${(props) =>
    props.$isActive ? 'rgba(126, 65, 154, 0.2)' : props.theme.colors.grayScale.white};
  border: ${(props) =>
    props.$isActive ? `0.0625rem solid ${props.theme.colors.primary.violet}` : 'none'};
  box-shadow: ${(props) =>
    props.$isActive ? '0 0 1.5rem rgba(126, 65, 154, 0.8)' : '0 0 0.75rem rgba(126, 65, 154, 0.3)'};
  position: relative;
`;

export const ArtistImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;

export const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  margin-top: 8.625rem;
  margin-bottom: 11.5rem;
`;

export const EmptyStateText = styled.div`
  align-self: stretch;
  color: ${(props) => props.theme.colors.primary.violet};
  text-align: center;
  ${(props) => props.theme.fonts.body.medium500};
  white-space: pre-line;
`;
