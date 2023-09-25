import record from "../../../assets/images/feed_2.jpg";
import * as S from "./ProfileDiary.styles";


const ProfileDiary = () => {


  const feeds = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <S.FeedGrid>
    {feeds.map(feed => 
    <S.FeedBox key={feed} >
      <S.FeedImg src={record}/>
    </S.FeedBox>)}
  </S.FeedGrid>
  );
};
export default ProfileDiary;
