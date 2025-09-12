import { CSSWidthValue } from '@/types/css-values.types';

export type ImageTextFrameWithOrganizationProps = {
  /** 이미지 URL */
  image: string;

  /** 제목 */
  title: string;

  /** 조직명 */
  organization: string;

  /** 픽업 가능 여부 */
  canPickup: boolean;

  /** 클릭 이벤트 핸들러 (선택) */
  onClick?: () => void;

  /** 너비 (선택) */
  width?: CSSWidthValue;

  /** 활성화 스타일 여부 */
  activeStyle?: boolean;

  /** 부스 ID (이미지 스타일 결정용) */
  boothId?: number;
};

export type ImageTextFrameWithTimeProps = {
  /** 이미지 URL */
  image: string;

  /** 제목 */
  title: string;

  /** 부제목 */
  subtitle: string;

  /** 시간 정보 */
  time: string;

  /** 픽업 가능 여부 */
  // canPickup: boolean; (사용 중지)

  /** 클릭 이벤트 핸들러 (선택) */
  onClick?: () => void;

  /** 너비 (선택) */
  width?: CSSWidthValue;

  /** 활성화 스타일 여부 */
  activeStyle?: boolean;

  /** 상세페이지 경로 */
  path?: string;
};

export type MenuFrameProps = {
  /** 메뉴 이름 */
  menu: string;

  /** 설명 */
  description: string;

  /** 가격 */
  price: string;

  /** 너비 (선택) */
  width?: CSSWidthValue;
};
