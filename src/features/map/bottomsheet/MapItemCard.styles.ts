import styled from 'styled-components';

export const MapItemCardContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 20.9375rem;
  gap: 0.75rem;
  border-radius: 0.45rem;
  background-color: ${(props) => props.theme.colors.grayScale.white};
  cursor: pointer;
  overflow: hidden;
`;

export const ItemImage = styled.img`
  width: 4.5rem; /* 72px */
  height: 4.5rem; /* 72px */
  flex-shrink: 0;
  border-radius: 0.45rem;
  object-fit: cover;
`;

export const ItemContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const ItemTitle = styled.h3`
  color: ${(props) => props.theme.colors.grayScale.gy900};
  font-size: 1rem;
  font-weight: 600;
  line-height: 150%;
  letter-spacing: -0.02rem;
  margin: 0.0938rem 0 0;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ItemCategory = styled.span`
  color: ${(props) => props.theme.colors.grayScale.gy700};
  text-align: left;
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: -0.015rem;
  margin: 0.1563rem 0 0;
`;

export const BoothItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 0.75rem;
`;

export const Pickup = styled.div`
  display: flex;
  padding: 0.125rem 0.375rem; /* 2px 6px */
  align-items: center;
  gap: 0.125rem; /* 2px */
  border-radius: 0.75rem; /* 12px */
  background: ${(props) => props.theme.colors.primary.violet}20; /* rgba(126, 65, 154, 0.20) */
  margin-top: 0.25rem;
  ${(props) => props.theme.fonts.body.xsmall500};
  color: ${(props) => props.theme.colors.primary.violet};
  text-align: center;
`;
