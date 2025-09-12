import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './SearchPage.styles';
import { NavBar } from '@/components/nav-bar';
import { Tabs } from '@/components/tabs';
import { useLayoutStore } from '@/stores/useLayoutStore';
import { MapDataItem } from '@/features/map/bottomsheet/BottomSheet.types';
import { useDebounce } from '@/hooks/useDebounce';
import { useMarkerStore } from '@/stores/useMarkerStore';
import { useBooths } from '@/hooks/useBooth';
import SearchIcon from '@/assets/icons/search-gray.svg?react';
import CloseIcon from '@/assets/icons/close-search.svg?react';
import MapSearchIcon from '@/assets/icons/map-search.svg?react';
import MapCategoryIcon from '@/assets/icons/map-category-page.svg?react';
import MapSearchPageIcon from '@/assets/icons/map-search-page.svg?react';

interface AutocompleteItem {
  id: string;
  text: string;
  type: 'category' | 'location';
  category?: string; // 위치 검색어의 소속 카테고리
}

export default function MapSearch() {
  const setIsNav = useLayoutStore((state) => state.setIsNav);
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [, setSearchResults] = useState<MapDataItem[]>([]);
  const debouncedSearchTerm = useDebounce(searchKeyword, 300);

  // Marker store 사용
  const { markers, fetchMarkers, isInitialized } = useMarkerStore();

  // Booth API 사용
  const { booths } = useBooths();

  // API 카테고리를 내부 카테고리로 매핑
  const apiCategoryMapping: Record<string, string> = useMemo(
    () => ({
      이벤트: '프로모션',
      콘텐츠: '콘텐츠',
      화장실: '화장실',
      AED: 'AED',
      의무실: '온열질환 대비소',
      셔틀콕: '셔틀콕',
      공연장: '공연장',
      푸드트럭: '푸드트럭',
      흡연실: '흡연구역',
      '주류 구매': '주류 구매',
      플리마켓: '플리마켓',
      주점: '주점',
    }),
    [],
  );

  // 카테고리 목록 (API에서 받은 고유 카테고리들)
  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(markers.map((marker) => apiCategoryMapping[marker.category] || marker.category)),
    ];
    return uniqueCategories;
  }, [markers, apiCategoryMapping]);

  // 자동완성 생성 (useMemo로 최적화)
  const autocompleteItems = useMemo(() => {
    if (!searchKeyword.trim()) return [];

    const autocomplete: AutocompleteItem[] = [];
    const query = searchKeyword.toLowerCase().trim();

    // 카테고리 자동완성
    categories.forEach((category) => {
      if (category.toLowerCase().includes(query)) {
        autocomplete.push({
          id: `category-${category}`,
          text: category,
          type: 'category',
        });
      }
    });

    // 위치 검색어 자동완성 (API 데이터 사용) - 주점 제외
    markers.forEach((marker) => {
      const mappedCategory = apiCategoryMapping[marker.category] || marker.category;
      // 주점은 booths API에서 처리하므로 제외
      if (marker.name.toLowerCase().includes(query) && mappedCategory !== '주점') {
        autocomplete.push({
          id: `location-${marker.id}`,
          text: marker.name,
          type: 'location',
          category: mappedCategory,
        });
      }
    });

    // 주점 검색어 자동완성 (Booth API 데이터만 사용)
    booths.forEach((booth) => {
      if (booth.pubName.toLowerCase().includes(query)) {
        autocomplete.push({
          id: `booth-${booth.id}`,
          text: booth.pubName,
          type: 'location',
          category: '주점',
        });
      }
    });

    return autocomplete;
  }, [searchKeyword, categories, markers, apiCategoryMapping, booths]);

  // API 데이터 초기화
  useEffect(() => {
    if (!isInitialized) {
      fetchMarkers();
    }
  }, [fetchMarkers, isInitialized]);

  // 내비바 숨기기 및 언마운트 시 내비바 보이기
  useEffect(() => {
    setIsNav(false);
    return () => {
      setIsNav(true);
    };
  }, [setIsNav]);

  // 디바운스된 검색어로 검색 실행
  useEffect(() => {
    if (debouncedSearchTerm) {
      const results: MapDataItem[] = [];

      // API 데이터에서 검색
      markers.forEach((marker) => {
        if (marker.name.includes(debouncedSearchTerm)) {
          const mappedCategory = apiCategoryMapping[marker.category] || marker.category;
          results.push({
            id: marker.id,
            image: marker.image,
            title: marker.name,
            subtitle: mappedCategory,
            time: marker.time,
            lat: marker.latitude,
            lng: marker.longitude,
            closeDay: marker.closedDays as ('1일차' | '2일차' | '3일차')[],
            path:
              marker.linkType === 'STATIC'
                ? undefined
                : `/${marker.linkType.toLowerCase()}/${marker.linkId}`,
          });
        }
      });

      // 주점 데이터에서 검색
      booths.forEach((booth) => {
        if (booth.pubName.includes(debouncedSearchTerm)) {
          results.push({
            id: booth.id,
            image: booth.profileImage,
            title: booth.pubName,
            subtitle: '주점',
            time: '18:00-24:00',
            lat: booth.latitude,
            lng: booth.longitude,
            closeDay: [],
            path: `/booth/${booth.id}`,
            canPickup: booth.takeout,
          });
        }
      });

      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [debouncedSearchTerm, markers, apiCategoryMapping, booths]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchKeyword('');
  };

  const handleRecommendedClick = (keyword: string) => {
    setSearchKeyword(keyword);
  };

  const handleAutocompleteClick = (item: AutocompleteItem) => {
    if (item.type === 'category') {
      // 카테고리 클릭 시 MapPage로 이동하면서 카테고리 선택 상태 전달
      navigate('/map', {
        state: {
          selectedCategory: item.text,
          showBottomSheet: true,
        },
      });
    } else {
      // 위치 검색어 클릭 시 해당 아이템만 바텀시트에 표시
      if (item.id.startsWith('booth-')) {
        // 주점 클릭 시
        const itemId = item.id.replace('booth-', '');
        navigate(`/map/${itemId}`);
      } else {
        // 일반 위치 클릭 시
        const itemId = item.id.replace('location-', '');
        navigate(`/map/${itemId}`);
      }
    }
  };

  return (
    <S.SearchPageContainer>
      <NavBar isBack={true} title="지도 검색" isClose={false} backPath="/map" />
      <S.SearchSection>
        <S.SearchInputWrapper>
          <S.SearchInput
            type="text"
            placeholder="검색어를 입력해 주세요"
            value={searchKeyword}
            onChange={handleInputChange}
          />
          <S.SearchIconWrapper
            $isClickable={searchKeyword.trim() !== ''}
            onClick={searchKeyword.trim() !== '' ? handleClearSearch : undefined}
          >
            {searchKeyword.trim() !== '' ? (
              <CloseIcon width="1rem" height="1rem" />
            ) : (
              <SearchIcon width="1rem" height="1rem" />
            )}
          </S.SearchIconWrapper>
        </S.SearchInputWrapper>
      </S.SearchSection>
      {searchKeyword ? (
        autocompleteItems.length > 0 ? (
          <S.SearchResultsContainer>
            {autocompleteItems.map((item) => (
              <S.AutocompleteItem key={item.id} onClick={() => handleAutocompleteClick(item)}>
                {item.type === 'category' ? (
                  <MapCategoryIcon width="1.5rem" height="1.5rem" />
                ) : (
                  <MapSearchPageIcon width="1.5rem" height="1.5rem" />
                )}
                <S.AutocompleteText>{item.text}</S.AutocompleteText>
                {item.type === 'location' && item.category && (
                  <S.AutocompleteCategory>{item.category}</S.AutocompleteCategory>
                )}
              </S.AutocompleteItem>
            ))}
          </S.SearchResultsContainer>
        ) : (
          <S.NoResultsState>
            <MapSearchIcon width="2.25rem" height="2.25rem" />
            <S.NoResultsText>
              앗, 검색 결과가 없어요.
              {'\n'}
              검색어를 다시 한번 확인해 주세요!
            </S.NoResultsText>
          </S.NoResultsState>
        )
      ) : (
        <S.RecommendedSearchSection>
          <S.RecommendedSearchHeader>추천 검색어</S.RecommendedSearchHeader>
          <S.CustomTabsWrapper>
            <Tabs
              tabs={['화장실', '주류 구매', '셔틀콕']}
              activeTab=""
              onTabClick={handleRecommendedClick}
              autoWidth={true}
              margin="0"
              gap="0.5rem"
            />
          </S.CustomTabsWrapper>
        </S.RecommendedSearchSection>
      )}
    </S.SearchPageContainer>
  );
}
