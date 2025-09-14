import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { NavBar } from '@/components/nav-bar';
import * as S from './NoticeDetail.styles';
import { useEffect, useState } from 'react';
import { useLayoutStore } from '@/stores/useLayoutStore';
import { NoticeDetailCarousels, NoticeBody } from '@/features/main/components/notice/index';
import { fetchNoticeDetail } from '@/services/noticeService';

// API 응답 데이터를 UI에 맞게 변환
interface UINotice {
  id: number;
  title: string;
  body: string;
  img: string[];
  tags: { text: string; color: string }[];
}

/**
 * 공지사항 상세 페이지 - 인스타그램 스타일 캐러셀
 * @returns {JSX.Element}
 */
export default function NoticeDetail() {
  const { id } = useParams<{ id: string }>();
  const [notice, setNotice] = useState<UINotice | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const setIsNav = useLayoutStore((state) => state.setIsNav);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setIsNav(false);
    return () => {
      setIsNav(true);
    };
  }, [setIsNav]);

  useEffect(() => {
    const getNoticeDetail = async () => {
      if (!id) return;

      try {
        const apiNotice = await fetchNoticeDetail(Number(id));

        // API 응답을 UI 형식으로 변환
        const uiNotice: UINotice = {
          id: apiNotice.id,
          title: apiNotice.title,
          body: apiNotice.content,
          img: apiNotice.images, // images 배열을 그대로 사용
          tags: [{ text: apiNotice.tag, color: '#7e419a' }], // 기본 색상 값 지정
        };

        setNotice(uiNotice);
        setLoading(false);
      } catch (err) {
        console.error(`공지사항 ${id}번을 불러오는데 실패했습니다:`, err);
        setError('공지사항을 불러오는데 실패했습니다.');
        setLoading(false);
      }
    };

    getNoticeDetail();
  }, [id]);

  if (loading) {
    return (
      <>
        <NavBar title="공지사항" isBack={true} />
        <S.Container>
          <S.LoadingText>공지사항을 불러오는 중...</S.LoadingText>
        </S.Container>
      </>
    );
  }

  if (error || !notice) {
    /*
    return (
      <>
        <NavBar title="공지사항" isBack={true} />
        <S.Container>
          <S.ErrorText>{error || '해당 공지사항을 찾을 수 없습니다.'}</S.ErrorText>
        </S.Container>
      </>
    );
    */

    // 에러 페이지로 네비게이션
    navigate('/error', {
      state: {
        mainText: '앗! 뭔가 잘못됐네요.',
        subText: '멋사가 금방 고쳐올테니, 잠시 후에 다시 와주세요!',
        showBackButton: true,
        showHomeButton: true,
      },
    });
  }

  const handleBackClick = () => {
    const from = location.state?.from;
    const fromType = location.state?.fromType;
    const category = location.state?.category;

    if (from === '/map' || fromType === 'map') {
      if (category) {
        navigate(`/map?category=${encodeURIComponent(category)}`);
      } else {
        navigate('/map');
      }
    } else {
      navigate('/main/notice');
    }
  };

  if (!notice) return null;
  return (
    <>
      <NavBar title="공지사항" isBack={true} onBackClick={handleBackClick} />
      <S.Container>
        <NoticeDetailCarousels img={notice.img} />
        <NoticeBody title={notice.title} tags={notice.tags} body={notice.body} />
      </S.Container>
    </>
  );
}
