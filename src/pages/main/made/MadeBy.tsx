import Card from '@/features/main/components/madeby/Card';
import * as S from './MadeBy.styles';
import Logo from '@/assets/images/madeby/madeby_logo.webp';
import Mock from '@/assets/images/madeby/madeby_image.webp';
import { allMembers } from '@/constants/main/Members';
import { useLayoutStore } from '@/stores/useLayoutStore';
import { useEffect } from 'react';
import { NavBar } from '@/components/nav-bar';
import StarIcon from '@/assets/icons/staricon.svg?react';

/**
 * MadeBy 컴포넌트
 * @returns {JSX.Element}
 */

export default function MadeBy() {
  const parts = ['기획 & 디자인', '프론트엔드', '백엔드'];
  const setIsNav = useLayoutStore((state) => state.setIsNav);

  useEffect(() => {
    setIsNav(false);
    return () => {
      setIsNav(true);
    };
  }, [setIsNav]);
  return (
    <S.Container>
      <NavBar title="만든 이들" isBack={true} />
      <S.Image src={Logo} alt="logo" />

      <S.Image2 src={Mock} alt="mock" />
      <S.TextWrap>
        <S.MainTitle>우리는 ‘멋쟁이사자처럼’ 동아리입니다.</S.MainTitle>
        <S.SubTitle>
          저희 팀이 2개월간 한마음으로 만든
          <br />
          가을 축제 웹앱을 공개합니다!
          <br />
          <br />
          서툴지만 진심을 담아,
          <br />
          기획부터 디자인, 개발까지 차근차근 만들었습니다.
          <br />
          <br />
          사용자들이 더 편하게 축제를 즐기고 추억할 수 있도록
          <br />
          팀원 모두가 최선을 다해 협업했습니다.
          <br />
          <br />
          이제 남은 건 여러분의 차례입니다.
          <br />
          저희 웹앱과 함께 가을 축제의 모든 순간을 즐겨주세요!
          <br />
        </S.SubTitle>
      </S.TextWrap>
      <S.PartWrap>
        {parts.map((part) => {
          const members = allMembers.filter((member) => member.part === part);
          return (
            <S.PartBox key={part}>
              <S.PartTitle>
                <StarIcon style={{ width: '1rem', marginTop: '0.1rem' }} />
                {part}
              </S.PartTitle>
              <S.PartCard>
                {members.map((member, index) => (
                  <Card key={index} index={index} {...member} />
                ))}
              </S.PartCard>
            </S.PartBox>
          );
        })}
      </S.PartWrap>
    </S.Container>
  );
}
