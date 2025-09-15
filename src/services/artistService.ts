import axiosInstance from '@/lib/AxiosInstance';
import {
  ArtistApiResponse,
  PerformanceApiResponse,
  PerformanceWithArtist,
  Artist,
} from '@/types/artist.type';

export const artistService = {
  // 특정 아티스트 정보 가져오기
  async getArtist(id: number): Promise<ArtistApiResponse> {
    const response = await axiosInstance.get(`/api/artists/${id}`);
    return response.data;
  },

  // 모든 공연 정보 가져오기
  async getPerformances(): Promise<PerformanceApiResponse> {
    const response = await axiosInstance.get('/api/performances');
    return response.data;
  },

  // 공연 정보와 아티스트 정보를 합쳐서 가져오기
  async getPerformancesWithArtists(): Promise<PerformanceWithArtist[]> {
    const [performancesResponse, artistsMap] = await Promise.all([
      this.getPerformances(),
      this.getAllArtistsMap(),
    ]);

    const performancesWithArtists: PerformanceWithArtist[] = [];

    for (const performance of performancesResponse.data) {
      const artist = artistsMap.get(performance.artistId);
      if (artist) {
        performancesWithArtists.push({
          ...performance,
          artist,
        });
      }
    }

    return performancesWithArtists;
  },

  // 모든 아티스트 정보를 Map으로 가져오기 (성능 최적화)
  async getAllArtistsMap(): Promise<Map<number, Artist>> {
    const performancesResponse = await this.getPerformances();
    const uniqueArtistIds = [...new Set(performancesResponse.data.map((p) => p.artistId))];

    const artistsMap = new Map<number, Artist>();

    // 모든 아티스트 정보를 병렬로 가져오기
    const artistPromises = uniqueArtistIds.map((id) => this.getArtist(id));
    const artistResponses = await Promise.all(artistPromises);

    artistResponses.forEach((response) => {
      artistsMap.set(response.data.id, response.data);
    });

    return artistsMap;
  },

  // 시간 포맷팅 함수 (startTime, endTime을 "HH:MM~HH:MM" 형태로 변환)
  formatTimeRange(startTime: string, endTime: string): string {
    const start = new Date(startTime);
    const end = new Date(endTime);

    const startHours = start.getHours().toString().padStart(2, '0');
    const startMinutes = start.getMinutes().toString().padStart(2, '0');
    const endHours = end.getHours().toString().padStart(2, '0');
    const endMinutes = end.getMinutes().toString().padStart(2, '0');

    return `${startHours}:${startMinutes}~${endHours}:${endMinutes}`;
  },
};
