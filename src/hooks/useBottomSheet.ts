import { useRef, useEffect } from 'react';
import { MIN_Y, MAX_Y } from '@/constants/map/BottomSheetOptions';

/**
 * 바텀시트 동작 추적을 위한 메트릭 인터페이스
 *
 * @interface BottomSheetMetrics
 * @property {Object} touchStart - 터치/드래그 시작 위치 정보
 * @property {number} touchStart.sheetY - 시트의 초기 Y 위치
 * @property {number} touchStart.touchY - 터치/마우스 이벤트의 초기 Y 위치
 * @property {Object} touchMove - 터치/드래그 이동 관련 정보
 * @property {number} [touchMove.prevTouchY] - 이전 터치/마우스 이벤트의 Y 위치
 * @property {('none'|'down'|'up')} touchMove.movingDirection - 현재 이동 방향
 * @property {boolean} isContentAreaTouched - 콘텐츠 영역 터치 여부
 * @property {number} currentTranslateY - 현재 시트의 translateY 값
 */
interface BottomSheetMetrics {
  touchStart: {
    sheetY: number;
    touchY: number;
  };
  touchMove: {
    prevTouchY?: number;
    movingDirection: 'none' | 'down' | 'up';
  };
  isContentAreaTouched: boolean;
  currentTranslateY: number;
}

/**
 * 바텀시트 기능을 제공하는 커스텀 훅
 *
 * 헤더 영역에서의 드래그를 통한 시트 이동, 콘텐츠 영역의 스크롤 기능을 제공합니다.
 * 모바일 터치 이벤트와 데스크톱 마우스 이벤트를 모두 지원합니다.
 *
 * @returns {Object} 바텀시트 제어에 필요한 객체와 함수들
 * @returns {RefObject<HTMLDivElement>} sheet - 바텀시트 전체 요소에 대한 ref
 * @returns {RefObject<HTMLDivElement>} header - 바텀시트 헤더 요소에 대한 ref (드래그 가능 영역)
 * @returns {RefObject<HTMLDivElement>} content - 바텀시트 콘텐츠 요소에 대한 ref (스크롤 영역)
 * @returns {Function} resetBottomSheet - 바텀시트를 초기 위치로 되돌리는 함수
 * @returns {Function} closeBottomSheet - 바텀시트를 완전히 닫는 함수
 *
 * @example
 * const { sheet, header, content, resetBottomSheet, closeBottomSheet } = useBottomSheet();
 *
 * return (
 *   <div ref={sheet} className="bottom-sheet">
 *     <div ref={header} className="bottom-sheet-header">
 *       <div className="handle" />
 *     </div>
 *     <div ref={content} className="bottom-sheet-content">
 *       // 콘텐츠 내용
 *     </div>
 *   </div>
 * );
 */
