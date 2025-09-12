import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 21rem;
`;

export const NoticeItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  background-color: ${(props) => props.theme.colors.grayScale.white};
  border-radius: 16px;
  padding: 0.7rem 1rem 0.7rem 0.7rem;
  box-shadow: 0 0 12px 0 rgb(126 65 154 / 30%);
`;

export const ImageThumbnail = styled.img`
  width: 4rem;
  height: 4rem;
  flex-shrink: 0;
  aspect-ratio: 1/1;
  border-radius: 12px;
  background-color: transparent;
  object-fit: cover;
`;

export const TextContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  min-width: 0;
`;

export const NoticeTitle = styled.p`
  ${(props) => props.theme.fonts.body.medium500};
  color: ${(props) => props.theme.colors.grayScale.black};
  margin-bottom: 0.25rem;
  line-height: 110%;
`;

export const NoticeContent = styled.p`
  ${(props) => props.theme.fonts.body.xsmall500};
  color: ${(props) => props.theme.colors.grayScale.gy700};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

// 로딩, 에러, 빈 목록 메시지용 스타일
export const LoadingText = styled.p`
  ${(props) => props.theme.fonts.body.medium500}
  text-align: center;
  color: ${(props) => props.theme.colors.grayScale.offwhite};
  margin: 2rem 0;
`;

export const ErrorText = styled.p`
  ${(props) => props.theme.fonts.body.medium500};
  color: ${(props) => props.theme.colors.secondary.rd500};
  text-align: center;
  padding: 1.5rem 0;
`;

export const NoNoticeText = styled.p`
  ${(props) => props.theme.fonts.body.medium500};
  color: ${(props) => props.theme.colors.grayScale.gy700};
  text-align: center;
  padding: 1.5rem 0;
`;
