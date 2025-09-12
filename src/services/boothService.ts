import axiosInstance from '@/lib/AxiosInstance';
import type {
  Booth,
  PubListResponse,
  PubDetailResponse,
  PubApiResponse,
  MenuListResponse,
  MenuApiResponse,
} from '@/types/booth.types';

const transformMenusToBoothMenu = (menus: MenuApiResponse[]) => {
  const main = menus
    .filter((m) => m.category === 'main')
    .map((m) => ({
      name: m.name,
      describtion: m.description,
      price: `${m.price.toLocaleString()} 원`,
    }));

  const side = menus
    .filter((m) => m.category === 'side')
    .map((m) => ({
      name: m.name,
      describtion: m.description,
      price: `${m.price.toLocaleString()} 원`,
    }));

  const set = menus
    .filter((m) => m.category === 'set')
    .map((m) => ({
      name: m.name,
      describtion: m.description,
      price: `${m.price.toLocaleString()} 원`,
    }));

  const others = menus
    .filter((m) => m.category === 'others')
    .map((m) => ({
      name: m.name,
      describtion: m.description,
      price: `${m.price.toLocaleString()} 원`,
    }));

  return { main, side, set, others };
};

const transformPubToBootn = async (pub: PubApiResponse): Promise<Booth> => {
  const menuResponse = await axiosInstance.get<MenuListResponse>(`/api/pubs/${pub.id}/menus`);
  const menu = transformMenusToBoothMenu(menuResponse.data.data);

  return {
    id: pub.id,
    locate: pub.location,
    latitude: pub.latitude,
    longitude: pub.longitude,
    affiliation: pub.affiliation,
    pubName: pub.name,
    takeout: pub.takeout,
    profileImage: pub.profileImage,
    posterImage: pub.posterImage,
    menu,
  } as Booth;
};

// 메뉴 없이 기본 정보만 변환
const transformPubToBoothBasic = (pub: PubApiResponse): Booth => {
  return {
    id: pub.id,
    locate: pub.location,
    latitude: pub.latitude,
    longitude: pub.longitude,
    affiliation: pub.affiliation,
    pubName: pub.name,
    takeout: pub.takeout,
    profileImage: pub.profileImage,
    posterImage: pub.posterImage,
    menu: { main: [], side: [], set: [], others: [] },
  };
};

export const boothService = {
  async getAllBooths(): Promise<Booth[]> {
    const response = await axiosInstance.get<PubListResponse>('/api/pubs');
    const booths = response.data.data.map(transformPubToBoothBasic);
    return booths;
  },

  async getBoothById(id: number): Promise<Booth> {
    const response = await axiosInstance.get<PubDetailResponse>(`/api/pubs/${id}`);
    return await transformPubToBootn(response.data.data);
  },

  // 기본 정보만 가져오기 (메뉴 제외)
  async getBoothBasicInfo(id: number): Promise<Omit<Booth, 'menu'>> {
    const response = await axiosInstance.get<PubDetailResponse>(`/api/pubs/${id}`);
    const pub = response.data.data;

    return {
      id: pub.id,
      locate: pub.location,
      latitude: pub.latitude,
      longitude: pub.longitude,
      affiliation: pub.affiliation,
      pubName: pub.name,
      takeout: pub.takeout,
      profileImage: pub.profileImage,
      posterImage: pub.posterImage,
    };
  },

  // 메뉴만 가져오기
  async getBoothMenus(id: number) {
    const response = await axiosInstance.get<MenuListResponse>(`/api/pubs/${id}/menus`);
    return transformMenusToBoothMenu(response.data.data);
  },
};
