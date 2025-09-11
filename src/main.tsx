import { createRoot } from 'react-dom/client';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '@/styles/global';
import { theme } from '@/styles/theme';
import { lazy, Suspense } from 'react';
import Layout from '@/layout';
import { ensureSessionCookie } from '@/utils/session';
import { PageLoadingSpinner } from '@/components/loading';

// 즉시 로드가 필요한 핵심 컴포넌트만 직접 import
import Main from '@/pages/main/Main';
import ErrorPage from '@/pages/error/ErrorPage';

// 나머지 페이지들은 lazy loading
const Map = lazy(() => import('@/pages/map/MapPage'));
const MapSearch = lazy(() => import('@/pages/map/SearchPage'));
const Performance = lazy(() => import('@/pages/performance/Performance'));
const Booth = lazy(() => import('@/pages/booth/Booth'));
const BoothDetail = lazy(() => import('@/pages/booth/BoothDetail'));
const PerformanceDetail = lazy(() => import('@/pages/performance/PerformanceDetail'));
const TimeTable = lazy(() => import('@/pages/performance/TimeTable'));
const Notice = lazy(() => import('@/pages/main/notice/Notice'));
const NoticeDetail = lazy(() => import('@/pages/main/notice/NoticeDetail'));
const MadeBy = lazy(() =>
  import('@/pages/main/made').then((module) => ({ default: module.MadeBy })),
);
const Faq = lazy(() => import('@/pages/main/faq').then((module) => ({ default: module.Faq })));
const FortuneOnboarding = lazy(() =>
  import('@/pages/main/fortune').then((module) => ({ default: module.FortuneOnboarding })),
);
const FortuneSelecting = lazy(() =>
  import('@/pages/main/fortune').then((module) => ({ default: module.FortuneSelecting })),
);
const FortuneResult = lazy(() =>
  import('@/pages/main/fortune').then((module) => ({ default: module.FortuneResult })),
);
const Polaroid = lazy(() => import('@/pages/polaroid/Polaroid'));
const Favorites = lazy(() => import('@/pages/booth/favorites/Favorites'));
const BoothSearch = lazy(() => import('@/pages/booth/search/BoothSearch'));

