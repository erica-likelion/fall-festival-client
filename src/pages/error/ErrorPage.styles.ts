import styled from 'styled-components';
import logo from '@/assets/images/espero-logo.webp';

export const ErrorPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  position: relative;
  background-image: url('/error/background.jpg');
  background-size: cover;
  background-position: center;
`;

export const ErrorContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 20px;
`;

export const ErrorMainText = styled.h1`
  ${(props) => props.theme.fonts.body.large500};
  margin-top: 1rem;
  color: ${(props) => props.theme.colors.grayScale.offwhite};
  text-shadow: 0 0 5px rgb(0 0 0 / 50%);
`;

export const ErrorSubText = styled.p`
  ${(props) => props.theme.fonts.body.small500};
  margin: 0.5rem 0 1rem;
  color: ${(props) => props.theme.colors.grayScale.offwhite};
  text-shadow: 0 0 5px rgb(0 0 0 / 50%);
`;

export const MainLogo = styled.div`
  position: absolute;
  width: 9.9rem;
  height: 3.3rem;
  background-image: url(${logo});
  background-size: contain;
  background-repeat: no-repeat;
  left: 0.8rem;
  top: 1.3rem;
`;

export const BackButton = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;

  path {
    stroke: ${(props) => props.theme.colors.grayScale.offwhite};
  }
`;

export const BackArrow = styled.span`
  font-size: 24px;
  font-weight: bold;
`;

export const ErrorIconWrapper = styled.div`
  filter: drop-shadow(0 0 6px rgb(0 0 0 / 40%));
`;
