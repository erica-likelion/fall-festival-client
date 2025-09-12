import { useState, useEffect } from 'react';
import { boothService } from '@/services/boothService';
import type { Booth } from '@/types/booth.types';

// 메모리 캐시
const boothCache = new Map<number, Booth>();
let allBoothsCache: Booth[] | null = null;

export const useBooths = () => {
  const [booths, setBooths] = useState<Booth[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooths = async () => {
      try {
        setLoading(true);
        setError(null);

        // 캐시에서 먼저 확인
        if (allBoothsCache) {
          setBooths(allBoothsCache);
          setLoading(false);
          return;
        }

        const data = await boothService.getAllBooths();
        setBooths(data);
        allBoothsCache = data; // 캐시에 저장
      } catch (err) {
        setError('주점 정보를 불러오는데 실패했습니다.');
        console.error('Error fetching booths:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooths();
  }, []);

  const refetch = async () => {
    const fetchBooths = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await boothService.getAllBooths();
        setBooths(data);
        allBoothsCache = data; // 캐시도 업데이트
      } catch (err) {
        setError('주점 정보를 불러오는데 실패했습니다.');
        console.error('Error fetching booths:', err);
      } finally {
        setLoading(false);
      }
    };

    await fetchBooths();
  };

  return { booths, loading, error, refetch };
};

export const useBooth = (id: number) => {
  const [booth, setBooth] = useState<Booth | null>(null);
  const [loading, setLoading] = useState(true);
  const [menuLoading, setMenuLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooth = async () => {
      try {
        setLoading(true);
        setError(null);

        // 캐시에서 먼저 확인
        if (boothCache.has(id)) {
          setBooth(boothCache.get(id)!);
          setLoading(false);
          return;
        }

        // 1단계: 기본 정보 먼저 로딩
        const basicInfo = await boothService.getBoothBasicInfo(id);
        setBooth({ ...basicInfo, menu: { main: [], side: [], set: [], others: [] } });
        setLoading(false);

        // 2단계: 메뉴 비동기 로딩
        setMenuLoading(true);
        const menu = await boothService.getBoothMenus(id);
        const fullBooth = { ...basicInfo, menu };

        setBooth(fullBooth);
        boothCache.set(id, fullBooth); // 전체 데이터 캐시에 저장
        setMenuLoading(false);
      } catch (err) {
        setError('주점 정보를 불러오는데 실패했습니다.');
        console.error(`Error fetching booth ${id}:`, err);
        setLoading(false);
        setMenuLoading(false);
      }
    };

    fetchBooth();
  }, [id]);

  return { booth, loading, menuLoading, error };
};
