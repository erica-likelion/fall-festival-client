import styled from 'styled-components';
import { motion } from 'framer-motion';
import { BOTTOM_SHEET_HEIGHT } from '@/constants/map/BottomSheetOptions';

export const BottomSheetMotionDiv = styled(motion.div)`
  height: ${BOTTOM_SHEET_HEIGHT};
  width: 100%;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: calc(100% - 13.875rem); /* 뷰포트 하단 기준 몇 px */
  left: 0;
  right: 0;
  margin: 0;
  border-top-left-radius: 0.75rem;
  border-top-right-radius: 0.75rem;
  background-color: ${(props) => props.theme.colors.grayScale.white};
  transition: transform 150ms ease-out;
  overflow: hidden;
  will-change: transform; /* 성능 최적화 */
  touch-action: pan-y; /* 수직 스크롤만 허용 */
  -webkit-overflow-scrolling: touch; /* iOS 스크롤 부드럽게 */
  box-shadow: 0 -0.25rem 1rem 0 ${(props) => props.theme.colors.primary.violet}30;
`;

export const BottomSheetHeader = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0.5rem 0 1rem;
  margin: 0 1.25rem;
  cursor: grab;
  touch-action: none;
  user-select: none;

  &:active {
    cursor: grabbing;
  }
`;

export const Handle = styled.div`
  width: 2.75rem;
  height: 0.25rem;
  border-radius: 0.125rem;
  background-color: #d4d4d4;
  margin-bottom: 8px;
`;

export const BottomSheetContent = styled.div`
  flex: 1;
  overflow-y: auto;
  overscroll-behavior: contain;
  color: ${(props) => props.theme.colors.grayScale.black};
  padding: 0 1.25rem;
  position: relative;
  -webkit-overflow-scrolling: touch; /* iOS 스크롤 부드럽게 */

  /* 스크롤바 숨기기 */
  -ms-overflow-style: none; /* IE, Edge */
  scrollbar-width: none; /* Firefox */

  /* Chrome, Safari */
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ContentUnitWrap = styled.div<{ $isLastItem?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  padding: 0.75rem 0;
  margin-bottom: ${(props) => (props.$isLastItem ? '39rem' : '0')};
`;

export const NoDataMessage = styled.div`
  color: ${(props) => props.theme.colors.grayScale.gy900};
  font-size: 1rem;
  text-align: center;
  padding: 1rem;
`;

/**
 * 개발 환경에서만 표시되는 기능을 위한 섹션
 *
 * 개발 모드에서만 표시되며 디버깅이나 상태 초기화 등의 기능을 제공합니다.
 */
export const DevSection = styled.div`
  margin: 1.5rem 0;
  padding: 1rem;
  border-top: 0.0625rem solid ${(props) => props.theme.colors.grayScale.gy50};
  text-align: center;
`;

/**
 * 개발 환경에서 사용하는 버튼 스타일
 *
 * 알림 상태 초기화와 같은 개발 시 필요한 기능에 사용합니다.
 */
export const DevButton = styled.button`
  background-color: #2d2d2d;
  color: #f0f0f0;
  border: 0.0625rem solid ${(props) => props.theme.colors.grayScale.gy100};
  border-radius: 0.25rem;
  padding: 0.625rem 1rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #3d3d3d;
  }

  &:active {
    background-color: #333;
  }
`;

// 빌드 실패나서 임시로 추가
export const BoothListContainer = styled.div``;
