import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 21rem;
  padding: 0.5rem 0.75rem;
  justify-content: space-between;
  align-items: center;
  border-radius: 0.75rem;

  &:active {
    background-color: ${(props) => props.theme.colors.grayScale.gy50};
  }
`;

export const Image = styled.img`
  width: 3.5rem;
  height: 3.5rem;
  flex-shrink: 0;
  aspect-ratio: 1/1;
  border-radius: 0.375rem;
  background-color: ${(props) => props.theme.colors.grayScale.gy600};
  object-fit: cover;
`;

export const TextWrapper = styled.div`
  display: flex;
  width: 14.9375rem;
  height: 4rem;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  flex-shrink: 0;
  color: ${(props) => props.theme.colors.grayScale.black};
`;

export const Title = styled.p`
  ${(props) => props.theme.fonts.header.h4}
  height: 1.5rem;
  flex-shrink: 0;
  align-self: stretch;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const body = styled.p`
  ${(props) => props.theme.fonts.body.xsmall400}
  height: 2.25rem;
  flex-shrink: 0;
  align-self: stretch;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box; /* stylelint-disable-line value-no-vendor-prefix */
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-word;
`;