export const useBottomSheet = () => {
  const sheet = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const header = useRef<HTMLDivElement>(null);

  // 메트릭을 함수로 만들어서 매번 새로운 객체 반환
  const createMetrics = (): BottomSheetMetrics => ({
    touchStart: {
      sheetY: 0,
      touchY: 0,
    },
    touchMove: {
      prevTouchY: 0,
      movingDirection: 'none',
    },
    isContentAreaTouched: false,
    currentTranslateY: 0,
  });

  const metrics = useRef<BottomSheetMetrics>(createMetrics());

  // 직접 시트 위치 설정 함수
  const setSheetPosition = (translateY: number) => {
    if (!sheet.current) return;

    // 경계 체크
    if (translateY < MIN_Y - MAX_Y) translateY = MIN_Y - MAX_Y;
    if (translateY > 0) translateY = 0;

    metrics.current.currentTranslateY = translateY;
    sheet.current.style.transform = `translateY(${translateY}px)`;
  };

  useEffect(() => {
    if (!sheet.current || !content.current || !header.current) return;

    // 메트릭 초기화 (컴포넌트 리렌더링 시 상태 초기화)
    metrics.current = createMetrics();

    // 초기 위치 설정
    setSheetPosition(0);

    // 초기 스크롤 위치 최상단으로 설정
    content.current.scrollTop = 0;

    // GPU 가속 활성화
    sheet.current.style.willChange = 'transform';

    const headerElement = header.current;
    const contentElement = content.current;
    const sheetElement = sheet.current;

    // 헤더 드래그 이벤트 핸들러 (터치)
    const handleHeaderTouchStart = (e: TouchEvent) => {
      e.stopPropagation();
      metrics.current.touchStart.sheetY = sheetElement.getBoundingClientRect().y;
      metrics.current.touchStart.touchY = e.touches[0].clientY;
    };

    const handleHeaderTouchMove = (e: TouchEvent) => {
      e.stopPropagation();
      e.preventDefault();

      const currentTouch = e.touches[0];
      const touchOffset = currentTouch.clientY - metrics.current.touchStart.touchY;
      let newTranslateY = metrics.current.currentTranslateY + touchOffset;

      if (newTranslateY < MIN_Y - MAX_Y) newTranslateY = MIN_Y - MAX_Y;
      if (newTranslateY > 0) newTranslateY = 0;

      metrics.current.touchStart.touchY = currentTouch.clientY;
      requestAnimationFrame(() => setSheetPosition(newTranslateY));
    };

    const handleHeaderTouchEnd = () => {
      metrics.current.touchStart = { sheetY: 0, touchY: 0 };
    };

    // 헤더 드래그 이벤트 핸들러 (마우스)
    let isMouseDown = false;

    const handleHeaderMouseDown = (e: MouseEvent) => {
      e.stopPropagation();
      isMouseDown = true;
      metrics.current.touchStart.sheetY = sheetElement.getBoundingClientRect().y;
      metrics.current.touchStart.touchY = e.clientY;
    };

    const handleHeaderMouseMove = (e: MouseEvent) => {
      if (!isMouseDown) return;
      e.stopPropagation();
      e.preventDefault();

      const mouseOffset = e.clientY - metrics.current.touchStart.touchY;
      let newTranslateY = metrics.current.currentTranslateY + mouseOffset;

      if (newTranslateY < MIN_Y - MAX_Y) newTranslateY = MIN_Y - MAX_Y;
      if (newTranslateY > 0) newTranslateY = 0;

      metrics.current.touchStart.touchY = e.clientY;
      requestAnimationFrame(() => setSheetPosition(newTranslateY));
    };

    const handleHeaderMouseUp = () => {
      isMouseDown = false;
      metrics.current.touchStart = { sheetY: 0, touchY: 0 };
    };

    // 바텀 시트 헤더에 이벤트 리스너 추가 (터치)
    headerElement.addEventListener('touchstart', handleHeaderTouchStart);
    headerElement.addEventListener('touchmove', handleHeaderTouchMove);
    headerElement.addEventListener('touchend', handleHeaderTouchEnd);

    // 바텀 시트 헤더에 이벤트 리스너 추가 (마우스)
    headerElement.addEventListener('mousedown', handleHeaderMouseDown);
    document.addEventListener('mousemove', handleHeaderMouseMove);
    document.addEventListener('mouseup', handleHeaderMouseUp);

    // 콘텐츠 영역 스크롤 이벤트 핸들러
    const handleContentScroll = () => {
      if (!metrics.current.isContentAreaTouched) {
        contentElement.style.overflowY = 'auto';
      }
    };

    // 콘텐츠 영역 터치 이벤트 핸들러
    const handleContentTouch = () => {
      metrics.current.isContentAreaTouched = true;
      contentElement.style.overflowY = 'auto';
    };

    const handleContentTouchEnd = () => {
      metrics.current.isContentAreaTouched = false;
    };

    // 콘텐츠 영역에 이벤트 리스너 추가
    contentElement.addEventListener('touchstart', handleContentTouch, { passive: true });
    contentElement.addEventListener('touchend', handleContentTouchEnd, { passive: true });
    contentElement.addEventListener('scroll', handleContentScroll, { passive: true });

    // cleanup 함수
    return () => {
      // 헤더 이벤트 리스너 제거 (터치)
      headerElement.removeEventListener('touchstart', handleHeaderTouchStart);
      headerElement.removeEventListener('touchmove', handleHeaderTouchMove);
      headerElement.removeEventListener('touchend', handleHeaderTouchEnd);

      // 헤더 이벤트 리스너 제거 (마우스)
      headerElement.removeEventListener('mousedown', handleHeaderMouseDown);
      document.removeEventListener('mousemove', handleHeaderMouseMove);
      document.removeEventListener('mouseup', handleHeaderMouseUp);

      // 콘텐츠 이벤트 리스너 제거
      contentElement.removeEventListener('touchstart', handleContentTouch);
      contentElement.removeEventListener('touchend', handleContentTouchEnd);
      contentElement.removeEventListener('scroll', handleContentScroll);
    };
  }, []);

  // 콘텐츠 영역은 더 이상 특별한 이벤트 처리가 필요 없음
  // 헤더에서만 드래그를 처리하기 때문

  const resetBottomSheet = () => {
    // 메트릭 완전 초기화 - 새로운 객체로 교체
    metrics.current = createMetrics();

    setSheetPosition(0); // 맨 아래로 이동

    // 콘텐츠 스크롤도 초기화
    if (content.current) {
      content.current.scrollTop = 0;
    }
  };

  return { sheet, content, header, resetBottomSheet };
};
