import { EventCardData } from '@/types/eventCardData.type';

// import { NavBar } from '@/components/nav-bar';
import * as S from './Main.styles';
import { EventCarousels } from '@/features/main/components/carousels';
import { Menu } from '@/features/main/components/menu/index';

// import { useNavigate } from 'react-router-dom';
import { Footer } from '@/features/main/components/user';
import { useEffect, useState } from 'react';
import { ensureSessionCookie } from '@/utils/session';
import AppInstallPrompt from '@/features/main/components/user/AppInstallPrompt';
import { fetchCurrentEvents, convertToEventCardData } from '@/services/eventService';

export default function Main() {
  // const navigate = useNavigate();
  const [events, setEvents] = useState<EventCardData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 첫 방문이 아니어도 세션 쿠키 없으면 보충
    ensureSessionCookie();

    // 이벤트 데이터 가져오기
    const getEvents = async () => {
      try {
        setLoading(true);
        const eventsData = await fetchCurrentEvents();
        const formattedEvents = convertToEventCardData(eventsData);
        setEvents(formattedEvents);
        setError(null);
      } catch (err) {
        console.error('이벤트 데이터 가져오기 실패:', err);
        setError('이벤트 정보를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    getEvents();
  }, []);

  return (
    <S.Container>
      <AppInstallPrompt />
      <S.Layout />
      <S.TitleBar>
        <S.MainLogo />
      </S.TitleBar>
      <S.Main>
        <section>
          <S.TitleWrapper style={{ marginTop: '6rem', marginBottom: 0 }}>
            <S.Title>진행 중인 콘텐츠</S.Title>
          </S.TitleWrapper>
          <S.CarouselsBox>
            {loading ? (
              <>
                {/* <S.LoadingText>이벤트 정보를 불러오는 중...</S.LoadingText> */}
                <EventCarousels
                  events={[
                    {
                      id: 'loading',
                      title: '불러오는 중...',
                      startTime: '',
                      endTime: '',
                      location: '',
                      date: '',
                      noticeId: null,
                    },
                  ]}
                />
              </>
            ) : error ? (
              <S.ErrorText>{error}</S.ErrorText>
            ) : (
              <EventCarousels events={events} />
            )}
          </S.CarouselsBox>
        </section>
        {/* !isLoggedIn && <UserLogin /> */}
        <Menu />
        <Footer />
      </S.Main>
    </S.Container>
  );
}
