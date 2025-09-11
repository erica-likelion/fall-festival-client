import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { NavBar } from '@/components/nav-bar';
import * as S from './FortuneSelecting.styles';
import { useLayoutStore } from '@/stores/useLayoutStore';
import FortuneCardBack from '@/assets/images/fortune/FortuneCardBack.webp';

interface LocationState {
  name: string;
  birthDate: string;
  fortuneImageUrl: string;
}

export default function FortuneSelecting() {
  const setIsNav = useLayoutStore((state) => state.setIsNav);
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as LocationState;
  const { name, birthDate, fortuneImageUrl } = state || {
    name: '',
    birthDate: '',
    fortuneImageUrl: '',
  };

  const handleCloseClick = () => {
    navigate('/main');
  };

  const handleCardClick = (cardIndex: number) => {
    navigate('/main/fortune/result', {
      state: {
        selectedCardIndex: cardIndex,
        name,
        birthDate,
        fortuneImageUrl,
      },
    });
  };

  useEffect(() => {
    setIsNav(false);
    return () => {
      setIsNav(true);
    };
  }, [setIsNav]);

  return (
    <S.Container>
      <NavBar
        isBack
        isClose={true}
        onCloseClick={handleCloseClick}
        opacity={true}
        whiteIcons={true}
      />

      <S.Content>
        <S.Title>지금 이 순간 마음이 이끌리는 {'\n'} 카드 한 장을 뽑아주세요!</S.Title>

        <S.CardSection>
          <S.CardRow>
            <S.Card src={FortuneCardBack} alt="fortune card 1" onClick={() => handleCardClick(0)} />
            <S.Card src={FortuneCardBack} alt="fortune card 2" onClick={() => handleCardClick(1)} />
          </S.CardRow>
          <S.CardRow>
            <S.Card src={FortuneCardBack} alt="fortune card 3" onClick={() => handleCardClick(2)} />
            <S.Card src={FortuneCardBack} alt="fortune card 4" onClick={() => handleCardClick(3)} />
            <S.Card src={FortuneCardBack} alt="fortune card 5" onClick={() => handleCardClick(4)} />
          </S.CardRow>
        </S.CardSection>
      </S.Content>
    </S.Container>
  );
}
