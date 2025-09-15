import { create } from 'zustand';
import { markerService, ApiMarkerItem } from '@/services/markerService';

interface MarkerState {
  markers: ApiMarkerItem[];
  loading: boolean;
  error: string | null;
  isInitialized: boolean;
}

interface MarkerActions {
  fetchMarkers: () => Promise<void>;
  getMarkersByCategory: (category: string) => ApiMarkerItem[];
  getMarkersExcludingCategory: (excludeCategory: string) => ApiMarkerItem[];
  clearError: () => void;
}

export const useMarkerStore = create<MarkerState & MarkerActions>((set, get) => ({
  // State
  markers: [],
  loading: false,
  error: null,
  isInitialized: false,

  // Actions
  fetchMarkers: async () => {
    const { isInitialized } = get();

    // 이미 초기화되었으면 다시 호출하지 않음
    if (isInitialized) return;

    set({ loading: true, error: null });

    try {
      const response = await markerService.getMarkers();

      if (response.status === 'success') {
        set({
          markers: response.data,
          loading: false,
          error: null,
          isInitialized: true,
        });
      } else {
        throw new Error(response.message || '마커 데이터를 가져오는데 실패했습니다.');
      }
    } catch {
      set({
        loading: false,
        error: '마커 정보를 불러오는데 실패했습니다.',
        isInitialized: false,
      });
    }
  },

  getMarkersByCategory: (category: string) => {
    const { markers } = get();
    return markers.filter((marker) => marker.category === category);
  },

  getMarkersExcludingCategory: (excludeCategory: string) => {
    const { markers } = get();
    return markers.filter((marker) => marker.category !== excludeCategory);
  },

  clearError: () => {
    set({ error: null });
  },
}));
