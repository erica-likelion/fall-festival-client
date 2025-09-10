const categories = [
  '프로모션',
  '주점',
  '푸드트럭',
  '콘텐츠',
  '화장실',
  'AED',
  '온열질환 대비소',
  '셔틀콕',
  '공연장',
  '흡연구역',
  '주류 구매 위치',
  '플리마켓',
] as const;
type CATEGORIES = (typeof categories)[number];

export { categories };
export type { CATEGORIES };
