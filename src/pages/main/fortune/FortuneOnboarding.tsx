import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavBar } from '@/components/nav-bar';
import * as S from './FortuneOnboarding.styles';
import { useLayoutStore } from '@/stores/useLayoutStore';
import { useToastStore } from '@/stores/useToastStore';
import { useFortune } from '@/hooks/useFortune';
import Lottie from 'react-lottie-player';
import fortuneAnimation from '@/assets/lotties/fortune/Background_Size.json';
import FortuneBall from '@/assets/images/fortune/Ball.webp';
import useModal from '@/hooks/useModal';
import ValidationModal from '@/components/validation-modal/ValidationModal';

export default function FortuneOnboarding() {
  const setIsNav = useLayoutStore((state) => state.setIsNav);
  const navigate = useNavigate();
  const showToast = useToastStore((state) => state.showToast);
  const { getFortune, loading } = useFortune();
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const { open: openModal, close: closeModal } = useModal(ValidationModal);

  const handleCloseClick = () => {
    navigate('/main');
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleBirthDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // 숫자만 허용
    setBirthDate(value);
  };

  const isValidDate = (dateString: string) => {
    if (dateString.length !== 8) return false;

    const year = parseInt(dateString.substring(0, 4));
    const month = parseInt(dateString.substring(4, 6));
    const day = parseInt(dateString.substring(6, 8));

    // 연도 범위 검증 (1900-현재년도) -> 해당 부분에 대한 논의 필요
    const currentYear = new Date().getFullYear();
    if (year < 1900 || year > currentYear) return false;

    if (month < 1 || month > 12) return false;

    // 일 범위 검증 (해당 월의 실제 일수 확인)
    const date = new Date(year, month - 1, day);
    return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
  };

  const handleFortuneClick = async () => {
    if (!name.trim()) {
      openModal({
        title: '이름을 확인해 주세요!',
        message: '아직 이름이 입력되지 않았어요.\n원활한 진행을 위해 이름을 입력해 주세요!',
        buttonText: '다시 입력하기',
        onConfirm: closeModal,
      });
      return;
    }

    if (!isValidDate(birthDate)) {
      openModal({
        title: '생년월일을 확인해 주세요!',
        message: '유효하지 않은 생년월일이에요. \n 올바른 생년월일 8자리를 입력해주세요!',
        buttonText: '다시 입력하기',
        onConfirm: closeModal,
      });
      return;
    }

    if (loading) return;

    try {
      const imageUrl = await getFortune({ name, birth: birthDate });
      navigate('/main/fortune/selecting', {
        state: { name, birthDate, fortuneImageUrl: imageUrl },
      });
    } catch {
      showToast('동시 접속자가 너무 많아\n잠시 후 다시 시도해주세요.');
    }
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
        hideLeft
        isClose={true}
        onCloseClick={handleCloseClick}
        opacity={true}
        whiteIcons={true}
      />

      <S.Content>
        <S.Subtitle>
          오늘은 어떤 하루가 될까요? {'\n'} 당신을 알려주시면 행운이 반짝일거예요!
        </S.Subtitle>
        <S.Fortunelotties>
          <Lottie
            loop
            animationData={fortuneAnimation}
            play
            style={{ width: '100%', height: '100%' }}
          />
          <img src={FortuneBall} />
        </S.Fortunelotties>
        <S.InputSection>
          <S.InputGroup>
            <S.Input
              type="text"
              placeholder="이름을 입력해주세요."
              value={name}
              onChange={handleNameChange}
            />
          </S.InputGroup>
          <S.InputGroup>
            <S.Input
              type="text"
              placeholder="생년월일 8자리를 입력해주세요."
              value={birthDate}
              onChange={handleBirthDateChange}
              maxLength={8}
            />
          </S.InputGroup>
          <S.RefreshButton onClick={handleFortuneClick}>오늘의 운세 보러가기</S.RefreshButton>
          <S.Memo>입력하신 정보는 축제가 끝나면 깨끗하게 사라져요</S.Memo>
        </S.InputSection>
      </S.Content>
    </S.Container>
  );
}
