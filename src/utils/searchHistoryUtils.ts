import { SearchHistoryItem } from '@/types/search-history.types';

/**
 * 최근 검색어 관리를 위한 유틸리티 함수 모음
 */

/**
 * 저장된 검색 기록을 로컬스토리지에서 불러옵니다
 * @param storageKey 로컬스토리지 키 이름
 * @returns 저장된 검색 기록 배열 또는 빈 배열
 */
export const loadSearchHistory = (storageKey: string): SearchHistoryItem[] => {
  try {
    const savedHistory = localStorage.getItem(storageKey);
    return savedHistory ? JSON.parse(savedHistory) : [];
  } catch {
    localStorage.removeItem(storageKey);
    return [];
  }
};

/**
 * 새 검색어를 검색 기록에 추가합니다
 * @param keyword 추가할 검색어
 * @param currentHistory 현재 검색 기록 배열
 * @param storageKey 로컬스토리지 키 이름
 * @param maxItems 최대 저장 개수
 * @returns 업데이트된 검색 기록 배열
 */
export const addSearchHistory = (
  keyword: string,
  currentHistory: SearchHistoryItem[],
  storageKey: string,
  maxItems: number,
): SearchHistoryItem[] => {
  // 빈 검색어는 무시
  if (!keyword.trim()) return currentHistory;

  // 새 검색 기록 항목 생성
  const newHistoryItem: SearchHistoryItem = {
    id: Date.now().toString(),
    keyword: keyword.trim(),
    timeStamp: Date.now(),
  };

  // 중복 검색어 제거 및 최근 검색어를 맨 앞으로 배치
  const filteredHistory = currentHistory.filter((item) => item.keyword !== newHistoryItem.keyword);

  // 최대 개수 제한 적용
  const newHistory = [newHistoryItem, ...filteredHistory].slice(0, maxItems);

  // 로컬 스토리지에 저장
  localStorage.setItem(storageKey, JSON.stringify(newHistory));

  return newHistory;
};

/**
 * 특정 검색어를 검색 기록에서 제거합니다
 * @param keyword 제거할 검색어
 * @param currentHistory 현재 검색 기록 배열
 * @param storageKey 로컬스토리지 키 이름
 * @returns 업데이트된 검색 기록 배열
 */
export const removeSearchHistory = (
  keyword: string,
  currentHistory: SearchHistoryItem[],
  storageKey: string,
): SearchHistoryItem[] => {
  const updatedHistory = currentHistory.filter((item) => item.keyword !== keyword);
  localStorage.setItem(storageKey, JSON.stringify(updatedHistory));
  return updatedHistory;
};

/**
 * 모든 검색 기록을 삭제합니다
 * @param storageKey 로컬스토리지 키 이름
 * @returns 빈 배열
 */
export const clearSearchHistory = (storageKey: string): SearchHistoryItem[] => {
  localStorage.removeItem(storageKey);
  return [];
};
