import { useState, useEffect, useRef } from "react";
import { Link, useMatch, useNavigate } from "react-router-dom";
import * as S from "./Header.styles";
import { useAnimation, useScroll } from "framer-motion";
import { loginState, accessTokenState } from "../../../recoil";
import { useRecoilCallback, useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
import Logo from "../../../assets/icons/logo.png";
import { fetchMemberProfile } from "../../../apis";
import { profileImageState } from "../../../recoil/member";

const navVariants = {
  top: {
    backgroundColor: "rgba(0,0,0,0)",
  },
  scroll: {
    backgroundColor: "#f9f9f9",
  },
};
const dropdownVariants = {
  hidden: { opacity: 0, scaleY: 0, originY: 0 },
  visible: { opacity: 1, scaleY: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, scaleY: 0, transition: { duration: 0.3 } },
};

function Header() {
  const memberId = localStorage.getItem("memberId");
  const nickName = localStorage.getItem("nickName");
  const feedMatch = useMatch("/feed");
  const mainMatch = useMatch("/");
  const recommendMatch = useMatch("/recommend");
  const shelfMatch = useMatch(`/shelf/${memberId}`);
  const searchMatch = useMatch("/search");
  const memorizeMatch = useMatch(`/memorize/${memberId}`);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const navAnimation = useAnimation();
  const { scrollY } = useScroll();
  const [profileImg, setProfileImg] = useRecoilState(profileImageState);
  const [showDropdown, setShowDropdown] = useState(false);
  const isLogIn = useRecoilValue(loginState);
  const setToken = useSetRecoilState<string | null>(accessTokenState);
  const handleNickName = () => {
    navigate(`/memorize/${memberId}`);
    setShowDropdown(false);
  };
  const handleLogOut = useRecoilCallback(() => async () => {
    setToken(null);
    localStorage.removeItem("memberId");
    localStorage.removeItem("nickName");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("isFirstLogin");
    setShowDropdown(false)
    navigate("/");
  });

  // 회원 정보 불러오기
  useEffect(() => {
    const fetchProfileInfo = async () => {
      try {
        if (isLogIn) { // 로그인 상태에서만 회원 정보를 불러옵니다.
          const res = await fetchMemberProfile();
          if (res.profileImgPath) {
            setProfileImg(res.profileImgPath);
          }
        }
      } catch (error) {
        console.error("회원 정보 불러오기 에러", error);
      }
    };

    fetchProfileInfo();
  }, [isLogIn]);

  useEffect(() => {
    // 컴포넌트가 마운트될 때 이벤트 리스너를 document에 추가
    document.addEventListener('click', handleOutsideClick);

    // 컴포넌트가 언마운트될 때 이벤트 리스너를 document에서 제거
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const handleDropBox = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    event.stopPropagation(); // 이벤트 버블링을 중지
    setShowDropdown(prev => !prev);
  }

  const handleOutsideClick = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setShowDropdown(false);
    }
  };
  useEffect(() => {
    scrollY.onChange(() => {
      if (scrollY.get() > 80) {
        navAnimation.start("scroll");
      } else {
        navAnimation.start("top");
      }
    });
  }, [scrollY, navAnimation]);

  // if (isLoading) return <p>Loading...</p>;
  // if (isError) return <p>Error loading shelf</p>;

  return (
    <S.Header variants={navVariants} animate={navAnimation} initial="top">
      <S.Col>
        {isLogIn ? (
          <Link to="/recommend">
            <S.LogoImg src={Logo} />
          </Link>
        ) : (
          <S.LogoImg onClick={() => navigate('/login')} src={Logo} />
        )}
      </S.Col>
      {isLogIn ? (
        <>
          <S.Nav>
            <S.Items>
              <Link to="/feed">
                <S.Item active={feedMatch !== null ? "true" : "false"}>
                  피드
                </S.Item>
              </Link>
              <Link to="/recommend">
                <S.Item active={mainMatch || recommendMatch !== null ? "true" : "false"}>
                  추천
                </S.Item>
              </Link>
              <Link to={`/memorize/${memberId}`}>
                <S.Item active={memorizeMatch !== null ? "true" : "false"}>
                  기록
                </S.Item>
              </Link>
              <Link to={`/shelf/${memberId}`}>
                <S.Item active={shelfMatch !== null ? "true" : "false"}>
                  책장
                </S.Item>
              </Link>
              <Link to="/search">
                <S.Item active={searchMatch !== null ? "true" : "false"}>
                  검색
                </S.Item>
              </Link>
            </S.Items>
          </S.Nav>
          <S.Col>
            <S.ProfileImg
              src={profileImg}
              onClick={handleDropBox}
            />
            {showDropdown && (
              <S.Dropdown
                ref={dropdownRef}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={dropdownVariants}
              >
                <S.DropdownItem onClick={handleNickName}>{nickName}</S.DropdownItem>
                <S.DropdownItem onClick={handleLogOut}>로그아웃</S.DropdownItem>
              </S.Dropdown>
            )}
          </S.Col>
        </>
      ) : (
        <>
          <S.LogInBtn onClick={() => navigate('/login')}>로그인</S.LogInBtn>
        </>
      )}
    </S.Header>
  );
}

export default Header;
