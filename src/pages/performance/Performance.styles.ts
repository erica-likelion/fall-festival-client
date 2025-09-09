import styled from 'styled-components';
import HelpIcon from '@/assets/icons/nrk_help.svg?react';

export const PerformanceContainer = styled.div`
  width: 100%;
  height: auto;
  position: relative;

  /* margin-bottom: 5.37rem; */
`;

export const Header = styled.header`
  height: 56px;
  display: grid;
  grid-template-columns: 56px 1fr 56px;
  align-items: center;
  border-bottom: 1px solid ${(p) => p.theme.colors.grayScale.gy100};
`;

export const HeaderButton = styled.button`
  height: 100%;
  background: transparent;
  border: none;
  color: ${(p) => p.theme.colors.grayScale.gy900};
  ${(p) => p.theme.fonts.header.h3};
`;

export const HeaderTitle = styled.div`
  text-align: center;
  ${(p) => p.theme.fonts.header.h4};
  color: ${(p) => p.theme.colors.grayScale.gy900};
`;

export const Fullscreen = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  overflow: hidden auto;
  min-height: 0;
  height: calc(100dvh - 5.5rem);
`;

export const InfoWrap = styled.div`
  display: flex;
  min-width: 20.9375rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  margin-top: 4.625rem;
`;

export const DayWrap = styled.div`
  display: flex;
  min-width: 20.9375rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.375rem;
  margin-top: 1rem;
`;

export const TabsHelpWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

export const HelpIconStyled = styled(HelpIcon)`
  width: 1.125rem;
  height: 1.125rem;
  cursor: pointer;
  fill: ${(props) => props.theme.colors.grayScale.gy300};
`;

export const Carousel = styled.div<{ $isFirstDay?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center; /* ${(props) => (props.$isFirstDay ? 'center' : 'flex-start')}; */
  gap: 0.75rem;
  width: 100%;
  margin-top: 1.5rem;
  overflow: visible;
  flex: 1;
`;

export const TableNoteWrap = styled.div`
  flex: 1;
  display: flex;
  min-width: 20.9375rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  margin-top: 2.5rem;
`;

export const FrameBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.44rem;
`;

export const NoteText = styled.p`
  align-self: stretch;
  ${(props) => props.theme.fonts.header.h3};
  color: ${(props) => props.theme.colors.grayScale.black};
`;

export const TimeTableButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.25rem 1.4rem 2rem;
  align-self: flex-end;
  ${(props) => props.theme.fonts.body.xsmall600};
  color: ${(props) => props.theme.colors.primary.violet};
  text-align: center;
  text-decoration-line: underline;
  text-decoration-style: solid;
  background: transparent;
  border: none;
  cursor: pointer;
`;

export const ProgressContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: center;
`;

export const ProgressBar = styled.div`
  width: 20.9375rem;
  height: 0.125rem;
  background: ${(props) => props.theme.colors.grayScale.gy200_eee};
  position: relative;
  border-radius: 0.125rem;
`;

export const ProgressFill = styled.div<{ width: string; left: string }>`
  width: ${(props) => props.width};
  height: 0.2rem;
  background: ${(props) => props.theme.colors.secondary.vl800};
  position: absolute;
  left: ${(props) => props.left};
  top: 50%;
  transform: translateY(-50%);
  border-radius: 0.125rem;
  transition: all 0.3s ease;
`;
