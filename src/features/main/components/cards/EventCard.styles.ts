import styled from 'styled-components';
import EventBannerBg from '@/assets/images/event-banner-bg.webp';

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-size: cover;
  box-shadow: 0 0 10px 0 #dbc2e3;
  border-radius: 1rem;
  margin: 0.8rem auto;
  height: 10rem;
  max-width: 21rem;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${EventBannerBg});
    background-color: #eee3fd;
    background-size: cover;
    opacity: 0.8; /* 이미지 투명도 조절 */
    border-radius: 1rem;
    z-index: -1; /* 콘텐츠 뒤로 보내기 */
  }
`;

export const HeaderSection = styled.div`
  display: flex;
  padding: 0.875rem 1.25rem 0.75rem;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

export const InfoSection = styled.div`
  display: flex;
  padding: 1.5rem 0rem;
  flex-direction: column;
  align-items: center;
  align-self: stretch;
  height: 100%;
  justify-content: center;
`;

export const TagWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const EventTitle = styled.p`
  ${(props) => props.theme.fonts.header.h3}
  text-align: center;
  color: ${(props) => props.theme.colors.secondary.vl900};
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  align-self: stretch;
  color: ${(props) => props.theme.colors.secondary.vl800};
  padding: 0.5rem 0 0;
`;

export const TextWrapper = styled.div`
  ${(props) => props.theme.fonts.header.h3}
  display: flex;
  text-align: center;
  gap: 0.25rem;

  .location-icon {
    path {
      stroke: ${(props) => props.theme.colors.secondary.vl800};
    }
  }
`;

export const EventText = styled.p`
  ${(props) => props.theme.fonts.body.xsmall500}
`;
