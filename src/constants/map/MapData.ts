import { ImageTextFrameWithTimeProps } from '@/components/image-text-frame/ImageTextFrame.types';
import { CATEGORIES, DAYS } from '@/constants/map';

// 주점
import AI from '@/assets/images/booth/ai.webp';
import TRAFFIC from '@/assets/images/booth/traffic.webp';
import BIO from '@/assets/images/booth/bio.webp';
import CHEMICAL from '@/assets/images/booth/chemical.webp';
import COMPUTER from '@/assets/images/booth/computer.webp';
import CONVERGENCE from '@/assets/images/booth/convergence.webp';
import DESIGN from '@/assets/images/booth/design.webp';
import ELECTRON from '@/assets/images/booth/electron.webp';
import ENERGY from '@/assets/images/booth/energy.webp';
import MEDIA from '@/assets/images/booth/media.webp';
import MACHINE from '@/assets/images/booth/machine.webp';
import HORIZON from '@/assets/images/booth/horizontal.webp';
import PARMACY from '@/assets/images/booth/pharmacy.webp';
import STATEGY from '@/assets/images/booth/strategy.webp';
import ROBOT from '@/assets/images/booth/robot.webp';
import INTELLIGENCE from '@/assets/images/booth/intelligence.webp';
import ARCHITECTURE from '@/assets/images/booth/architecture.webp';
import MARINE from '@/assets/images/booth/marine.webp';
import SMART from '@/assets/images/booth/smart.webp';
import OCC from '@/assets/images/booth/occ.webp';
import INDUSTRIAL from '@/assets/images/booth/industrial.webp';
import SPORT from '@/assets/images/booth/sport.webp';
import MAHA from '@/assets/images/booth/maha.webp';
import INSURANCE from '@/assets/images/booth/insurance.webp';
import SEMI from '@/assets/images/booth/semiconductor.webp';
import ARCHITECTURE_ENV from '@/assets/images/booth/architecture-env.webp';

// 이외 이미지들
import LIQUOR_STORE from '@/assets/images/map/liquorstore.webp';
import FLEA_MARKET from '@/assets/images/map/fleamarket.webp';
import PROMOTION from '@/assets/images/map/promotion.webp';
import RACE from '@/assets/images/map/race.webp';
import PICNIC from '@/assets/images/map/picnic.webp';
import VIKING from '@/assets/images/map/viking.webp';
import PERFORMANCE from '@/assets/images/map/performance.webp';
import TOILET from '@/assets/images/map/toilet.webp';
import BUS_STOP from '@/assets/images/map/busstop.webp';
import FOOD_TRUCK from '@/assets/images/map/foodtruck.webp';
import SMOKING from '@/assets/images/map/smoking.webp';
import CANDY from '@/assets/images/map/candy.webp';
// import CLOWN from '@/assets/images/map/clown.webp';
import HDP from '@/assets/images/map/hdp.webp';
import PHOTOZONE from '@/assets/images/map/photozone.webp';
import ONETODOUBLE from '@/assets/images/map/onetodouble.webp';
import PROTEEN from '@/assets/images/map/proteen.webp';
import STAMP from '@/assets/images/map/stamp.webp';
// import AED_IMAGE from '@/assets/images/map/aed.webp';

// 각 카테고리별 항목 타입 정의
export interface MapDataItem extends ImageTextFrameWithTimeProps {
  id?: number; // 고유 ID
  path?: string; // 경로
  lat?: number; // 위도
  lng?: number; // 경도
  closeDay?: DAYS[];
  canPickup?: boolean; // 포장가능 여부
}

// 전체 맵 데이터의 타입 정의
export type MapDataProps = Record<CATEGORIES, MapDataItem[]>;

