import "../../assets/font/font.css";
import BbtiRecommend from "../../components/Recommend/BBTI/BBTI";
import RecentRecommend from "../../components/Recommend/Recent/Recent";
import MoodRecommend from "../../components/Recommend/Mood/Mood";
import GenreRecommend from "../../components/Recommend/Genre/Genre";
import TodayRecommend from "../../components/Recommend/Today/Today";
import * as S from "../../pages/RecommendPage/RecommendPage.styles";
import { useEffect, useState } from 'react';
import GenreSurvey from "../../components/Recommend/Genre/GenreSurveyModal";
import useCheckAuthentication from "../../utils/Hooks/useCheckAuthentication";

const RecommendPage = () => {
  const [showGenreModal, setShowGenreModal] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);
  useCheckAuthentication();

  useEffect(() => {
    // 스크롤 이벤트 핸들러 함수
    const handleScroll = () => {
      // 현재 스크롤 위치 가져오기
      const scrollY = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = Math.floor((scrollY / scrollHeight) * 100);

      setScrollPosition(scrollPercentage);
    };

    // 스크롤 이벤트 리스너 등록
    window.addEventListener('scroll', handleScroll);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToPosition = (position: number) => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const targetScrollY = (position / 100) * scrollHeight;

    window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
  };

  return (
    <S.MainContainer>
      <S.SideBar>
        <S.VerticalLine></S.VerticalLine>
        <S.CursorContainer>
          <S.CursorInfo $isHighlighted={scrollPosition < 15 && scrollPosition >= 0} onClick={() => scrollToPosition(0)}>
            <S.Circle $isHighlighted={scrollPosition < 15 && scrollPosition >= 0}></S.Circle>
            <S.CategoryName>TODAY</S.CategoryName>
          </S.CursorInfo>
          <S.CursorInfo $isHighlighted={scrollPosition < 30 && scrollPosition >= 15} onClick={() => scrollToPosition(25)}>
            <S.Circle $isHighlighted={scrollPosition < 30 && scrollPosition >= 15}></S.Circle>
            <S.CategoryName>MOOD</S.CategoryName>
          </S.CursorInfo>
          <S.CursorInfo $isHighlighted={scrollPosition < 70 && scrollPosition >= 30} onClick={() => scrollToPosition(55)}>
            <S.Circle $isHighlighted={scrollPosition < 70 && scrollPosition >= 30}></S.Circle>
            <S.CategoryName>RECENT</S.CategoryName>
          </S.CursorInfo>
          <S.CursorInfo $isHighlighted={scrollPosition < 90 && scrollPosition >= 70} onClick={() => scrollToPosition(84)}>
            <S.Circle $isHighlighted={scrollPosition < 90 && scrollPosition >= 70}></S.Circle>
            <S.CategoryName>BBTI</S.CategoryName>
          </S.CursorInfo>
          <S.CursorInfo $isHighlighted={scrollPosition >= 90} onClick={() => scrollToPosition(100)}>
            <S.Circle $isHighlighted={scrollPosition >= 90}></S.Circle>
            <S.CategoryName>FAVORITE<br></br> GENRE</S.CategoryName>
          </S.CursorInfo>
        </S.CursorContainer>
      </S.SideBar>
      <S.RightContainer>
        <TodayRecommend></TodayRecommend>
        <MoodRecommend></MoodRecommend>
        <RecentRecommend></RecentRecommend>
        <BbtiRecommend ></BbtiRecommend>
        <GenreRecommend key={refreshKey} onShowGenreModal={() => setShowGenreModal(true)} />

      </S.RightContainer>
      {showGenreModal && <GenreSurvey onConfirm={() => { setShowGenreModal(false); setRefreshKey(prevKey => prevKey + 1) }} />}

    </S.MainContainer>
  );
}
export default RecommendPage;