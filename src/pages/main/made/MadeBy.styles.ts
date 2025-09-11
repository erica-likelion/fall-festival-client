import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  align-items: center;
  padding-bottom: 100px;
  gap: 3.75rem;
  background-color: ${(props) => props.theme.colors.grayScale.white};
`;

export const Image = styled.img`
  display: flex;
  width: 18rem;
  margin-top: 3.26rem;
`;

export const Image2 = styled.img`
  display: flex;
  width: 16.125rem;
`;

export const TextWrap = styled.div`
  display: flex;
  width: 20.9688rem;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 2.375rem;
`;

export const MainTitle = styled.p`
  ${(props) => props.theme.fonts.header.h4};
  color: ${(props) => props.theme.colors.grayScale.black};
  align-self: stretch;
`;

export const SubTitle = styled.p`
  ${(props) => props.theme.fonts.body.small500};
  color: ${(props) => props.theme.colors.grayScale.black};
  align-self: stretch;
`;

export const MockUp = styled.div`
  display: flex;
  width: 9.478rem;
  height: 9.478rem;
  padding: 4rem 3.8125rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  flex-shrink: 0;
  background: #d9d9d9;
  margin-top: 3.35rem;
`;

export const PartWrap = styled.div`
  display: flex;
  width: 21.0313rem;
  flex-direction: column;
  gap: 2.5rem;
  margin-top: 2.75rem;
`;

export const PartTitle = styled.p`
  ${(props) => props.theme.fonts.header.h3};
  color: ${(props) => props.theme.colors.primary.violet};
  display: flex;
  gap: 0.3rem;
  align-self: stretch;
`;

export const PartBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-self: stretch;
`;

export const PartCard = styled.div`
  display: flex;
  flex-direction: column;
`;
