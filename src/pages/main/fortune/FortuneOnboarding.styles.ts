import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, #7e419a 0%, #2d1c46 49%);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding-top: 3.7rem;
`;

export const Content = styled.div`
  padding: 1rem 1.5rem 8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex: 1;
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
`;

export const Subtitle = styled.p`
  margin-top: 1rem;
  ${(props) => props.theme.fonts.header.h4};
  color: ${({ theme }) => theme.colors.grayScale.white};
  text-shadow: 0px 0px 6px ${({ theme }) => theme.colors.grayScale.white};
  text-align: center;
  line-height: 1.5;
  white-space: pre-line;
`;

export const Memo = styled.p`
  width: calc(100% - 0rem);
  ${(props) => props.theme.fonts.body.xsmall400};
  color: ${({ theme }) => theme.colors.grayScale.white}75;
  text-shadow: 0px 0px 5px ${({ theme }) => theme.colors.grayScale.white}75;
  text-align: center;
  margin-top: 5px;
`;

export const InputSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: calc(100% - 0rem);
  max-width: 400px;
  margin-top: 0rem;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3px;
`;

export const Input = styled.input`
  padding: 0.75rem 1.2rem;
  border: none;
  outline: none;
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.grayScale.white}98;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.primary.violet};

  &::placeholder {
    color: ${({ theme }) => theme.colors.primary.violet}99;
  }
`;

export const Fortunelotties = styled.div`
  position: relative;
  background: transparent;
  border-radius: 16px;
  width: calc(100% - 0rem);
  height: 350px;
  max-width: 400px;
  text-align: center;
  margin-top: -3rem;
  margin-left: -1rem;

  > img {
    position: absolute;
    top: 71%;
    left: 50%;
    transform: translate(-50%, -50%) translateZ(0);
    width: 136px;
    height: 156px;
    max-width: 80%;
    max-height: 80%;
    pointer-events: none;
    z-index: 1;
    margin-left: 0.25rem;
    will-change: transform;
    backface-visibility: hidden;
  }

  > div {
    position: relative;
    z-index: 2;
    will-change: auto;
    transform: translateZ(0);
  }
`;

export const RefreshButton = styled.button`
  ${(props) => props.theme.fonts.header.h4};
  background: ${({ theme }) => theme.colors.primary.violet};
  width: calc(100% - 0rem);
  color: white;
  border: none;
  border-radius: 50px;
  padding: 0.75rem 2rem;
  margin-top: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0px 0px 8px ${({ theme }) => theme.colors.primary.violet};
`;
