/**
 * 한국 시간 기준으로 페스티벌 일차를 계산하는 유틸리티 함수
 *
 * @param festivalStartDate - 페스티벌 시작 날짜 (YYYY-MM-DD 형식)
 * @param totalDays - 페스티벌 총 일수 (기본값: 3)
 * @returns '1일차', '2일차', '3일차' 등의 형식으로 현재 일차를 반환
 */

// 한국 시간대 오프셋 (UTC+9)
const KOREA_TIME_OFFSET = 9 * 60; // 9시간을 분으로 변환

/**
 * 현재 한국 시간을 반환하는 함수
 */
function getKoreaTime(): Date {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const koreaTime = new Date(utc + KOREA_TIME_OFFSET * 60000);
  return koreaTime;
}

/**
 * 한국 시간 기준으로 페스티벌 일차를 계산하는 함수
 *
 * @param festivalStartDate - 페스티벌 시작 날짜 (YYYY-MM-DD 형식)
 * @param totalDays - 페스티벌 총 일수 (기본값: 3)
 * @returns '1일차', '2일차', '3일차' 등의 형식으로 현재 일차를 반환
 */
export function getCurrentFestivalDayKorea(
  festivalStartDate: string,
  totalDays: number = 3,
): string {
  // 페스티벌 시작 날짜를 한국 시간으로 설정
  const [year, month, day] = festivalStartDate.split('-').map(Number);
  const startDate = new Date(year, month - 1, day, 0, 0, 0, 0); // 한국 시간 00:00:00

  // 현재 한국 시간
  const koreaNow = getKoreaTime();

  // 시간 정보 제거 (날짜만 비교)
  const startDateOnly = new Date(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate(),
  );
  const koreaNowOnly = new Date(koreaNow.getFullYear(), koreaNow.getMonth(), koreaNow.getDate());

  // 시작일과 오늘 사이의 일수 차이 계산
  const diffTime = koreaNowOnly.getTime() - startDateOnly.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  // 페스티벌 기간인지 확인하고 일차 계산
  if (diffDays >= 0 && diffDays < totalDays) {
    return `${diffDays + 1}일차`;
  }

  // 페스티벌 기간이 아니면 첫째 날 반환
  return '1일차';
}

/**
 * 특정 날짜가 페스티벌 기간 내에 있는지 확인하는 함수
 *
 * @param festivalStartDate - 페스티벌 시작 날짜 (YYYY-MM-DD 형식)
 * @param totalDays - 페스티벌 총 일수 (기본값: 3)
 * @param targetDate - 확인할 날짜 (YYYY-MM-DD 형식, 기본값: 오늘)
 * @returns 페스티벌 기간 내에 있으면 true, 아니면 false
 */
export function isWithinFestivalPeriod(
  festivalStartDate: string,
  totalDays: number = 3,
  targetDate?: string,
): boolean {
  const [year, month, day] = festivalStartDate.split('-').map(Number);
  const startDate = new Date(year, month - 1, day, 0, 0, 0, 0);

  let checkDate: Date;
  if (targetDate) {
    const [tYear, tMonth, tDay] = targetDate.split('-').map(Number);
    checkDate = new Date(tYear, tMonth - 1, tDay, 0, 0, 0, 0);
  } else {
    checkDate = getKoreaTime();
  }

  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + totalDays - 1);

  return checkDate >= startDate && checkDate <= endDate;
}

/**
 * 한국 시간 기준으로 현재 시간을 YYYY-MM-DD HH:MM:SS 형식으로 반환
 */
export function getKoreaTimeString(): string {
  const koreaTime = getKoreaTime();
  const year = koreaTime.getFullYear();
  const month = String(koreaTime.getMonth() + 1).padStart(2, '0');
  const day = String(koreaTime.getDate()).padStart(2, '0');
  const hours = String(koreaTime.getHours()).padStart(2, '0');
  const minutes = String(koreaTime.getMinutes()).padStart(2, '0');
  const seconds = String(koreaTime.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

/**
 * 한국 시간 기준으로 현재 날짜를 YYYY-MM-DD 형식으로 반환
 */
export function getKoreaDateString(): string {
  const koreaTime = getKoreaTime();
  const year = koreaTime.getFullYear();
  const month = String(koreaTime.getMonth() + 1).padStart(2, '0');
  const day = String(koreaTime.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

/**
 * 특정 일차의 시작 시간과 끝 시간을 반환하는 함수
 *
 * @param festivalStartDate - 페스티벌 시작 날짜 (YYYY-MM-DD 형식)
 * @param dayNumber - 일차 번호 (1, 2, 3)
 * @returns 해당 일차의 시작 시간과 끝 시간 객체
 */
export function getFestivalDayTimeRange(
  festivalStartDate: string,
  dayNumber: number,
): {
  startTime: Date;
  endTime: Date;
} {
  const [year, month, day] = festivalStartDate.split('-').map(Number);
  const startDate = new Date(year, month - 1, day, 0, 0, 0, 0);

  const dayStartTime = new Date(startDate);
  dayStartTime.setDate(startDate.getDate() + dayNumber - 1);

  const dayEndTime = new Date(dayStartTime);
  dayEndTime.setHours(23, 59, 59, 999);

  return {
    startTime: dayStartTime,
    endTime: dayEndTime,
  };
}

/**
 * 현재 시간이 특정 일차의 시간 범위 내에 있는지 확인하는 함수
 *
 * @param festivalStartDate - 페스티벌 시작 날짜 (YYYY-MM-DD 형식)
 * @param dayNumber - 일차 번호 (1, 2, 3)
 * @returns 현재 시간이 해당 일차 범위 내에 있으면 true, 아니면 false
 */
export function isCurrentTimeInDayRange(festivalStartDate: string, dayNumber: number): boolean {
  const koreaNow = getKoreaTime();
  const { startTime, endTime } = getFestivalDayTimeRange(festivalStartDate, dayNumber);

  return koreaNow >= startTime && koreaNow <= endTime;
}
