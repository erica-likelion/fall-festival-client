import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 0;
`;

export const ImageBtnFrame = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

export const Image = styled.img.withConfig({
  shouldForwardProp: (prop) => prop !== '$boothId',
})<{ $boothId?: number }>`
  width: 6.25rem;
  height: 6.25rem;
  border-radius: 12px;
  margin-top: 1.2rem;
  ${({ $boothId }) => $boothId === 1 && 'object-fit: cover;'}
`;

export const TextSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const TextFrame = styled.div`
  display: flex;
  gap: 0.38rem;
`;

export const Text = styled.p`
  ${(props) => props.theme.fonts.body.xsmall500};
  color: ${(props) => props.theme.colors.grayScale.gy400};
`;

export const BoothName = styled(Text)`
  ${(props) => props.theme.fonts.header.h2};
  color: ${(props) => props.theme.colors.grayScale.black};
`;

export const TakeOut = styled.div`
  display: flex;
  width: max-content;
  height: 1.625rem;
  padding: 0.0625rem 0.5rem;
  margin-top: 6px;
  justify-content: center;
  align-items: center;
  gap: 0.125rem;
  background-color: ${(props) => props.theme.colors.primary.violet}20;
  border-radius: 2rem;
  ${(props) => props.theme.fonts.body.xsmall500};
  color: ${(props) => props.theme.colors.primary.violet};
`;

export const OperatingHours = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-top: 5px;
  ${(props) => props.theme.fonts.body.xsmall500};
  color: ${(props) => props.theme.colors.grayScale.black};
`;

export const VerticalLine_black = styled.div`
  width: 0.0625rem;
  height: 0.75rem;
  margin-top: 6px;
  background: ${(props) => props.theme.colors.grayScale.black};
`;

export const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const LocationButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  ${(props) => props.theme.fonts.body.xsmall400};
  color: ${(props) => props.theme.colors.primary.violet};
  text-decoration: underline;
  padding: 0;
  margin-left: 0.1rem;
  margin-top: 5px;

  &:hover {
    color: ${(props) => props.theme.colors.primary.violet}CC;
  }
`;
