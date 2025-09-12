export const NOTIFICATION_STORAGE_KEY = 'festival-notifications';

/**
 * 카테고리별 공지사항 정보
 *
 * @property title - 공지사항 제목
 * @property path - 연결될 세부 정보 페이지 경로 (선택 사항)
 * @property showByDefault - 기본적으로 표시 여부 (false면 표시하지 않음)
 */
export interface CategoryNotification {
  title: string;
  path?: string;
}

/**
 * 각 카테고리별 공지사항 데이터
 */
export const CATEGORY_NOTIFICATIONS: Record<string, CategoryNotification> = {
  주점: {
    title: '[공지] 주류 구매 가이드',
    path: '/main/notice/15',
  },
};
