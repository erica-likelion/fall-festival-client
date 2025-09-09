import styled from 'styled-components';
import { motion } from 'framer-motion';
import logo from '@/assets/images/espero-logo.png';

export const Layout = styled.div`
  background: linear-gradient(180deg, #7e419a 35%, #7e419aca 45%, transparent 90%);
  width: 100%;
  height: 50rem;
  position: absolute;
`;

export const TitleBar = styled.div`
  width: 100%;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  position: fixed;
  padding: 1.3rem;
  top: 0;
  left: 0;
  background: transparent;
  z-index: 10;
  box-shadow: 0 0 15px 0 #7e419a55;
`;

export const MainLogo = styled.div`
  width: 8.1rem;
  height: 2.7rem;
  background-image: url(${logo});
  background-size: contain;
  background-repeat: no-repeat;
  filter: drop-shadow(0px 0 4px #7e419a);
`;

export const Container = styled.div`
  width: 100%;
  height: auto;
  position: relative;
  margin-bottom: 8rem;
`;

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  color: ${(props) => props.theme.colors.grayScale.black};
  position: relative;
`;

export const Title = styled.p`
  ${(props) => props.theme.fonts.header.h3}
  color: ${(props) => props.theme.colors.grayScale.offwhite};
`;

export const CarouselsBox = styled.div`
  width: 100dvw;
  overflow: hidden;
`;

// ne
export const TitleWrapper = styled.div`
  display: flex;
  width: 20.9375rem;
  justify-content: space-between;
  align-items: center;
  margin: 2.5rem auto 0.8rem;
`;

export const MoreButton = styled(motion.div)`
  color: ${(props) => props.theme.colors.primary.violet};
  display: flex;
  padding: 0.25rem 0 0;
  justify-content: center;
  align-items: center;
  gap: 0.1rem;
`;

export const BtnText = styled.p`
  ${(props) => props.theme.fonts.body.small600}
  text-align: center;
`;

export const LoadingText = styled.p`
  ${(props) => props.theme.fonts.body.medium500}
  text-align: center;
  color: ${(props) => props.theme.colors.grayScale.offwhite};
  margin: 2rem 0;
`;

export const ErrorText = styled.p`
  ${(props) => props.theme.fonts.body.medium500}
  text-align: center;
  color: ${(props) => props.theme.colors.secondary.rd500};
  margin: 2rem 0;
`;
