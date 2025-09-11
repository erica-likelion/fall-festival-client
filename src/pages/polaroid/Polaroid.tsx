import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { useLayoutStore } from '@/stores/useLayoutStore';
import { useToastStore } from '@/stores/useToastStore';
import { getTodayDateString } from '@/utils/dateUtils';
import useModal from '@/hooks/useModal';

import Onboarding1 from '@/assets/images/polaroid/onboarding/page1.webp';
import Onboarding2 from '@/assets/images/polaroid/onboarding/page2.webp';
import Onboarding3 from '@/assets/images/polaroid/onboarding/page3.webp';

import { ConfirmationModal } from '@/components/confirmation-modal';
import * as S from '@/pages/polaroid/Polaroid.styles';
import {
  Step,
  FRAMES,
  FRAME_DIMENSIONS,
  SLIDE_TEXTS,
  getCurrentFrame,
  calculatePreviewSize,
  drawPolaroidOnCanvas,
  downloadCanvasAsImage,
  isSpecialFrameAvailable,
  useDevelopAnimation,
  useShakeDevelop,
  useFrameSelection,
  useOnboardingSlides,
  usePhotoCapture,
  useContainerSize,
  SpecialFrameKey,
} from '@/features/polaroid';
import { NavBar } from '@/components/nav-bar';

const ONBOARDING_IMAGES = [Onboarding1, Onboarding2, Onboarding3];

/**
 * 폴라로이드 촬영/현상 플로우
 * - 하단 네비게이션 숨김, 상단 커스텀 헤더
 * - 온보딩 -> 촬영 -> 프레임 선택 -> 현상(Interval) -> 저장
 * TODO: 자이로(움직임) 센서를 이용해 흔들기 시 현상되도록 기능 구현
 */
