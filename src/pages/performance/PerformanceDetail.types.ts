export type PerformanceDetailsProps = {
  id: string; // 공연 고유 ID
  backgroundUrl: string; // 배경 이미지 URL
  singer: string; // 가수 이름
  fcm_singer: string; // FCM용 가수 이름
  time: string; // 공연 시간 (ex: "21:00~22:00")
  description: string; // 가수 설명
  songList: Song[]; // 대표곡 리스트
  day: string; // 실제 공연 일차 (API에서 받은 데이터)
  selectedDay?: string; // 선택된 일차 (뒤로가기용)
};

export type Song = {
  image: string; // 노래 썸네일 이미지 URL
  name: string; // 노래 제목
  url: string; // 노래 링크 (유튜브 링크)
};
