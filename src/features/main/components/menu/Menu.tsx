import { useNavigate } from 'react-router-dom';
import * as S from './Menu.styles';
import { ImageTextIconFrame } from '@/components/image-text-icon-frame';
import { ImageBannerFrame } from '@/components/image-banner-frame';
import { externalLinks } from '@/constants/main/ExternalLink';

// import Form from '@/assets/icons/form_logo.svg';

import FortuneBannerImg from '@/assets/images/fortune-banner-sm.webp';

// import Make from '@/assets/icons/lionlove_logo.svg';
// import Lion from '@/assets/icons/lion_logo.svg';

import Link from '@/assets/images/menu/link.webp';
import Faq from '@/assets/images/menu/faq.webp';
import Form from '@/assets/images/menu/form.webp';
import Made from '@/assets/images/menu/made.webp';

import Lion from '@/assets/images/menu/lion.webp';
import Student from '@/assets/images/menu/ericanote.webp';
import Club from '@/assets/images/menu/clubassoc.webp';

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

  const openExternalLink = (url: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
            image={Link}
            title="축제 문의 남기기"
            description="축기단 링크트리로 이동"
            onClick={() => openExternalLink(externalLinks.linkTree)}
          />
          <ImageTextIconFrame
            image={Faq}
            title="축제 FAQ"
            description="자주 묻는 질문"
            onClick={() => navigate('/main/faq')}
          />
          <ImageTextIconFrame
            image={Form}
            title="축제 웹앱 사용후기 남기러 가기"
            description="이번 축제 웹앱 어떠셨나요?"
            onClick={() => openExternalLink(externalLinks.googleForm)}
          />
          <ImageTextIconFrame
            image={Made}
            title="만든 이들"
            description="멋쟁이사자처럼 아기사자들의 제작 후기"
            onClick={() => navigate('/main/about')}
          />
        </S.Frame>
      </S.Section>

      <S.Section>
        <S.SubTitle aria-label="SNS">SNS</S.SubTitle>
        <S.Frame>
          <ImageTextIconFrame
            image={Student}
            title="제43대 총학생회 [ NOTE ]"
            description="인스타그램 바로가기"
            onClick={() => openExternalLink(externalLinks.instagramStudent)}
          />
          <ImageTextIconFrame
            image={Club}
            title="제3대 총동아리연합회 [ HERE ]"
            description="인스타그램 바로가기"
            onClick={() => openExternalLink(externalLinks.instagramClubAssoc)}
          />
          <ImageTextIconFrame
            image={Lion}
            title="IT 창업 동아리 [ 멋쟁이사자처럼 ]"
            description="인스타그램 바로가기"
            onClick={() => openExternalLink(externalLinks.instagramLikelion)}
          />
        </S.Frame>
      </S.Section>
    </S.SectionContainer>
  );
}
