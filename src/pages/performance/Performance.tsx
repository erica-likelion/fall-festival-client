import * as S from './Performance.styles';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLayoutStore } from '@/stores/useLayoutStore';
import { Notification } from '@/components/notification';
import { Tabs } from '@/components/tabs';
import NewCarousel from '@/features/performance/NewCarousel';
import { ModalHelp } from '@/features/performance';
import useModal from '@/hooks/useModal';
import { NavBar } from '@/components/nav-bar/NavBar';
import { usePerformanceStore, DayType } from '@/stores/usePerformanceStore';
import { PerformanceItem } from '@/features/performance/Carousel.types';
import { getCurrentFestivalDayKorea } from '@/utils/newDateUtils';
import { FESTIVAL_START_DATE, FESTIVAL_TOTAL_DAYS } from '@/constants/festival/dates';

/**
 * Performance 페이지
 * @returns {JSX.Element}
 */
export default function Performance() {
  const { open } = useModal(ModalHelp);
  const navigate = useNavigate();
  const location = useLocation();
  const setIsNav = useLayoutStore((s) => s.setIsNav);

  // 뒤로가기 시 전달받은 selectedDay를 초기값으로 사용 (한국 시간 기준 현재 일차)
  const getInitialSelectedDay = (): DayType => {
    const state = location.state as { selectedDay?: DayType } | null;
    const sessionSelectedDay = sessionStorage.getItem('performanceSelectedDay') as DayType;
    const currentDay = getCurrentFestivalDayKorea(
      FESTIVAL_START_DATE,
      FESTIVAL_TOTAL_DAYS,
    ) as DayType;
    return state?.selectedDay || sessionSelectedDay || currentDay;
  };

  const [selectedDay, setSelectedDay] = useState<DayType>(getInitialSelectedDay());
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Performance store 사용
  const { fetchPerformances, getPerformancesByDay, loading, error, isInitialized } =
    usePerformanceStore();

  const performances = getPerformancesByDay(selectedDay);

  // 진입/이탈 시 하단 탭바 숨김/복원
  React.useEffect(() => {
    setIsNav(true);
    return () => setIsNav(true);
  }, [setIsNav]);

  // 컴포넌트 마운트 시 한 번만 데이터 가져오기
  useEffect(() => {
    if (!isInitialized) {
      fetchPerformances();
    }
  }, [fetchPerformances, isInitialized, loading, error, performances.length]);

  // 일차 변경 시 인덱스 초기화 및 sessionStorage 저장
  React.useEffect(() => {
    // sessionStorage에 selectedDay 저장
    sessionStorage.setItem('performanceSelectedDay', selectedDay);
    setCurrentIndex(0);
  }, [selectedDay]);

  const handleHelpClick = () => {
    open(
      {
        title: '공연 정보 제공 안내',
      },
      {
        isHelpIcon: false,
      },
    );
  };

  const handleArtistClick = (artistData: PerformanceItem) => {
    // sessionStorage에 selectedDay 저장 (뒤로가기용)
    sessionStorage.setItem('performanceSelectedDay', selectedDay);

    navigate('/performance/detail', {
      state: {
        ...artistData,
        day: selectedDay, // API에서 받은 실제 일차 정보 전달
        selectedDay,
      },
    });
  };

  const getProgressBarProps = () => {
    if (performances.length <= 1) {
      return { width: '100%', left: '0%' };
    }

    const progressWidth = (1 / performances.length) * 100;
    // 일반적인 비례 계산
    const progressLeft = (currentIndex / (performances.length - 1)) * (100 - progressWidth);

    return {
      width: `${progressWidth}%`,
      left: `${progressLeft}%`,
    };
  };

  const { width, left } = getProgressBarProps();

  return (
    <S.PerformanceContainer>
      {/* 상단 헤더 */}
      <NavBar hideLeft={true} title="공연" isClose={false} />

      {/* 본문 */}
      <S.Fullscreen role="main">
        <S.InfoWrap>
          <Notification
            title="[공지] 공연관람 유의사항"
            onClick={() => navigate('/main/notice/14')}
          />
        </S.InfoWrap>

        <S.DayWrap>
          <S.TabsHelpWrap>
            <Tabs
              tabs={['1일차', '2일차', '3일차']}
              activeTab={selectedDay}
              onTabClick={(tab) => setSelectedDay(tab as DayType)}
              gap="0.25rem"
            />
            <S.HelpIconStyled onClick={() => handleHelpClick()} />
          </S.TabsHelpWrap>
        </S.DayWrap>

        <S.Carousel $isFirstDay={selectedDay === '1일차'}>
          {loading ? (
            <div>공연 정보를 불러오는 중...</div>
          ) : error ? (
            // 에러 페이지로 네비게이션
            (() => {
              navigate('/error', {
                state: {
                  mainText: '앗! 공연 정보를 불러올 수 없어요.',
                  subText: '잠시 후에 다시 시도해주세요!',
                  showBackButton: true,
                  showHomeButton: true,
                },
              });
              return null;
            })()
          ) : (
            <NewCarousel
              data={performances}
              onIndexChange={setCurrentIndex}
              onArtistClick={handleArtistClick}
            />
          )}
        </S.Carousel>

        {performances.length > 0 && (
          <S.ProgressContainer>
            <S.ProgressBar>
              <S.ProgressFill width={width} left={left} />
            </S.ProgressBar>
          </S.ProgressContainer>
        )}

        <S.TimeTableButton onClick={() => navigate('/performance/timetable')}>
          전체 타임 테이블 보러가기
        </S.TimeTableButton>
      </S.Fullscreen>
    </S.PerformanceContainer>
  );
}
