import styled from 'styled-components';

export const BackgroundImg = styled.img`
  width: 100%;
  height: 5.75rem;
  background-color: ${(props) => props.theme.colors.grayScale.gy800};
  object-fit: cover;
  object-position: center;
`;

export const Section = styled.div`
  padding: 0rem 0rem 1.75rem;
  width: 20.9375rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const BorderSection = styled.div`
  width: 20.9375rem;
  padding: 0rem 0rem 2.75rem;
  display: flex;
  flex-direction: column;
  margin-top: 25px;
`;

export const BottomPadding = styled.div`
  height: 6.65rem;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

export const TakeOut = styled.div`
  display: flex;
  height: 1.625rem;
  padding: 0.0625rem 0.5rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  ${(props) => props.theme.fonts.body.xsmall500};
  color: ${(props) => props.theme.colors.grayScale.white};
`;

export const HorizontalLine = styled.div`
  height: 0.5rem;
  width: 100%;
  background-color: ${(props) => props.theme.colors.grayScale.gy200};
`;

export const FavoriteButton = styled.button<{ $isFavorited: boolean }>`
  position: absolute;
  top: 7rem;
  right: 1rem;
  gap: 7px;
  border: ${({ $isFavorited, theme }) =>
    $isFavorited ? 'none' : `1px solid ${theme.colors.primary.violet}`};
  background: ${({ $isFavorited, theme }) =>
    $isFavorited ? theme.colors.primary.violet : 'rgba(255, 255, 255, 0.9)'};
  border-radius: 12px;
  width: 54px;
  height: 72px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: ${({ $isFavorited, theme }) => ($isFavorited ? '#ffffff' : theme.colors.primary.violet)};
  cursor: pointer;
  z-index: 10;
  transition: all 0.2s ease;
`;