export const MapData: MapDataProps = {
  주점: [
    {
      id: 1,
      image: AI,
      title: '나 지피틴데 안 추ㅣㅎㅆ다',
      subtitle: '주점',
      time: '18:00-24:00',
      path: '/booth/1',
      lat: 37.295964346289615,
      lng: 126.83478639376709,
      closeDay: [],
    },
    {
      id: 2,
      image: MEDIA,
      title: '차린건 여정도 지만',
      subtitle: '주점',
      time: '18:00-24:00',
      path: '/booth/2',
      lat: 37.295669407307464,
      lng: 126.83489418254456,
      closeDay: [],
    },
    {
      id: 3,
      image: MACHINE,
      title: '나는 술로',
      subtitle: '주점',
      time: '18:00-24:00',
      path: '/booth/3',
      lat: 37.29609767733683,
      lng: 126.83509343729206,
      closeDay: [],
    },
    {
      id: 4,
      image: ENERGY,
      title: '에바레스트 산악회',
      subtitle: '주점',
      time: '18:00-24:00',
      path: '/booth/4',
      lat: 37.29575349116576,
      lng: 126.8354240789568,
      closeDay: [],
    },
    {
      id: 5,
      image: HORIZON,
      title: '그 시절 우리가 사랑했던 수사',
      subtitle: '주점',
      time: '18:00-24:00',
      path: '/booth/5',
      lat: 37.295972285664924,
      lng: 126.83563507107027,
      closeDay: [],
    },
    {
      id: 6,
      image: PARMACY,
      title: '냥약랜드',
      subtitle: '주점',
      time: '18:00-24:00',
      path: '/booth/6',
      lat: 37.29610790226943,
      lng: 126.83596748746356,
      closeDay: [],
    },
    {
      id: 7,
      image: CHEMICAL,
      title: '백설공주와 화목한 난쟁이들',
      subtitle: '주점',
      time: '18:00-24:00',
      path: '/booth/7',
      lat: 37.29594686026178,
      lng: 126.83516989524996,
      closeDay: [],
    },
    {
      id: 8,
      image: COMPUTER,
      title: '전 어때요',
      subtitle: '주점',
      time: '18:00-24:00',
      path: '/booth/8',
      lat: 37.29617318030623,
      lng: 126.83593351062571,
      closeDay: [],
    },
    {
      id: 9,
      image: TRAFFIC,
      title: 'Kㅛ통에Bㅏㅂ과 술 Oㅣㅆ어요',
      subtitle: '주점',
      time: '18:00-24:00',
      path: '/booth/9',
      lat: 37.29587712438012,
      lng: 126.83523771733019,
      closeDay: [],
    },
    {
      id: 10,
      image: STATEGY,
      title: '마구먹고 마구마셔',
      subtitle: '주점',
      time: '18:00-24:00',
      path: '/booth/10',
      lat: 37.29600473137553,
      lng: 126.83467070246739,
      closeDay: [],
    },
    {
      id: 11,
      image: ROBOT,
      title: '(주) 로봇산업',
      subtitle: '주점',
      time: '18:00-24:00',
      path: '/booth/11',
      lat: 37.29610731536709,
      lng: 126.83554455043733,
      closeDay: [],
    },
    {
      id: 12,
      image: CONVERGENCE,
      title: '시선',
      subtitle: '주점',
      time: '18:00-24:00',
      path: '/booth/12',
      lat: 37.29563140425041,
      lng: 126.83510291384758,
      closeDay: [],
    },
    {
      id: 13,
      image: INTELLIGENCE,
      title: '냥자역학:주량측정불가',
      subtitle: '주점',
      time: '18:00-24:00',
      path: '/booth/13',
      lat: 37.29581860036857,
      lng: 126.83526886032932,
      closeDay: [],
    },
    {
      id: 14,
      image: ARCHITECTURE_ENV,
      title: '13주차 술체역학',
      subtitle: '주점',
      time: '18:00-24:00',
      path: '/booth/14',
      lat: 37.29587420751056,
      lng: 126.83476121468183,
      closeDay: [],
    },
    {
      id: 15,
      image: INSURANCE,
      title: '냉3 4먹으러 5것지',
      subtitle: '주점',
      time: '18:00-24:00',
      path: '/booth/15',
      lat: 37.29594108206853,
      lng: 126.83587480347197,
      closeDay: [],
    },
    {
      id: 16,
      image: MAHA,
      title: '그시절 캔마하(CANMAHA)',
      subtitle: '주점',
      time: '18:00-24:00',
      path: '/booth/16',
      lat: 37.29572565109832,
      lng: 126.83484330728106,
      closeDay: [],
    },
    {
      id: 17,
      image: ELECTRON,
      title: '폭싹 취EE했수다',
      subtitle: '주점',
      time: '18:00-24:00',
      path: '/booth/17',
      lat: 37.296037547941225,
      lng: 126.83558981569682,
      closeDay: [],
    },
    {
      id: 18,
      image: MARINE,
      title: '폭주어선',
      subtitle: '주점',
      time: '18:00-24:00',
      path: '/booth/18',
      lat: 37.2959078111853,
      lng: 126.83462862086351,
      closeDay: [],
    },
    {
      id: 19,
      image: OCC,
      title: '닭치고 한 잔',
      subtitle: '주점',
      time: '18:00-24:00',
      path: '/booth/19',
      lat: 37.29550032974128,
      lng: 126.83479868682915,
      closeDay: [],
    },
    {
      id: 20,
      image: BIO,
      title: '모여봐요 술꾼의 숲',
      subtitle: '주점',
      time: '18:00-24:00',
      path: '/booth/20',
      lat: 37.29617483410954,
      lng: 126.83550210958191,
      closeDay: [],
    },
    {
      id: 21,
      image: SMART,
      title: "이랏'스융'마세",
      subtitle: '주점',
      time: '18:00-24:00',
      path: '/booth/21',
      lat: 37.29603016659557,
      lng: 126.83514151762297,
      closeDay: [],
    },
    {
      id: 22,
      image: ARCHITECTURE,
      title: '홍문으로들었소',
      subtitle: '주점',
      time: '18:00-24:00',
      path: '/booth/22',
      lat: 37.29615842637652,
      lng: 126.83504255204929,
      closeDay: [],
    },
    {
      id: 23,
      image: DESIGN,
      title: '디대는 못말려! - 오늘도 과제는 ...',
      subtitle: '주점',
      time: '18:00-24:00',
      path: '/booth/23',
      lat: 37.2963082180539,
      lng: 126.83584862945862,
      closeDay: [],
    },
    {
      id: 24,
      image: INDUSTRIAL,
      title: '응답하라 일구구산',
      subtitle: '주점',
      time: '18:00-24:00',
      path: '/booth/24',
      lat: 37.296242928313944,
      lng: 126.83587414767518,
      closeDay: [],
    },
    {
      id: 25,
      image: SPORT,
      title: '뭉쳐야 예체대',
      subtitle: '주점',
      time: '18:00-24:00',
      path: '/booth/25',
      lat: 37.2958021681218,
      lng: 126.83479238760576,
      closeDay: [],
    },
    {
      id: 26,
      image: SEMI,
      title: 'semi azit',
      subtitle: '주점',
      time: '18:00-24:00',
      path: '/booth/26',
      lat: 37.29583032980009,
      lng: 126.83560436457206,
      closeDay: [],
    },
  ],
  '주류 구매 위치': [
    {
      id: 200,
      image: LIQUOR_STORE,
      title: '마셔라잇(Light)',
      subtitle: '주류 구매 위치',
      time: '18:00-23:30',
      lat: 37.295611,
      lng: 126.835208,
      closeDay: [],
      path: '/main/notice/15',
    },
  ],
  플리마켓: [
    {
      id: 300,
      image: FLEA_MARKET,
      title: '플리마켓',
      subtitle: '',
      time: '11:00-17:00',
      lat: 37.298046,
      lng: 126.834813,
      path: '/main/notice/10',
    },
  ],
  프로모션: [
    {
      id: 400,
      image: PROMOTION,
      title: '프로모션',
      subtitle: '',
      time: '11:00-17:00',
      lat: 37.297077,
      lng: 126.835742,
      closeDay: [],
    },
  ],
  콘텐츠: [
    {
      id: 501,
      image: RACE,
      title: '호공 레이스',
      subtitle: '콘텐츠',
      time: '13:00-15:00',
      closeDay: ['1일차', '3일차'],
      lat: 37.297562,
      lng: 126.833907,
    },
    {
      id: 502,
      image: PICNIC,
      title: '피크닉존',
      subtitle: '콘텐츠',
      time: '11:00-18:00',
      closeDay: [],
      lat: 37.29665075767112,
      lng: 126.83433657473492,
    },
    {
      id: 503,
      image: VIKING,
      title: '바이킹',
      subtitle: '콘텐츠',
      time: '19:00-22:00',
      closeDay: ['1일차', '2일차'],
      lat: 37.29812216872291,
      lng: 126.83629301416545,
    },
    {
      id: 504,
      image: CANDY,
      title: '사탕처럼 달콤하다는데?',
      subtitle: '콘텐츠',
      time: '11:00-17:00',
      closeDay: [],
      lat: 37.29724736447557,
      lng: 126.83410123695744,
    },
    // {
    //   id: 505,
    //   image: CLOWN,
    //   title: '삐에로 아저씨',
    //   subtitle: '콘텐츠',
    //   time: '13:00-17:00',
    //   closeDay: [],
    //   lat: 126.83447501648986,
    //   lng: 126.83463357460069,
    // },
    {
      id: 506,
      image: HDP,
      title: '한 대 빵!!',
      subtitle: '콘텐츠',
      time: '11:00-17:00',
      closeDay: [],
      lat: 37.295566831523274,
      lng: 126.83727412255227,
    },
    {
      id: 507,
      image: PHOTOZONE,
      title: '포토존',
      subtitle: '콘텐츠',
      time: '11:00-17:00',
      closeDay: ['1일차', '3일차'],
      lat: 37.29698419132466,
      lng: 126.8343724985793,
    },
    {
      id: 508,
      image: ONETODOUBLE,
      title: '한 대 맞고 더블로 가!',
      subtitle: '콘텐츠',
      time: '11:00-17:00',
      closeDay: [],
      lat: 37.29670205742794,
      lng: 126.83397273243898,
    },
    {
      id: 509,
      image: PROTEEN,
      title: 'PRO:TEEN 스탬프랠리 이벤트',
      subtitle: '콘텐츠',
      time: '11:00-17:00',
      closeDay: [],
      lat: 37.29718649484104,
      lng: 126.83568036283293,
    },
    {
      id: 510,
      image: STAMP,
      title: '스탬프랠리',
      subtitle: '콘텐츠',
      time: '11:00-21:00',
      closeDay: [],
      lat: 37.29686240448319,
      lng: 126.83588408022645,
    },
    // {
    //   id: 511,
    //   image: PHOTOZONE,
    //   title: '청춘기록',
    // subtitle: '콘텐츠',

    // }
  ],
  공연장: [
    {
      id: 600,
      image: PERFORMANCE,
      title: '공연 무대',
      subtitle: '공연장',
      time: '19:00-22:00',
      lat: 37.294711,
      lng: 126.833163,
      closeDay: [],
    },
  ],
  화장실: [
    {
      id: 701,
      image: TOILET,
      title: '공용 화장실',
      subtitle: '화장실',
      time: '11:00~17:00',
      lat: 37.295360594745084,
      lng: 126.83474542074782,
      closeDay: [],
    },
    {
      id: 702,
      image: TOILET,
      title: '공용 화장실',
      subtitle: '화장실',
      time: '11:00~17:00',
      lat: 37.296472421919674,
      lng: 126.83567909650789,
      closeDay: [],
    },
    {
      id: 703,
      image: TOILET,
      title: '공용 화장실',
      subtitle: '화장실',
      time: '11:00~17:00',
      lat: 37.29589594299737,
      lng: 126.83259572915954,
      closeDay: [],
    },
  ],
  셔틀콕: [
    {
      id: 800,
      image: BUS_STOP,
      title: '버스 탑승 위치',
      subtitle: '',
      time: '7:50-23:00',
      lat: 37.298714,
      lng: 126.837946,
      closeDay: [],
    },
  ],
  푸드트럭: [
    {
      id: 900,
      image: FOOD_TRUCK,
      title: '푸드트럭',
      subtitle: '',
      time: '10:00-23:00',
      lat: 37.296454,
      lng: 126.833895,
      closeDay: [],
      path: '/main/notice/10.5',
    },
  ],
  흡연구역: [
    {
      id: 1101,
      image: SMOKING,
      title: '흡연구역',
      subtitle: '',
      time: '24시간',
      lat: 37.295385491240424,
      lng: 126.83482995313732,
      closeDay: [],
    },
    {
      id: 1102,
      image: SMOKING,
      title: '흡연구역',
      subtitle: '',
      time: '24시간',
      lat: 37.29649727861849,
      lng: 126.83573543450318,
      closeDay: [],
    },
    {
      id: 1103,
      image: SMOKING,
      title: '흡연구역',
      subtitle: '',
      time: '24시간',
      lat: 37.2959656853379,
      lng: 126.83253354377807,
      closeDay: [],
    },
  ],
  AED: [
    {
      id: 100,
      image: HDP, // 임시로 HDP 이미지 사용
      title: 'AED 1',
      subtitle: '응급처치',
      time: '24시간',
      lat: 37.295669407307464,
      lng: 126.83489418254456,
      closeDay: [],
    },
    {
      id: 101,
      image: HDP, // 임시로 HDP 이미지 사용
      title: 'AED 2',
      subtitle: '응급처치',
      time: '24시간',
      lat: 37.296037547941225,
      lng: 126.83558981569682,
      closeDay: [],
    },
  ],
  '온열질환 대비소': [
    // API에서 받아올 데이터로 대체될 예정
  ],
};
