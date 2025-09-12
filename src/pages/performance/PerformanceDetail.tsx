import { useLocation, useNavigate } from 'react-router-dom';
import CalendarIcon from '@/assets/icons/calendar-black.svg?react';
import TimePerformanceIcon from '@/assets/icons/time-performance.svg?react';
import StageFillIcon from '@/assets/icons/stage-fill.svg?react';
import * as S from './PerformanceDetail.styles';
import { PerformanceDetailsProps } from './PerformanceDetail.types';
import { useLayoutStore } from '@/stores/useLayoutStore';
import { useEffect } from 'react';
import { NavBar } from '@/components/nav-bar/NavBar';

/**
 * 공연 상세 페이지 컴포넌트
 *
 * React Router의 `Link` 컴포넌트에서 `state`로 전달된 공연 정보를 기반으로 렌더링됩니다.
 *
 * 전달 데이터 구조 (`PerformanceDetailsProps`):
 * - backgroundUrl: 배경 이미지 URL
 * - singer: 가수 이름
 * - time: 공연 시간 (예: "21:00~22:00")
 * - description: 가수 설명
 * - songList: 대표곡 리스트 (이미지, 곡명, 외부 URL 포함)
 * - day: 실제 공연 일차 (API에서 받은 데이터)
 *
 * @returns JSX.Element
 */

export default function PerformanceDetail() {
  const { state } = useLocation() as { state: PerformanceDetailsProps };
  const setIsNav = useLayoutStore((state) => state.setIsNav);
  const navigate = useNavigate();

  useEffect(() => {
    setIsNav(false);
    return () => {
      setIsNav(true);
    };
  }, [setIsNav]);

  if (!state) {
    console.error('❌ [ERROR] No state provided to PerformanceDetail!');
    return (
      <div>
        <h1>Error: No performance data provided</h1>
        <button onClick={() => navigate('/performance')}>Back to Performance</button>
      </div>
    );
  }

  const { backgroundUrl, singer, time, songList, description, day } = state;
  // selectedDay는 Performance 페이지에서 뒤로가기 시 복원용으로 사용됨 (현재는 사용하지 않음)

  const handleExit = () => {
    navigate('/main');
  };

  return (
    <S.DetailsContainer>
      {/* 상단 헤더 */}
      <NavBar
        isBack={true}
        title="공연 상세정보"
        isClose={true}
        backPath="/performance"
        onCloseClick={handleExit}
        opacity={true}
      />

      {/* 본문 */}
      <S.Fullscreen role="main">
        {/* 아티스트 정보 섹션 */}
        <S.ArtistInfoSection>
          <S.ArtistCircleWrapper>
            <S.ArtistCircle>
              <S.ArtistCircleImage src={backgroundUrl} alt={singer} />
            </S.ArtistCircle>
          </S.ArtistCircleWrapper>
          <S.ArtistTextSection>
            <S.ArtistName>{singer}</S.ArtistName>
            <S.ArtistGenre>{description}</S.ArtistGenre>
            <S.ArtistInfoBox>
              <S.InfoItem>
                <CalendarIcon width="1rem" height="1rem" />
                <S.InfoText>{day}</S.InfoText>
              </S.InfoItem>
              <S.InfoItem>
                <TimePerformanceIcon width="1rem" height="1rem" />
                <S.InfoText>{time}</S.InfoText>
              </S.InfoItem>
            </S.ArtistInfoBox>
          </S.ArtistTextSection>
        </S.ArtistInfoSection>

        <S.TitleSongWrap>
          <S.TitleSongText>대표곡</S.TitleSongText>
          <S.SongWrap>
            {songList.map((song, index) => (
              <S.SongBox key={index} onClick={() => window.open(song.url, '_blank')}>
                <S.Wrap>
                  <S.SongImage src={song.image} />
                  <S.SongName>{song.name}</S.SongName>
                </S.Wrap>
                <S.SongIcon>
                  <StageFillIcon width={'1.5rem'} height={'1.5rem'} />
                </S.SongIcon>
              </S.SongBox>
            ))}
          </S.SongWrap>
        </S.TitleSongWrap>
      </S.Fullscreen>
    </S.DetailsContainer>
  );
}
