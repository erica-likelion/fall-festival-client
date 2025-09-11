import { theme } from '@/styles/theme';
import styled from 'styled-components';

export const Container = styled.footer`
  width: 100%;
  margin-bottom: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
`;

export const Sub = styled.p`
  ${(props) => props.theme.fonts.body.xsmall500}
  color: ${theme.colors.grayScale.gy500};
  text-align: center;
`;
