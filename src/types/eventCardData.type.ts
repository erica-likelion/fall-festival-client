/**
 * 이벤트 카드 데이터 타입
 */
export interface EventCardData {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  location: string;
  date: string;
  noticeId: number | null; // 이벤트와 연결된 공지사항 ID (없으면 null)
}
