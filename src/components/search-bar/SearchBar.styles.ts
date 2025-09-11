import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  display: flex;
  width: 20.9375rem;
  height: 2.8125rem;
  flex-shrink: 0;
  background: ${(props) => props.theme.colors.grayScale.white};
  border-radius: 0.75rem;
  box-shadow: 0 0 0.75rem 0 ${(props) => props.theme.colors.primary.violet}4D;
  padding: 0 1.375rem 0 1.5rem;
  align-items: center;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) => props.theme.colors.grayScale.gy50};
  }
`;

export const SearchInput = styled.div`
  display: flex;
  width: 13.75rem;
  height: 2rem;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  cursor: pointer;
`;

export const Placeholder = styled.span`
  color: ${(props) => props.theme.colors.grayScale.gy500};
  font-family: Pretendard, sans-serif;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: 142%;
  letter-spacing: -0.0175rem;
`;

export const Separator = styled.div`
  display: inline-flex;
  height: 1rem;
  flex-direction: column;
  align-items: flex-start;
  flex-shrink: 0;
  width: 0.0625rem;
  background-color: ${(props) => props.theme.colors.grayScale.gy200};
`;

export const DropdownContainer = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  cursor: pointer;
  margin-left: 0.813rem;
`;

export const DropdownText = styled.span`
  color: ${(props) => props.theme.colors.grayScale.gy900};
  text-align: center;
  font-family: Pretendard, sans-serif;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.375rem;
`;

export const DropdownIcon = styled.div<{ $isOpen: boolean }>`
  transform: ${({ $isOpen }) => ($isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: transform 0.2s ease;
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.25rem;
  background-color: ${(props) => props.theme.colors.grayScale.white};
  border: 0.0625rem solid ${(props) => props.theme.colors.grayScale.gy100};
  border-radius: 0.5rem;
  box-shadow: 0 0.25rem 0.75rem rgb(0 0 0 / 10%);
  z-index: 1000;
  min-width: 5rem;
`;

export const DropdownItem = styled.div`
  padding: 0.5rem 0.75rem;
  color: ${(props) => props.theme.colors.grayScale.gy900};
  font-family: Pretendard, sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${(props) => props.theme.colors.grayScale.gy50};
  }

  &:first-child {
    border-radius: 0.5rem 0.5rem 0 0;
  }

  &:last-child {
    border-radius: 0 0 0.5rem 0.5rem;
  }
`;
