import { Tabs } from '@/components/tabs';
import { useState } from 'react';
import * as S from './MenuList.styles';
import { MenuFrame } from '@/components/image-text-frame';
import { Booth } from '@/types/booth.types';
import PageLoadingSpinner from '@/components/loading/PageLoadingSpinner';

interface MenuListProps {
  booth: Booth;
  menuLoading: boolean;
}

export default function MenuList({ booth, menuLoading }: MenuListProps) {
  const [activeTab, setActiveTab] = useState<string>('');

  // 데이터가 있는 카테고리만 표시
  const availableCategories = ['메인 메뉴'];
  if (booth.menu.side.length > 0) {
    availableCategories.push('사이드 메뉴');
  }
  if (booth.menu.set.length > 0) {
    availableCategories.push('세트 메뉴');
  }
  if (booth.menu.others.length > 0) {
    availableCategories.push('기타');
  }

  return (
    <>
      <S.TabsContainer>
        <Tabs
          tabs={availableCategories}
          activeTab={activeTab}
          onTabClick={setActiveTab}
          toggle={true}
        />
      </S.TabsContainer>

      {(activeTab === '' || activeTab === '메인 메뉴') && (
        <S.MenuFrame>
          <S.MenuItem>메인 메뉴</S.MenuItem>
          <S.MenuList>
            {menuLoading ? (
              <S.MenuLoadingContainer>
                <PageLoadingSpinner />
              </S.MenuLoadingContainer>
            ) : (
              booth.menu.main.map((menu, index) => (
                <MenuFrame
                  key={`main-${index}-${menu.name}`}
                  menu={menu.name}
                  price={menu.price}
                  description={menu.describtion}
                  width="100%"
                />
              ))
            )}
          </S.MenuList>
        </S.MenuFrame>
      )}

      {activeTab === '' && booth.menu.side.length > 0 && <S.HorizontalLine />}

      {(activeTab === '' || activeTab === '사이드 메뉴') && booth.menu.side.length > 0 && (
        <S.MenuFrame>
          <S.MenuItem>사이드 메뉴</S.MenuItem>
          <S.MenuList>
            {booth.menu.side.map((menu, index) => (
              <MenuFrame
                key={`side-${index}-${menu.name}`}
                menu={menu.name}
                price={menu.price}
                description={menu.describtion}
                width="100%"
              />
            ))}
          </S.MenuList>
        </S.MenuFrame>
      )}

      {activeTab === '' && booth.menu.set.length > 0 && <S.HorizontalLine />}

      {(activeTab === '' || activeTab === '세트 메뉴') && booth.menu.set.length > 0 && (
        <S.MenuFrame>
          <S.MenuItem>세트 메뉴</S.MenuItem>
          <S.MenuList>
            {booth.menu.set.map((menu, index) => (
              <MenuFrame
                key={`set-${index}-${menu.name}`}
                menu={menu.name}
                price={menu.price}
                description={menu.describtion}
                width="100%"
              />
            ))}
          </S.MenuList>
        </S.MenuFrame>
      )}

      {activeTab === '' && booth.menu.others.length > 0 && <S.HorizontalLine />}

      {(activeTab === '' || activeTab === '기타') && booth.menu.others.length > 0 && (
        <S.MenuFrame>
          <S.MenuItem>기타</S.MenuItem>
          <S.MenuList>
            {booth.menu.others.map((menu, index) => (
              <MenuFrame
                key={`others-${index}-${menu.name}`}
                menu={menu.name}
                price={menu.price}
                description={menu.describtion}
                width="100%"
              />
            ))}
          </S.MenuList>
        </S.MenuFrame>
      )}
    </>
  );
}
