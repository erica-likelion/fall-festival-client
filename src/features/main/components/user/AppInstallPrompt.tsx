import { BeforeInstallPromptEvent } from '@/types/window';
import { useEffect, useState } from 'react';
import * as S from './AppInstallPrompt.styles';
import { easeOut } from 'framer-motion';
import { AccentButton } from '@/components/accentbuttons';

export default function AppInstallPrompt({ forced = false }: { forced?: boolean }) {
  const [isVisible, setIsVisible] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const isDeviceIOS = /iPad|iPhone|iPod/.test(window.navigator.userAgent);

  const handleBeforeInstallPrompt = (event: BeforeInstallPromptEvent) => {
    event.preventDefault();
    setDeferredPrompt(event);
    setIsVisible(true);
  };

  useEffect(() => {
    if (forced) {
      setIsVisible(true);
      return;
    }

    // If the user has dismissed the prompt, do nothing.
    if (localStorage.getItem('isAppInstallDismissed') === 'true') {
      return;
    }

    if (isDeviceIOS) {
      setIsVisible(true);
    } else {
      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    }

    return () => {
      if (!isDeviceIOS && !forced) {
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      }
    };
  }, [isDeviceIOS, forced]);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(() => {
        setIsVisible(false);
      });
    } else {
      // Handle forced or iOS click
      setIsVisible(false);
    }
  };

  const handleCancelClick = () => {
    // User has dismissed the prompt. Don't show it again.
    if (!forced) {
      localStorage.setItem('isAppInstallDismissed', 'true');
    }
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <AppInstallPromptModal
      handleInstallClick={handleInstallClick}
      handleCancelClick={handleCancelClick}
      platform={isDeviceIOS ? 'ios' : 'android'}
    />
  );
}

function AppInstallPromptModal({
  handleInstallClick,
  handleCancelClick,
  platform,
}: {
  handleInstallClick: () => void;
  handleCancelClick: () => void;
  platform: 'ios' | 'android';
}) {
  return (
    <S.ModalOverlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <S.ModalWrapper
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8 }}
        transition={{ delay: 0.2, duration: 0.2, ease: easeOut }}
      >
        <S.ModalTab>
          <S.ModalTitle>
            <S.ModalTitleText>홈 화면 추가하기</S.ModalTitleText>
          </S.ModalTitle>
          <S.ModalCloseBtn onClick={handleCancelClick} fill="#17171B" width={18} height={18} />
        </S.ModalTab>
        <S.Content>
          {platform === 'ios' ? (
            <S.ModalText>
              사파리 브라우저신가요?
              <br /> 공유하기, 홈 화면 추가하기를 눌러주세요!
            </S.ModalText>
          ) : (
            <S.ModalText>
              홈 화면에 추가하면
              <br /> 더 편리하게 축제를 즐길 수 있어요!
            </S.ModalText>
          )}
          {platform === 'android' && (
            <>
              <AccentButton onClick={handleInstallClick} label="홈 화면에 추가하기" />
              <S.CancelButton onClick={handleCancelClick}>불편해도 웹에서 이용하기</S.CancelButton>
            </>
          )}
          {platform === 'ios' && <AccentButton onClick={handleCancelClick} label="확인했습니다!" />}
        </S.Content>
      </S.ModalWrapper>
    </S.ModalOverlay>
  );
}
