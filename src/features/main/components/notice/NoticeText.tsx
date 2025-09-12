import { NoticeTextProps } from './Notice.types';
import * as S from './NoticeText.styles';

/**
 * 공지사항 텍스트 컴포넌트
 * @param {string} [image] - 공지사항 이미지
 * @param {string} title - 공지사항 제목
 * @param {string} body - 공지사항 본문
 * @returns {JSX.Element} 공지사항 텍스트 UI
 */

export default function NoticeText({ image, title, body }: NoticeTextProps) {
  return (
    <>
      <S.Container>
        <S.Image src={image} alt="notice" loading="lazy" />
        <S.TextWrapper>
          <S.Title>{title}</S.Title>
          <S.body>{body}</S.body>
        </S.TextWrapper>
      </S.Container>
    </>
  );
}
