import record from "../../../assets/images/feed.jpg";
import * as S from "./ProfileRecord.styles";

const ProfileRecord = () => {

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
export default ProfileRecord;
