
import { useState, useEffect } from 'react';
import * as S from './BBTI.styles';
import searchIcon from '../../assets/icons/FeedSearch.png';
import { featchFeedBBTI } from '../../apis';
import { Link, useNavigate } from 'react-router-dom';
import profile from '../../assets/icons/profile.png';
import TextMaxLength from '../Common/TextMaxLength';

type BBTIProps = {
  bbtiType: number | null;
  userSeq: number | null;
};

type UserType = {
  memberId: number;
  bbtiTypeId: number;
  nickname: string;
  imageUrl: string | null;
};

const BBTITypes: { [key: number]: string } = {
  1: "검사 안함",
  2: "순간의 감동을 함께 나누는 독서가",
  3: "성실하고 온화한 독서가",
  4: "뜨거운 논쟁을 즐기는 독서가",
  5: "논리를 중시하는 독서가",
  6: "깊은 성찰을 이끌어내는 독서가",
  7: "마음의 소리를 따라가는 독서가",
  8: "나만의 세계로 탐험을 떠나는 독서가",
  9: "새로운 관점으로 세상을 보는 독서가"
};


function BBTI({ bbtiType, userSeq }: BBTIProps) {
  const navigate = useNavigate();
  const Type = BBTITypes[bbtiType as keyof typeof BBTITypes] || "Unknown Type";
  const [allUsers, setAllUsers] = useState<UserType[]>([]);
  const [randomUsers, setRandomUsers] = useState<UserType[]>([]);
  const [searchText, setSearchText] = useState("");
  const [isSearchMode, setIsSearchMode] = useState(false);

  useEffect(() => {
    // 데이터를 불러오는 함수
    const fetchAllUsers = async () => {
      try {
        const response = await featchFeedBBTI();
        setAllUsers(response.data);
      } catch (error) {
        console.error("피드 사용자 정보를 불러오기 실패", error);
      }
    };
    fetchAllUsers();
  }, [isSearchMode]);

  useEffect(() => {
    if (bbtiType !== null) {
      // 같은 BBTI 타입을 가진 사용자 필터링
      const similarBBTIUsers = allUsers.filter(user =>
        user.bbtiTypeId === bbtiType && user.memberId !== userSeq  // 여기에서 자신을 제외합니다.
      );

      // 필터링한 사용자를 랜덤으로 정렬
      const shuffledData = [...similarBBTIUsers].sort(() => 0.5 - Math.random());
      const selectedUsers = shuffledData.slice(0, 5);
      setRandomUsers(selectedUsers);
    }
  }, [bbtiType, allUsers, userSeq]);

  const handleSearch = () => {
    if (searchText.trim() === "") {
      setIsSearchMode(false); // 검색 모드 비활성화
      return;
    }

    setIsSearchMode(true); // 검색 모드 활성화
    const filteredUsers = allUsers.filter((user) =>
      user.nickname.toLowerCase().includes(searchText.toLowerCase()) &&
      user.memberId !== userSeq
    );
    const shuffledData = [...filteredUsers].sort(() => 0.5 - Math.random());
    const selectedUsers = shuffledData.slice(0, 5);
    setRandomUsers(selectedUsers);
  };

  const handleGoToBBTIPage = () => {
    navigate("/bbti");
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <S.BBTIContainer>
      {bbtiType === 1 ? (
        <S.GoToBBTIButton onClick={handleGoToBBTIPage}>
          BBTI 검사하고, 친구 추천받기
        </S.GoToBBTIButton>) :
        isSearchMode ? (
          <S.BBTIResult>
            검색 결과
          </S.BBTIResult>
        ) : (
          <S.BBTIHeader>
            <S.HighlightedText>
              {Type}
            </S.HighlightedText>
            친구 추천
          </S.BBTIHeader>
        )}
      <S.UserProfileContainer>
        <div className="user-profile-container">
          {randomUsers.length > 0 ? (
            randomUsers.map((user) => (
              <Link to={`/memorize/${user.memberId}`} key={user.memberId}>
                <S.UserItem>
                  <img src={user.imageUrl || profile} alt="프로필 사진" />
                  <p> <TextMaxLength text={user.nickname} maxLength={15} /> </p>
                </S.UserItem>
              </Link>
            ))
          ) : (
            isSearchMode && <S.NoResultMessage>유저를 찾을 수 없습니다.</S.NoResultMessage>
          )}
        </div>
      </S.UserProfileContainer>
      <S.SearchBox>
        <S.SearchIcon src={searchIcon} alt="검색 아이콘" />
        <input
          type="text"
          placeholder="유저 닉네임 검색"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{ color: '#018ABE' }}
        />
        <S.SearchButton style={{ color: '#018ABE' }} onClick={handleSearch}>검색</S.SearchButton>
      </S.SearchBox>
    </S.BBTIContainer>
  );
}

export default BBTI;
