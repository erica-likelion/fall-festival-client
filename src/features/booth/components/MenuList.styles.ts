import styled from 'styled-components';

export const MenuList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MenuFrame = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.375rem;
`;

export const MenuItem = styled.div`
  ${(props) => props.theme.fonts.header.h3};

  display: flex;
  flex-direction: column;
`;

export const MenuCategory = styled.p`
  color: ${(props) => props.theme.colors.grayScale.black};
  ${(props) => props.theme.fonts.header.h3};
`;

export const TabsContainer = styled.div`
  margin-top: 6px;
  margin-bottom: 36px;
`;

export const HorizontalLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${(props) => props.theme.colors.grayScale.gy300};
  margin: 36px 0;
`;

export const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${({ theme }) => theme.colors.grayScale.gy400};
  ${({ theme }) => theme.fonts.body.medium400};
`;

export const MenuLoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;
  min-height: 100px;
`;
