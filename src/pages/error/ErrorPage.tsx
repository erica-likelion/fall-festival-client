import { useNavigate, useLocation } from 'react-router-dom';
import * as S from './ErrorPage.styles';

import BackIcon from '@/assets/icons/left-arrow.svg?react';
// import ErrorIcon from '@/assets/icons/error.svg?react';
import { AccentButton } from '@/components/accentbuttons';

interface ErrorPageProps {
  mainText?: string;
  subText?: string;
  showBackButton?: boolean;
  showHomeButton?: boolean;
}

const ErrorPage = ({
  mainText: propMainText = '오류가 발생했습니다',
  subText: propSubText = '',
  showBackButton: propShowBackButton = false,
  showHomeButton: propShowHomeButton = true,
}: ErrorPageProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  // location.state에서 전달받은 데이터 우선 사용
  const state = location.state as ErrorPageProps | null;
  const mainText = state?.mainText || propMainText;
  const subText = state?.subText || propSubText;
  const showBackButton = state?.showBackButton ?? propShowBackButton;
  const showHomeButton = state?.showHomeButton ?? propShowHomeButton;

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <S.ErrorPageContainer>
      {showBackButton ? (
        <S.BackButton>
          <BackIcon
            style={{ cursor: 'pointer' }}
            width={'0.95rem'}
            height={'0.95rem'}
            onClick={handleGoBack}
          />
        </S.BackButton>
      ) : (
        <S.MainLogo />
      )}
      <S.ErrorContent>
        <S.ErrorIconWrapper>
          <img src="/error/icon.svg" style={{ width: '4rem' }} />
        </S.ErrorIconWrapper>
        <S.ErrorMainText>{mainText}</S.ErrorMainText>
        {subText ? <S.ErrorSubText>{subText}</S.ErrorSubText> : <br />}
        {showHomeButton && (
          <AccentButton onClick={() => (window.location.href = '/')} label="홈으로 가기" />
        )}
      </S.ErrorContent>
    </S.ErrorPageContainer>
  );
};

export default ErrorPage;