export default function Polaroid() {
  const navigate = useNavigate();
  const setIsNav = useLayoutStore((s) => s.setIsNav);
  const showToast = useToastStore((s) => s.showToast);

  // 확인 모달
  const { open: openConfirmModal, close: closeConfirmModal } = useModal(ConfirmationModal);

  // 전체 단계
  const [step, setStep] = useState<Step>('intro');

  // 커스텀 훅들
  const { slideIndex, setSlideIndex } = useOnboardingSlides();
  const sliderRef = useRef<Slider | null>(null);

  const goNextSlide = () => {
    sliderRef.current?.slickNext();
  };

  const goToSlide = (index: number) => {
    sliderRef.current?.slickGoTo(index);
  };

  const { photoUrl, fileInputRef, handleShootClick, handleFileChange } = usePhotoCapture();

  const { frameCategory, frameKey, setFrameCategory, setFrameKey } = useFrameSelection();

  const { opacity, startDevelop, stopDevelop } = useDevelopAnimation();

  // 흔들기 현상 훅
  const {
    shakeCount,
    maxShakes,
    // progress,
    opacity: shakeOpacity,
    isShaking,
    permissionGranted,
    permissionDenied,
    error: shakeError,
    startShakeDevelop,
    stopShakeDevelop,
    simulateShake,
  } = useShakeDevelop();

  const { containerRef, containerWidth, containerHeight } = useContainerSize();

  // 캔버스 저장용 참조
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 미리보기 크기 계산
  const { width: previewWidth, height: previewHeight } = useMemo(
    () => calculatePreviewSize(containerWidth, containerHeight),
    [containerWidth, containerHeight],
  );

  // Calculate scale factor for inner image positioning
  const scaleFactor = useMemo(() => previewWidth / FRAME_DIMENSIONS.width, [previewWidth]);

  // 현재 선택된 프레임 정보
  const currentFrame = useMemo(
    () => getCurrentFrame(frameCategory, frameKey),
    [frameCategory, frameKey],
  );

  // 흔들기 진행률에 따른 텍스트
  const shakeProgressText = useMemo(() => {
    const currentStep = Math.min(shakeCount, maxShakes);
    return `${currentStep}/${maxShakes}`;
  }, [shakeCount, maxShakes]);

  // 진입/이탈 시 하단 탭바 숨김/복원
  useEffect(() => {
    setIsNav(false);
    return () => setIsNav(true);
  }, [setIsNav]);

  // 상단 헤더 버튼 핸들러
  const handleBack = () => {
    if (step === 'frame') {
      setStep('intro');
      setSlideIndex(2);
      // 마지막 슬라이드로 스크롤 이동
      requestAnimationFrame(() => goToSlide(2));
      return;
    }
    if (step === 'develop') {
      stopDevelop();
      stopShakeDevelop();
      setStep('frame');
      return;
    }
    if (step === 'done') {
      setStep('frame');
      return;
    }
    // intro 단계에서는 뒤로가기 = 나가기와 동일하게 동작
    handleExit();
  };

  const handleExit = () => {
    // 프레임 선택 단계 이상에서 사진이 있는 경우 확인 모달 띄우기
    if ((step === 'frame' || step === 'develop') && photoUrl) {
      openConfirmModal({
        title: '안내사항',
        message: '현상을 중단하고 홈으로 이동할까요?\n사진은 저장되지 않아요!',
        confirmText: '이동하기',
        cancelText: '머무르기',
        onConfirm: () => {
          closeConfirmModal();
          navigate('/main');
          setIsNav(true);
        },
        onCancel: () => {
          closeConfirmModal();
        },
      });
    } else {
      // 그 외의 경우는 바로 나가기
      navigate('/main');
      setIsNav(true);
    }
  };

  // 프레임 선택 완료 -> 현상 시작
  const handleStartDevelop = () => {
    console.log(
      'Starting develop, permission granted:',
      permissionGranted,
      'permission denied:',
      permissionDenied,
    );
    setStep('develop');

    // 흔들기 센서가 지원되는 경우에는 흔들기만 허용 (기본 애니메이션 사용 안함)
    if (window.DeviceMotionEvent) {
      // 권한이 있거나 이미 거절된 경우 흔들기 시작
      if (permissionGranted || permissionDenied) {
        console.log('Starting shake develop immediately');
        startShakeDevelop(() => setStep('done'));
      } else {
        console.log('❌ No permission yet, will show permission button');
      }
      // 권한이 없어도 기본 애니메이션은 시작하지 않음 (흔들기 우선)
    } else {
      // 데스크톱 등 가속도 센서가 없는 경우에만 기본 애니메이션 사용
      console.log('No device motion support, using basic animation');
      startDevelop(() => setStep('done'));
    }
  };

  // 권한 요청 후 흔들기 시작 - 단순하게
  const handleRequestPermissionAndStart = async () => {
    console.log('Permission button clicked');
    await startShakeDevelop(() => {
      console.log('Shake develop completed!');
      setStep('done');
    });
  };

  // 촬영 완료 핸들러
  const handlePhotoSelected: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    handleFileChange(e);
    if (e.target.files?.[0]) {
      setStep('frame');
    }
  };

  // 캔버스 저장
  const handleSave = async () => {
    if (!canvasRef.current || !photoUrl) return;

    try {
      await drawPolaroidOnCanvas(canvasRef.current, photoUrl, currentFrame);
      downloadCanvasAsImage(canvasRef.current);
      showToast('저장되었습니다!');
    } catch (error) {
      console.error('Failed to save polaroid:', error);
    }
  };

  const headerTitle = useMemo(() => {
    switch (step) {
      case 'intro':
        return '폴라로이드';
      case 'frame':
        return '프레임 선택';
      case 'develop':
        return '현상하기';
      case 'done':
        return '출력 완료';
      default:
        return '폴라로이드';
    }
  }, [step]);
  const isLastSlide = slideIndex === 2;

  // 스킵 버튼 핸들러
  const handleSkip = () => {
    if (isLastSlide) {
      // 마지막 슬라이드에서 "오늘하루 그만보기"
      localStorage.setItem('skipPolaroidDate', getTodayDateString());
      handleShootClick(); // 촬영하기 버튼 클릭과 동일한 동작
    } else {
      // 중간 슬라이드에서 "안내화면 스킵하기"
      goToSlide(2); // 마지막 슬라이드로 바로 이동
    }
  };

  // step이 'intro'일 때, 오늘 날짜에 스킵했는지 확인
  useEffect(() => {
    if (step === 'intro') {
      if (localStorage.getItem('skipPolaroidDate') === getTodayDateString()) {
        setTimeout(() => {
          goToSlide(2); // 마지막 슬라이드로 이동
          handleShootClick(); // 오늘 이미 스킵했다면 바로 촬영 단계로
        }, 200); // 약간의 딜레이를 줘서 UI가 먼저 렌더링되도록 함
      }
    }
  }, [step, handleShootClick]); // step이 변경될 때마다 체크

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    afterChange: (index: number) => setSlideIndex(index),
    centerMode: false,
  };

  return (
    <S.Container>
      {/* 상단 헤더 */}
      <NavBar
        isBack
        isClose={step !== 'intro'}
        title={headerTitle}
        onBackClick={handleBack}
        onCloseClick={handleExit}
      />

      {/* 본문 */}
      <S.Fullscreen role="main" ref={containerRef}>
        {step === 'intro' && (
          <>
            <S.SliderWrapper>
              <Slider ref={sliderRef} {...sliderSettings}>
                {ONBOARDING_IMAGES.map((src, i) => (
                  <S.Slide key={i}>
                    <S.OnboardingImage src={src} alt={`온보딩 이미지 ${i + 1}`} />
                    <S.SlideText>{SLIDE_TEXTS[i]}</S.SlideText>
                  </S.Slide>
                ))}
              </Slider>
            </S.SliderWrapper>
            <S.Dots>
              {[0, 1, 2].map((i) => (
                <S.Dot key={i} $active={i === slideIndex} />
              ))}
            </S.Dots>
            <S.PrimaryButton onClick={isLastSlide ? handleShootClick : goNextSlide}>
              {isLastSlide ? '촬영하기' : '다음으로'}
            </S.PrimaryButton>
            {localStorage.getItem('skipPolaroidDate') !== getTodayDateString() ? (
              <S.SkipLink onClick={handleSkip}>
                {isLastSlide ? '오늘하루 그만보기' : '안내화면 스킵하기'}
              </S.SkipLink>
            ) : (
              <S.SkipLink />
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              style={{ display: 'none' }}
              onChange={handlePhotoSelected}
            />
          </>
        )}

        {step === 'frame' && (
          <>
            <S.FramePreview>
              <S.PolaroidCard
                style={{
                  width: previewWidth,
                  height: previewHeight,
                  position: 'relative',
                }}
              >
                {/* 배경 사진 (프레임 선택 시에는 항상 보임) */}
                <div
                  style={{
                    position: 'absolute',
                    top: 90 * scaleFactor,
                    left: 90 * scaleFactor,
                    width: 900 * scaleFactor,
                    height: 1280 * scaleFactor,
                    backgroundColor: '#f0f0f0',
                    backgroundImage: photoUrl ? `url(${photoUrl})` : undefined,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    opacity: 1,
                    zIndex: 1,
                  }}
                />
                {/* 프레임 */}
                <img
                  src={currentFrame.frame}
                  alt="frame"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    pointerEvents: 'none',
                    zIndex: 2,
                  }}
                />
              </S.PolaroidCard>
            </S.FramePreview>

            {/* 카테고리 선택 */}
            <S.CategoryPicker>
              <S.CategoryTab
                $active={frameCategory === 'basic'}
                onClick={() => setFrameCategory('basic')}
              >
                기본 프레임
              </S.CategoryTab>
              <S.CategoryTab
                $active={frameCategory === 'special'}
                onClick={() => setFrameCategory('special')}
              >
                스페셜 프레임
              </S.CategoryTab>
            </S.CategoryPicker>

            {/* 프레임 선택 */}
            <S.FramePicker>
              {frameCategory === 'basic'
                ? Object.entries(FRAMES.basic).map(([key, frame]) => (
                    <S.FrameOption
                      key={key}
                      onClick={() => setFrameKey(key as keyof typeof FRAMES.basic)}
                      $selected={frameKey === key}
                    >
                      <img src={frame.thumb} alt={frame.name} />
                      <span>{frame.name}</span>
                    </S.FrameOption>
                  ))
                : Object.entries(FRAMES.special).map(([key, frame]) => {
                    const specialFrameKey = key as SpecialFrameKey;
                    const isAvailable = isSpecialFrameAvailable(specialFrameKey);
                    const dayNumber = key.replace('day', '');

                    const handleClick = () => {
                      if (isAvailable) {
                        setFrameKey(specialFrameKey);
                      } else {
                        showToast(`${dayNumber}일차 프레임은\n해당일에만 사용할 수 있어요.`);
                      }
                    };

                    return (
                      <S.FrameOption
                        key={key}
                        onClick={handleClick}
                        $selected={frameKey === key}
                        $disabled={!isAvailable}
                      >
                        <img src={frame.thumb} alt={frame.name} />
                        <span>{frame.name}</span>
                      </S.FrameOption>
                    );
                  })}
            </S.FramePicker>
            <S.PrimaryButton onClick={handleStartDevelop}>현상 시작</S.PrimaryButton>
          </>
        )}

        {step === 'develop' && (
          <>
            <S.FramePreview>
              <S.PolaroidCard
                $shaking={isShaking}
                onClick={simulateShake}
                style={{
                  width: previewWidth,
                  height: previewHeight,
                  position: 'relative',
                }}
              >
                {/* 배경 사진 */}
                <div
                  style={{
                    position: 'absolute',
                    top: 90 * scaleFactor,
                    left: 90 * scaleFactor,
                    width: 900 * scaleFactor,
                    height: 1280 * scaleFactor,
                    backgroundColor: '#f0f0f0', // 밝은 회색 초기값
                    backgroundImage: photoUrl ? `url(${photoUrl})` : undefined,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    opacity:
                      window.DeviceMotionEvent && (permissionGranted || permissionDenied)
                        ? shakeOpacity
                        : window.DeviceMotionEvent
                          ? 0
                          : opacity,
                    transition: 'opacity 0.3s ease',
                    zIndex: 1,
                  }}
                />
                {/* 프레임 (항상 보임) */}
                <img
                  src={currentFrame.frame}
                  alt="frame"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    pointerEvents: 'none',
                    zIndex: 2,
                  }}
                />
              </S.PolaroidCard>
            </S.FramePreview>

            {/* 흔들기 지원 && 권한 있음 */}
            {window.DeviceMotionEvent && permissionGranted && (
              <S.ShakeInstructions>
                <S.ShakeText>핸드폰을 흔들거나 사진을 터치해 주세요</S.ShakeText>
                {/* <S.ProgressBar>
                  <S.ProgressFill $width={progress * 100} />
                </S.ProgressBar> */}
                <S.ShakeCounter>{shakeProgressText}</S.ShakeCounter>

                {/* 데스크톱 테스트용 */}
                {/* 
                {!('ontouchstart' in window) && (
                  <button
                    onClick={simulateShake}
                    style={{
                      marginTop: '12px',
                      padding: '8px 16px',
                      background: '#666',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      fontSize: '12px',
                    }}
                  >
                    데스크톱 테스트: 클릭으로 흔들기
                  </button>
                )}
                */}
              </S.ShakeInstructions>
            )}

            {/* 흔들기 지원 && 권한 없음 */}
            {window.DeviceMotionEvent && !permissionGranted && !permissionDenied && (
              <S.ShakeInstructions>
                <S.ShakeText>
                  멋진 사진이 완성되었어요!
                  <br />
                  이제 핸드폰을 흔들어 사진을 현상해 볼까요?
                </S.ShakeText>
                <S.PermissionButton onClick={handleRequestPermissionAndStart}>
                  현상하기
                </S.PermissionButton>
                {shakeError && <S.ErrorMessage>{shakeError}</S.ErrorMessage>}
                <S.SubtleText>원활한 측정을 위해 가속도 센서 권한을 허용해 주세요</S.SubtleText>
              </S.ShakeInstructions>
            )}

            {/* 흔들기 지원 && 권한 거절됨 - 터치로 현상 */}
            {window.DeviceMotionEvent && permissionDenied && (
              <S.ShakeInstructions>
                <S.ShakeText>사진을 터치해서 현상해 주세요</S.ShakeText>
                <S.ShakeCounter>{shakeProgressText}</S.ShakeCounter>
                <S.SubtleText>
                  <br />
                  센서 권한이 없어도 터치로 현상할 수 있어요
                </S.SubtleText>
              </S.ShakeInstructions>
            )}

            {/* 흔들기 지원하지 않는 경우만 기본 현상 */}
            {!window.DeviceMotionEvent && <S.SubtleText>현상 중... 흔들어 주세요!</S.SubtleText>}
          </>
        )}

        {step === 'done' && (
          <>
            <S.FramePreview>
              <S.PolaroidCard
                style={{
                  width: previewWidth,
                  height: previewHeight,
                  position: 'relative',
                }}
              >
                {/* 배경 사진 (완성된 상태이므로 항상 보임) */}
                <div
                  style={{
                    position: 'absolute',
                    top: 90 * scaleFactor,
                    left: 90 * scaleFactor,
                    width: 900 * scaleFactor,
                    height: 1280 * scaleFactor,
                    backgroundColor: '#f0f0f0',
                    backgroundImage: photoUrl ? `url(${photoUrl})` : undefined,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    opacity: 1, // 완성된 상태
                    zIndex: 1,
                  }}
                />
                {/* 프레임 */}
                <img
                  src={currentFrame.frame}
                  alt="frame"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    pointerEvents: 'none',
                    zIndex: 2,
                  }}
                />
              </S.PolaroidCard>
            </S.FramePreview>

            {/* 흔들기로 현상했을 경우 메시지
            {window.DeviceMotionEvent && permissionGranted && shakeCount > 0 && (
              <S.SuccessMessage>멋진 폴라로이드가 완성되었어요!</S.SuccessMessage>
            )}
            */}

            <S.ButtonRow>
              <S.PrimaryButton onClick={handleSave}>저장하기</S.PrimaryButton>
              <S.SecondaryButton
                onClick={() => {
                  setStep('intro');
                  setSlideIndex(2);
                  requestAnimationFrame(() => goToSlide(2));
                }}
              >
                다시하기
              </S.SecondaryButton>
            </S.ButtonRow>
            {/* 숨김 캔버스: 저장 시 사용 */}
            <canvas ref={canvasRef} style={{ display: 'none' }} />
          </>
        )}
      </S.Fullscreen>
    </S.Container>
  );
}
