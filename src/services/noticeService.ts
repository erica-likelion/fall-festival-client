import axiosInstance from '@/lib/AxiosInstance';

// API 응답 타입 정의
export interface NoticeItem {
  id: number;
  title: string;
  content: string;
  images: string[];
  tag: string;
}

interface NoticeListResponse {
  status: string;
  data: NoticeItem[];
  message: string;
}

interface NoticeDetailResponse {
  status: string;
  data: NoticeItem;
  message: string;
}

// API 에러 응답은 다음과 같은 형태를 가질 수 있습니다 (필요시 주석 해제하여 사용):
// interface ErrorResponse {
//   status: string;
//   code: string;
//   message: string;
//   detail: string | null;
// }

// API 기본 URL은 환경 변수에서 가져옵니다

/**
 * 공지사항 목록을 가져오는 API 함수
 * @returns {Promise<NoticeItem[]>} 공지사항 목록
 */
export const fetchNotices = async (): Promise<NoticeItem[]> => {
  try {
    // console.log('🔍 /api/notices GET 요청 시작');
    const response = await axiosInstance.get<NoticeListResponse>(`/api/notices`);
    // console.log('✅ /api/notices 응답:', response.data);
    return response.data.data;
  } catch (error) {
    console.error('❌ 공지사항 목록을 가져오는데 실패했습니다:', error);
    throw error;
  }
};

/**
 * 메인 페이지용 최신 공지사항 3개를 가져오는 API 함수
 * @returns {Promise<NoticeItem[]>} 공지사항 목록 (최신 3개)
 */
export const fetchMainNotices = async (): Promise<NoticeItem[]> => {
  try {
    const notices = await fetchNotices();
    // 서버에서 정렬된 데이터가 오지만, 안전을 위해 클라이언트 측에서도 정렬 후 최신 3개만 반환
    return notices.sort((a, b) => b.id - a.id).slice(0, 3);
  } catch (error) {
    console.error('메인 공지사항을 가져오는데 실패했습니다:', error);
    throw error;
  }
};

/**
 * 특정 공지사항 상세 정보를 가져오는 API 함수
 * @param {number} id 공지사항 ID
 * @returns {Promise<NoticeItem>} 공지사항 상세 정보
 */
export const fetchNoticeDetail = async (id: number): Promise<NoticeItem> => {
  try {
    const response = await axiosInstance.get<NoticeDetailResponse>(`/api/notices/${id}`);
    return response.data.data;
  } catch (error) {
    console.error(`공지사항 ${id}번을 가져오는데 실패했습니다:`, error);
    throw error;
  }
};

// API 서비스 객체
const noticeService = {
  fetchNotices,
  fetchMainNotices,
  fetchNoticeDetail,
};

export default noticeService;
