import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 20.9375rem;
  gap: 1rem;
  padding: 1rem 0rem;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const Count = styled.p`
  ${(props) => props.theme.fonts.body.xsmall500};
  color: ${(props) => props.theme.colors.grayScale.gy500};
`;

export const BoothList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: -8px;
  padding-bottom: 7.5rem;
`;

export const BoothItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
`;

export const HorizontalLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${(props) => props.theme.colors.grayScale.gy200};
`;

export const BoothItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 0.75rem;
`;

export const TabContainer = styled.div<{ width?: string }>`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 24px;
  margin-top: -0.23rem;
  width: ${({ width }) => width || '20.9375rem'};
  height: 2.5rem;
  padding: 0.5rem 0rem;
  background-color: ${(props) => props.theme.colors.grayScale.gy50};
`;

export const TabSlider = styled.div<{ $activeIndex: number }>`
  position: absolute;
  width: calc(50% - 0px);
  height: calc(100% - 0px);
  background-color: ${(props) => props.theme.colors.primary.violet};
  border-radius: 22px;
  transform: translateX(${({ $activeIndex }) => $activeIndex * 100}%);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 1px 6px ${(props) => props.theme.colors.primary.violet}70;
  z-index: 3;
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 4rem 0;
`;

export const EmptyText = styled.p`
  ${(props) => props.theme.fonts.body.medium400};
  color: ${(props) => props.theme.colors.grayScale.gy400};
  text-align: center;
  white-space: pre-line;
  margin-top: 50px;
`;

export const TabButton = styled.button<{ $active: boolean }>`
  ${(props) => props.theme.fonts.body.small400};
  flex: 1;
  height: 2.5rem;
  border-radius: 22px;
  border: none;
  cursor: pointer;
  position: relative;
  z-index: 4;
  background: transparent;
  color: ${({ $active, theme }) =>
    $active ? theme.colors.grayScale.white : theme.colors.grayScale.gy600};
  transition: color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`;
