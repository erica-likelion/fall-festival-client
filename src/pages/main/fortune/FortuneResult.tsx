import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { NavBar } from '@/components/nav-bar';
import * as S from './FortuneResult.styles';
import { useLayoutStore } from '@/stores/useLayoutStore';
import FortuneCardBack from '@/assets/images/fortune/FortuneCardBack_big.webp';
import ResultDummy from '@/assets/images/fortune/resultdummy.webp';

interface LocationState {
  selectedCardIndex: number;
  name: string;
  birthDate: string;
  fortuneImageUrl?: string;
}

export default function FortuneResult() {
  const setIsNav = useLayoutStore((state) => state.setIsNav);
  const navigate = useNavigate();
  const location = useLocation();
  const [isFlipped, setIsFlipped] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const state = location.state as LocationState;
  const selectedCardIndex = state?.selectedCardIndex ?? 0;
  const name = state?.name || 'Username';
  const fortuneImageUrl = state?.fortuneImageUrl;

  const today = new Date();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  const handleCloseClick = () => {
    navigate('/main');
  };

  const handleCardClick = () => {
    if (imageLoaded) {
      setIsFlipped(true);
    }
  };

  useEffect(() => {
    setIsNav(false);
    setTimeout(() => setIsVisible(true), 600);
    return () => {
      setIsNav(true);
    };
  }, [setIsNav]);

  useEffect(() => {
    if (fortuneImageUrl) {
      const img = new Image();
      img.onload = () => setImageLoaded(true);
      img.onerror = () => setImageLoaded(true);
      img.src = fortuneImageUrl;

      if (img.complete) {
        setImageLoaded(true);
      }
    } else {
      setImageLoaded(true);
    }
  }, [fortuneImageUrl]);

  return (
    <S.Container>
      <NavBar
        hideLeft
        isClose={true}
        onCloseClick={handleCloseClick}
        opacity={true}
        whiteIcons={true}
      />

      <S.Content>
        <S.Title>
          {!isFlipped
            ? '카드를 터치하여 \n 오늘의 운세를 확인해보세요'
            : `${month}월 ${day}일의 ${name}님은 \n 이만큼 행복할 거예요!`}
        </S.Title>

        <S.CardContainer>
          <S.CardInner
            $isFlipped={isFlipped}
            $isVisible={isVisible}
            $imageLoaded={imageLoaded}
            onClick={handleCardClick}
            aria-pressed={isFlipped}
            disabled={!imageLoaded}
          >
            <S.CardFaceFront>
              <img
                src={FortuneCardBack}
                alt={`selected fortune card ${selectedCardIndex + 1} back`}
              />
            </S.CardFaceFront>
            <S.CardFaceBack>
              <img src={fortuneImageUrl || ResultDummy} alt="fortune result" />
            </S.CardFaceBack>
          </S.CardInner>
        </S.CardContainer>
      </S.Content>
    </S.Container>
  );
}
