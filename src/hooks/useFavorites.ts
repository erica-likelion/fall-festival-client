import { useState } from 'react';

/**
 * 주점 찜하기 기능을 위한 커스텀 훅
 * localStorage를 사용하여 찜한 주점 목록을 관리합니다.
 */
export const useFavorites = () => {
  // 찜하기 상태 관리 (localStorage에서 초기값 로드)
  const [favorites, setFavorites] = useState<number[]>(() => {
    const saved = localStorage.getItem('booth-favorites');
    return saved ? JSON.parse(saved) : [];
  });

  /**
   * 주점 찜하기/찜해제 토글 함수
   * @param boothId - 토글할 주점 ID
   * @param event - 클릭 이벤트 (옵션)
   */
  const handleToggleFavorite = (boothId: number, event?: React.MouseEvent) => {
    event?.stopPropagation();

    setFavorites((prev) => {
      const newFavorites = prev.includes(boothId)
        ? prev.filter((id) => id !== boothId)
        : [...prev, boothId];

      localStorage.setItem('booth-favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  /**
   * 특정 주점이 찜되었는지 확인하는 함수
   * @param boothId - 확인할 주점 ID
   * @returns 찜 여부
   */
  const isFavorited = (boothId: number): boolean => {
    return favorites.includes(boothId);
  };

  return {
    favorites,
    handleToggleFavorite,
    isFavorited,
  };
};
