import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;

  /* margin-bottom: 1rem; */
  padding: 0.6rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 0.75rem;

  /* background-color: ${(props) => props.theme.colors.grayScale.gy300}; */
`;

export const Wrap = styled.div<{ index: number }>`
  display: flex;
  flex-direction: ${({ index }) => (index % 2 === 0 ? 'row' : 'row-reverse')};
  text-align: ${({ index }) => (index % 2 === 0 ? 'left' : 'right')};
  align-items: center;
  width: 100%;

  .title-wrap {
    flex-direction: ${({ index }) => (index % 2 === 0 ? 'row' : 'row-reverse')};
  }
`;

export const ImageBox = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 4rem;
  display: flex;
  overflow: hidden;
  box-shadow: 0 0 0.2rem ${(props) => props.theme.colors.primary.violet}55;
  justify-content: flex-end;
  border: none;
  align-items: center;

  /* margin: 0 0.6rem; */
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  aspect-ratio: 1/1;
`;

export const HorizontalLine = styled.div`
  width: 4.35rem;
  height: 1px;
  background-color: ${(props) => props.theme.colors.primary.violet};
`;

export const Space = styled.div`
  width: 0.6rem;
`;

export const TextWrap = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const TitleWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.2rem;
`;

export const Name = styled.span`
  ${(props) => props.theme.fonts.body.small500};
  color: ${(props) => props.theme.colors.grayScale.black};
`;

export const Part = styled.span`
  ${(props) => props.theme.fonts.body.xsmall400};
  color: ${(props) => props.theme.colors.grayScale.gy600};
`;

export const Seperator = styled.div`
  width: 0.08rem;
  height: 0.8rem;
  background-color: ${(props) => props.theme.colors.grayScale.gy200};
`;

export const Description = styled.p`
  ${(props) => props.theme.fonts.body.xsmall400};
  color: ${(props) => props.theme.colors.grayScale.gy800};
  align-self: stretch;
`;
