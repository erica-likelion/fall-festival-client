import styled, { keyframes } from 'styled-components';

export const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.grayScale.white};
  color: ${({ theme }) => theme.colors.primary.violet};
`;

export const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid ${({ theme }) => theme.colors.grayScale.gy100};
  border-top: 4px solid ${({ theme }) => theme.colors.primary.violet};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin-bottom: 16px;
`;

export const LoadingText = styled.p`
  ${({ theme }) => theme.fonts.body.medium400};
  color: ${({ theme }) => theme.colors.primary.violet};
`;
