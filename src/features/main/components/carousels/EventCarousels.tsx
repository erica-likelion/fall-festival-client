import { useRef, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import * as S from './EventCarousels.styles';
import { EventCard } from '../cards';
import { useNavigate } from 'react-router-dom';
import { EventCardData } from '@/types/eventCardData.type';

interface EventCarouselsProps {
  events: EventCardData[];
}

/**
 * Carousels 컴포넌트
 * - MainEventData를 기반으로 UI를 렌더링
 * - 이벤트 데이터가 없을 경우 기본 메시지 표시
 */

export default function EventCarousels({ events }: EventCarouselsProps) {
  const navigate = useNavigate();
  const isSwipingRef = useRef(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 진행 중인 이벤트가 없을 경우 표시할 데이터
  const noEventsData: EventCardData[] = [
    {
      id: '1',
      title: '진행 중인 콘텐츠가 없어요!',
      startTime: '',
      endTime: '',
      location: '',
      date: '곧 새로운 콘텐츠가 시작될 예정입니다',
      noticeId: null, // 링크 없음
    },
  ];

  // 이벤트가 비어있으면 기본 메시지를 표시
  const todayEvents = events.length > 0 ? events : noEventsData;

  // 아이템 개수에 상관없이 일관된 설정 적용
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    centerMode: false,
    variableWidth: false,
    initialSlide: 0,

    autoplay: true,
    autoplaySpeed: 8000,
    pauseOnFocus: true,
    pauseOnHover: true,

    beforeChange: () => {
      isSwipingRef.current = true;
    },
    afterChange: (current: number) => {
      setCurrentIndex(current);
      setTimeout(() => {
        isSwipingRef.current = false;
      }, 100);
    },
  };

  return (
    <S.Wrapper>
      <S.CardWrap>
        {/* 모든 경우에 동일하게 처리 */}
        <Slider {...settings}>
          {todayEvents.map((card, i) => (
            <div key={i}>
              <EventCard
                {...card}
                onClick={() => {
                  if (isSwipingRef.current) return;
                  // API에서 받은 noticeId가 있을 경우에만 해당 공지사항으로 이동
                  if (card.noticeId) {
                    navigate(`/main/notice/${card.noticeId}`);
                  }
                }}
              />
            </div>
          ))}
        </Slider>
      </S.CardWrap>

      {/* Float된 Pill - 이벤트가 2개 이상일 때만 표시 */}
      {todayEvents.length > 1 && (
        <S.PillWrapper>
          <S.FloatingPill>
            {currentIndex + 1} <span>/ {todayEvents.length}</span>
          </S.FloatingPill>
        </S.PillWrapper>
      )}

      {/*
      <S.CursorBox>
        <Cursor width={'12.625rem'} height={'3.72063rem'} />
      </S.CursorBox>      
      <Indicator currentPage={index} totalPages={todayEvents.length} />
      */}
    </S.Wrapper>
  );
}
