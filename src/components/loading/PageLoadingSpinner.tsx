import * as S from './PageLoadingSpinner.styles';

export default function PageLoadingSpinner() {
  return (
    <S.LoadingContainer>
      <S.LoadingSpinner />
      <S.LoadingText>잠시만 기다려 주세요...</S.LoadingText>
    </S.LoadingContainer>
  );
}
