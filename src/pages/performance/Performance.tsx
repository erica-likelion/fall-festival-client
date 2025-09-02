import * as S from './Performance.styles';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLayoutStore } from '@/stores/useLayoutStore';
import { Notification } from '@/components/notification';
import { Tabs } from '@/components/tabs';

import NewCarousel from '@/features/performance/NewCarousel';
import { performanceData } from '@/constants/performance/SingerInfo';
import { ModalHelp } from '@/features/performance';
import useModal from '@/hooks/useModal';
import { PerformanceItem } from '@/features/performance/Carousel.types';
import { NavBar } from '@/components/nav-bar/NavBar';

export type DayType = '1일차' | '2일차' | '3일차';

/**
 * Performance 페이지
 * @returns {JSX.Element}
 */

export default function Performance() {
  const { open } = useModal(ModalHelp);
  const navigate = useNavigate();
  const setIsNav = useLayoutStore((s) => s.setIsNav);
  const [selectedDay, setSelectedDay] = useState<DayType>('2일차');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const performances = performanceData[selectedDay];

  // 진입/이탈 시 하단 탭바 숨김/복원
  React.useEffect(() => {
    setIsNav(true);
    return () => setIsNav(true);
  }, [setIsNav]);

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
    navigate('/performance/detail', { state: artistData });
  };

  return (
    <S.PerformanceContainer>
      {/* 상단 헤더 */}
      <NavBar hideLeft={true} title="공연" isClose={false} />

      {/* 본문 */}
      <S.Fullscreen role="main">
        <S.InfoWrap>
          <Notification
            title="[공지] 공연관람 유의사항"
            onClick={() => navigate('/main/notice/25')}
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
          <NewCarousel
            data={performances}
            onIndexChange={setCurrentIndex}
            onArtistClick={handleArtistClick}
          />
        </S.Carousel>
        {performances.length > 0 && (
          <S.ProgressContainer>
            <S.ProgressBar>
              {(() => {
                const slidesToShow = 1.5;
                const adjustedLength = performances.length - slidesToShow + 1;
                return (
                  <S.ProgressFill
                    width={`${100 / adjustedLength}%`}
                    left={`${(currentIndex / (adjustedLength - 1)) * (100 - 100 / adjustedLength)}%`}
                  />
                );
              })()}
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
