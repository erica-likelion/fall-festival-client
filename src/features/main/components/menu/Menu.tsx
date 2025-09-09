import { useNavigate } from 'react-router-dom';
import * as S from './Menu.styles';
import { ImageTextIconFrame } from '@/components/image-text-icon-frame';
import { ImageBannerFrame } from '@/components/image-banner-frame';
import { externalLinks } from '@/constants/main/ExternalLink';
import Student from '@/assets/images/menu/ericanote.jpeg';
import Form from '@/assets/icons/form_logo.svg';
// import Fortune from '@/assets/icons/pixel_moon.svg';
import FortuneBannerImg from '@/assets/images/fortune-banner.webp';

import Make from '@/assets/icons/lionlove_logo.svg';
import Lion from '@/assets/icons/lion_logo.svg';

import MainNoticeList from '@/features/main/components/notice/MainNoticeList';
import Right from '@/assets/icons/right-arrow.svg?react';

/**
 * Menu 컴포넌트
 * 메뉴 클릭시 내부 경로 이동 또는 외부 URL로 연결
 * @component
 * @returns {JSX.Element}
 */

export default function Menu() {
  const navigate = useNavigate();

  return (
    <S.SectionContainer>
      <S.Section>
        <S.Frame>
          <ImageBannerFrame
            image={FortuneBannerImg}
            onClick={() => navigate('/main/fortune/onboarding')}
            backgroundColor="rgba(250, 250, 250, 0.50)"
          />
        </S.Frame>
        <S.TitleWrapper>
          <S.Title>공지사항</S.Title>
          <S.MoreButton whileTap={{ scale: 0.95 }} onClick={() => navigate('/main/notice')}>
            <S.BtnText>전체 보기</S.BtnText>
            <Right width={'1rem'} height={'1rem'} />
          </S.MoreButton>
        </S.TitleWrapper>
        <MainNoticeList />
      </S.Section>

      <S.Section>
        {/* 링크 수정필요 */}
        <S.SubTitle aria-label="문의사항 및 후기">문의사항 및 후기</S.SubTitle>
        <S.Frame>
          <ImageTextIconFrame
            title="축제 문의 남기기"
            description="축기단 링크트리로 이동"
            onClick={() => window.open(externalLinks.linkTree, '_blank')}
          />
          <ImageTextIconFrame
            title="축제 FAQ"
            description="자주 묻는 질문"
            onClick={() => navigate('/main/faq')}
          />
          <ImageTextIconFrame
            image={Form}
            title="축제 웹앱 사용후기"
            description="구글폼 링크로 이동"
            onClick={() => window.open(externalLinks.googleForm, '_blank')}
          />
          <ImageTextIconFrame
            image={Make}
            title="만든 이들"
            description="멋쟁이사자처럼 운영진 제작 후기"
            onClick={() => navigate('/main/about')}
          />
        </S.Frame>
      </S.Section>

      <S.Section>
        <S.SubTitle aria-label="SNS">SNS</S.SubTitle>
        <S.Frame>
          <ImageTextIconFrame
            image={Student}
            title="제 43대 총학생회 [ NOTE ]"
            description="인스타그램 바로가기"
            onClick={() => window.open(externalLinks.instagramStudent, '_blank')}
          />
          <ImageTextIconFrame
            image={Lion}
            title="제3대 총동아리연합회 [ HERE ]"
            description="인스타그램 바로가기"
            onClick={() => window.open(externalLinks.instagramClubAssoc, '_blank')}
          />
          <ImageTextIconFrame
            image={Lion}
            title="IT 창업 동아리 [ 멋쟁이사자처럼 ]"
            description="인스타그램 바로가기"
            onClick={() => window.open(externalLinks.instagramLikelion, '_blank')}
          />
        </S.Frame>
      </S.Section>
    </S.SectionContainer>
  );
}
