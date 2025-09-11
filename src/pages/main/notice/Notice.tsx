import { NavBar } from '@/components/nav-bar';
import * as S from './Notice.styles';
import { useLayoutStore } from '@/stores/useLayoutStore';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NoticeBox from '@/features/main/components/notice/NoticeBox';
import { fetchNotices, NoticeItem } from '@/services/noticeService';
import { Tabs } from '@/components/tabs';

interface Notice {
  id: number;
  title: string;
  body: string;
  img: string[];
  tag: string;
}

const mapApiNoticeToUi = (apiNotice: NoticeItem): Notice => {
  return {
    id: apiNotice.id,
    title: apiNotice.title,
    body: apiNotice.content,
    img: apiNotice.images,
    tag: apiNotice.tag,
  };
};

export default function Notice() {
  const navigate = useNavigate();
  const setIsNav = useLayoutStore((state) => state.setIsNav);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState('전체');

  useEffect(() => {
    setIsNav(false);
    return () => {
      setIsNav(true);
    };
  }, [setIsNav]);

  useEffect(() => {
    const getNotices = async () => {
      try {
        const apiNotices = await fetchNotices();
        const uiNotices = apiNotices.map(mapApiNoticeToUi).sort((a, b) => b.id - a.id);
        setNotices(uiNotices);
        setLoading(false);
      } catch (err) {
        console.error('공지사항을 불러오는데 실패했습니다:', err);
        setError('공지사항을 불러오는데 실패했습니다.');
        setLoading(false);
      }
    };

    getNotices();
  }, []);

  const tabItems = useMemo(() => {
    const tags = new Set(notices.map((notice) => notice.tag));
    return ['전체', ...Array.from(tags)];
  }, [notices]);

  const filteredNotices = useMemo(() => {
    if (selectedTab === '전체') {
      return notices;
    }
    return notices.filter((notice) => notice.tag === selectedTab);
  }, [notices, selectedTab]);

  const handleDetail = useCallback(
    (id: string) => {
      navigate(`/main/notice/${id}`);
    },
    [navigate],
  );

  return (
    <>
      <NavBar title="공지사항" isBack={true} />
      <S.Container>
        {loading ? (
          <S.LoadingWrapper>공지사항을 불러오는 중...</S.LoadingWrapper>
        ) : error ? (
          <S.ErrorWrapper>{error}</S.ErrorWrapper>
        ) : (
          <S.Flex>
            <S.NoticeTabsWrapper>
              <Tabs
                tabs={tabItems}
                activeTab={selectedTab}
                onTabClick={setSelectedTab}
                autoWidth={true}
              />
            </S.NoticeTabsWrapper>
            {filteredNotices.length > 0 ? (
              filteredNotices.map((notice) => (
                <NoticeBox
                  key={notice.id}
                  id={notice.id}
                  img={notice.img[0]}
                  title={notice.title}
                  body={notice.body}
                  onClick={handleDetail}
                />
              ))
            ) : (
              <S.NoNoticesWrapper>공지사항이 없습니다.</S.NoNoticesWrapper>
            )}
          </S.Flex>
        )}
      </S.Container>
    </>
  );
}
