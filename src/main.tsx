import { createRoot } from 'react-dom/client';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '@/styles/global';
import { theme } from '@/styles/theme';
import { lazy, Suspense } from 'react';
import Layout from '@/layout';
import { ensureSessionCookie } from '@/utils/session';
import { PageLoadingSpinner } from '@/components/loading';

// jQuery 전역 설정 (react-slick)
import $ from 'jquery';
window.$ = window.jQuery = $;

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

function withSuspense(element: React.ReactNode) {
  return <Suspense fallback={<PageLoadingSpinner />}>{element}</Suspense>;
}

const lazyRoutes = [
  { path: 'main/notice', element: <Notice /> },
  { path: 'main/notice/:id', element: <NoticeDetail /> },
  { path: 'main/about', element: <MadeBy /> },
  { path: 'main/faq', element: <Faq /> },
  { path: 'main/fortune/onboarding', element: <FortuneOnboarding /> },
  { path: 'main/fortune/selecting', element: <FortuneSelecting /> },
  { path: 'main/fortune/result', element: <FortuneResult /> },
  { path: 'map', element: <Map /> },
  { path: 'map/search', element: <MapSearch /> },
  { path: 'map/:itemId', element: <Map /> },
  { path: 'performance', element: <Performance /> },
  { path: 'performance/detail', element: <PerformanceDetail /> },
  { path: '/performance/timetable', element: <TimeTable /> },
  { path: 'booth', element: <Booth /> },
  { path: 'booth/:id', element: <BoothDetail /> },
  { path: 'polaroid', element: <Polaroid /> },
  { path: 'favorites', element: <Favorites /> },
  { path: 'booth/search', element: <BoothSearch /> },
];

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    loader: async () => {},
    errorElement: (
      <ErrorPage
        mainText="무언가가 잘못되었어요!"
        subText="잠시 후 다시 시도해주세요."
        showHomeButton={true}
      />
    ),
    children: [
      {
        index: true,
        element: <Navigate to={'/main'} replace />,
      },
      {
        path: 'main',
        element: <Main />,
      },
      ...lazyRoutes.map(({ path, element }) => ({
        path,
        element: withSuspense(element),
      })),
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

  // 전역 이미지 lazy loading 적용
  document.querySelectorAll('img').forEach((img) => {
    if (!img.hasAttribute('loading')) {
      img.setAttribute('loading', 'lazy');
    }
  });
});

// 새로 추가되는 이미지도 자동 처리
const imageObserver = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === 'childList') {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const element = node as Element;
          const images = element.tagName === 'IMG' ? [element] : element.querySelectorAll('img');
          images.forEach((img) => {
            if (!img.hasAttribute('loading')) {
              img.setAttribute('loading', 'lazy');
            }
          });
        }
      });
    }
  });
});

imageObserver.observe(document.body, { childList: true, subtree: true });
