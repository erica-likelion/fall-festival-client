import * as S from './Card.styles';
import { CardProps } from './Card.types';

import StarIcon from '@/assets/icons/staricon.svg?react';

/**
 * Card 컴포넌트
 * @param {number} index - 인덱스
 * @param {string} image - 이미지 URL
 * @param {string} label - 버튼 내부에 표시될 텍스트
 * @param {string} name - 이름
 * @param {string} description - 설명
 * @returns {JSX.Element}
 */

export default function Card({ index, image, label, name, description }: CardProps) {
  return (
    <S.Container>
      <S.Wrap index={index}>
        <S.TextWrap>
          <S.TitleWrap className="title-wrap">
            <S.Name>{name}</S.Name>
            <S.Seperator />
            <S.Part>{label}</S.Part>
          </S.TitleWrap>
          <S.Description
            dangerouslySetInnerHTML={{ __html: description.replace(/\n/g, '<br/>') }}
          />
        </S.TextWrap>
        <StarIcon style={{ margin: '.1rem' }} />
        <S.HorizontalLine />
        <S.Space />
        <S.ImageBox>
          <S.Image src={image} alt="made by" />
        </S.ImageBox>
      </S.Wrap>
    </S.Container>
  );
}
