import styled from 'styled-components';

export const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
`;

export const MenuFrame = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.375rem;
  margin-bottom: 1rem;
  margin-top: 20px;
`;

export const MenuItem = styled.div`
  ${(props) => props.theme.fonts.header.h3};

  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const MenuCategory = styled.p`
  color: ${(props) => props.theme.colors.grayScale.black};
  ${(props) => props.theme.fonts.header.h3};
`;

export const TabsContainer = styled.div`
  margin-bottom: 1.5rem;
`;

export const HorizontalLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${(props) => props.theme.colors.grayScale.gy300};
  margin: 1.5rem 0;
`;
