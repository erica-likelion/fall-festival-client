import React, { useEffect, useState } from 'react';
import * as S from './MainNoticeList.styles';
import { useNavigate } from 'react-router-dom';
import { fetchMainNotices, NoticeItem } from '@/services/noticeService';

// 기존 타입과의 매핑을 위한 인터페이스
interface Notice {
  id: number;
  title: string;
  body: string;
  img: string[];
}

// API 응답 데이터를 컴포넌트에서 사용하는 형식으로 변환
const mapApiNoticeToUi = (apiNotice: NoticeItem): Notice => {
  return {
    id: apiNotice.id,
    title: apiNotice.title,
    body: apiNotice.content,
    img: apiNotice.images, // images 배열을 그대로 사용
  };
};

const MainNoticeList: React.FC<object> = () => {
  const navigate = useNavigate();
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getNotices = async () => {
      try {
        const apiNotices = await fetchMainNotices();
        // id 기준 내림차순 정렬
        const uiNotices = apiNotices.map(mapApiNoticeToUi).sort((a, b) => b.id - a.id);
        setNotices(uiNotices);
        setLoading(false);
      } catch (err) {
        console.error('공지사항을 불러오는데 실패했습니다:', err);
        setError('공지사항을 불러오는데 실패했습니다.');
        setLoading(false);

        navigate('/error', {
          state: {
            mainText: '앗! 뭔가 잘못됐네요.',
            subText: '멋사가 금방 고쳐올테니, 잠시 후에 다시 와주세요!',
            showBackButton: true,
            showHomeButton: true,
          },
        });
      }
    };

    getNotices();
  }, []);

  if (loading)
    return (
      <S.Container>
        <S.LoadingText>공지사항을 불러오는 중...</S.LoadingText>
      </S.Container>
    );
  if (error)
    return (
      <S.Container>
        <S.ErrorText>{error}</S.ErrorText>
      </S.Container>
    );

  return (
    <S.Container>
      {notices.length > 0 ? (
        notices.map((notice) => (
          <S.NoticeItem key={notice.id} onClick={() => navigate(`/main/notice/${notice.id}`)}>
            {notice.img && notice.img.length > 0 && (
              <S.ImageThumbnail src={notice.img[0]} alt={notice.title} />
            )}
            <S.TextContentWrapper>
              <S.NoticeTitle>{notice.title}</S.NoticeTitle>
              <S.NoticeContent>{notice.body}</S.NoticeContent>
            </S.TextContentWrapper>
          </S.NoticeItem>
        ))
      ) : (
        <S.NoNoticeText>공지사항이 없습니다.</S.NoNoticeText>
      )}
    </S.Container>
  );
};

export default MainNoticeList;