// 비로그인 사용자 세션 쿠키 보장
ensureSessionCookie();

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    loader: async () => {},
    errorElement: <>ERROR</>,
    children: [
      {
        index: true,
        element: <Navigate to={'/main'} replace />,
      },
      {
        path: 'main',
        element: <Main />,
      },
      /*
      {
        path: 'main/lost/search',
        element: <LostSearch />,
      },
      */
      {
        path: 'main/notice',
        element: (
          <Suspense fallback={<PageLoadingSpinner />}>
            <Notice />
          </Suspense>
        ),
      },
      {
        path: 'main/notice/:id',
        element: (
          <Suspense fallback={<PageLoadingSpinner />}>
            <NoticeDetail />
          </Suspense>
        ),
      },
      /*
      {
        path: 'main/lost',
        element: <Lost />,
      },
      {
        path: 'main/lost/upload',
        element: <LostUpload />,
      },
      {
        path: 'main/lost/upload/complete',
        element: <LostComplete />,
      },
      {
        path: 'main/lost/upload/fail',
        element: <LostFail />,
      },
      {
        path: 'main/lost/post/:id',
        element: <LostPost />,
      },
      */
      {
        path: 'main/about',
        element: (
          <Suspense
            fallback={
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100vh',
                  color: '#7E419A',
                }}
              >
                로딩 중...
              </div>
            }
          >
            <MadeBy />
          </Suspense>
        ),
      },
      {
        path: 'main/faq',
        element: (
          <Suspense
            fallback={
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100vh',
                  color: '#7E419A',
                }}
              >
                로딩 중...
              </div>
            }
          >
            <Faq />
          </Suspense>
        ),
      },
      {
        path: 'main/fortune/onboarding',
        element: (
          <Suspense
            fallback={
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100vh',
                  color: '#7E419A',
                }}
              >
                로딩 중...
              </div>
            }
          >
            <FortuneOnboarding />
          </Suspense>
        ),
      },
      {
        path: 'main/fortune/selecting',
        element: (
          <Suspense
            fallback={
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100vh',
                  color: '#7E419A',
                }}
              >
                로딩 중...
              </div>
            }
          >
            <FortuneSelecting />
          </Suspense>
        ),
      },
      {
        path: 'main/fortune/result',
        element: (
          <Suspense
            fallback={
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100vh',
                  color: '#7E419A',
                }}
              >
                로딩 중...
              </div>
            }
          >
            <FortuneResult />
          </Suspense>
        ),
      },
      /*{
        path: 'user',
        element: <User />,
      },*/
      {
        path: 'map',
        element: (
          <Suspense
            fallback={
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100vh',
                  color: '#7E419A',
                }}
              >
                로딩 중...
              </div>
            }
          >
            <Map />
          </Suspense>
        ),
      },
      {
        path: 'map/search',
        element: (
          <Suspense
            fallback={
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100vh',
                  color: '#7E419A',
                }}
              >
                로딩 중...
              </div>
            }
          >
            <MapSearch />
          </Suspense>
        ),
      },
      {
        path: 'map/:itemId',
        element: (
          <Suspense
            fallback={
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100vh',
                  color: '#7E419A',
                }}
              >
                로딩 중...
              </div>
            }
          >
            <Map />
          </Suspense>
        ),
      },
      {
        path: 'performance',
        element: (
          <Suspense
            fallback={
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100vh',
                  color: '#7E419A',
                }}
              >
                로딩 중...
              </div>
            }
          >
            <Performance />
          </Suspense>
        ),
      },

      {
        path: 'performance/detail',
        element: (
          <Suspense
            fallback={
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100vh',
                  color: '#7E419A',
                }}
              >
                로딩 중...
              </div>
            }
          >
            <PerformanceDetail />
          </Suspense>
        ),
      },
      {
        path: '/performance/timetable',
        element: (
          <Suspense
            fallback={
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100vh',
                  color: '#7E419A',
                }}
              >
                로딩 중...
              </div>
            }
          >
            <TimeTable />
          </Suspense>
        ),
      },
      {
        path: 'booth',
        element: (
          <Suspense
            fallback={
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100vh',
                  color: '#7E419A',
                }}
              >
                로딩 중...
              </div>
            }
          >
            <Booth />
          </Suspense>
        ),
      },
      {
        path: 'booth/:id',
        element: (
          <Suspense
            fallback={
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100vh',
                  color: '#7E419A',
                }}
              >
                로딩 중...
              </div>
            }
          >
            <BoothDetail />
          </Suspense>
        ),
      },
      {
        path: 'polaroid',
        element: (
          <Suspense
            fallback={
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100vh',
                  color: '#7E419A',
                }}
              >
                로딩 중...
              </div>
            }
          >
            <Polaroid />
          </Suspense>
        ),
      },
      {
        path: 'favorites',
        element: (
          <Suspense
            fallback={
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100vh',
                  color: '#7E419A',
                }}
              >
                로딩 중...
              </div>
            }
          >
            <Favorites />
          </Suspense>
        ),
      },
      {
        path: 'booth/search',
        element: (
          <Suspense
            fallback={
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100vh',
                  color: '#7E419A',
                }}
              >
                로딩 중...
              </div>
            }
          >
            <BoothSearch />
          </Suspense>
        ),
      },
      {
        path: '*',
        element: (
          <ErrorPage
            mainText="앗, 여긴 없는 길이에요!"
            subText="다시 돌아가볼까요? "
            showBackButton={true}
          />
        ),
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <RouterProvider router={routes} />
    </ThemeProvider>
  </>,
);

window.addEventListener('DOMContentLoaded', () => {
  const splash = document.getElementById('splash-screen');
  if (splash) splash.remove();
});

// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker
//       .register('/sw.js')
//       .then((registration) => {
//         console.log('✅ PWA 서비스워커 등록 완료:', registration);
//       })
//       .catch((err) => {
//         console.error('❌ PWA 서비스워커 등록 실패:', err);
//       });
//     // Firebase FCM 서비스워커 등록 비활성화
//     /*
//     navigator.serviceWorker
//       .register('/firebase-messaging-sw.js')
//       .then((registration) => {
//         console.log('✅ FCM 서비스워커 등록 완료:', registration);
//       })
//       .catch((err) => {
//         console.error('❌ FCM 서비스워커 등록 실패:', err);
//       });
//     */
//   });
// }
