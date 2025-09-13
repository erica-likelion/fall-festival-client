import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import * as S from './Layout.styles';
import Nav from '@/layout/nav';
import Main from '@/layout/main/Main';
import { useLayoutStore } from '@/stores/useLayoutStore';
import { Modal as ModalProvider } from '@/components/modal';
import { Toast } from '@/components/toast';

/**
 * Layout component
 * @returns {JSX.Element}
 */
export default function Layout() {
  const isNav = useLayoutStore((state) => state.isNav);
  const location = useLocation();

  // 경로에 따른 테마 컬러 변경
  useEffect(() => {
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (!themeColorMeta) return;

    // /main 또는 /main/fortune으로 시작하는 페이지에서 보라색 테마 사용
    const isVioletThemePage =
      location.pathname === '/main' ||
      location.pathname === '/' ||
      location.pathname.startsWith('/main/fortune');

    const themeColor = isVioletThemePage ? '#7E419A' : '#fafafa';

    themeColorMeta.setAttribute('content', themeColor);

    // body 배경색도 함께 변경
    document.body.style.backgroundColor = themeColor;
  }, [location.pathname]);

  return (
    <S.Container>
      {isNav && <Nav />}
      <AnimatePresence mode="wait">
        <Main>
          <Outlet />
        </Main>
      </AnimatePresence>
      <ModalProvider />
      <Toast />
    </S.Container>
  );
}
