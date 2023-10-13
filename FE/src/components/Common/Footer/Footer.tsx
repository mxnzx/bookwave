import * as S from './Footer.styles';
import { Link, useMatch } from "react-router-dom";
import searchIcon from '../../../assets/icons/glass-icon.png';
import bookShelfIcon from '../../../assets/icons/bookshelf-icon.png';
import feedIcon from '../../../assets/icons/feed-icon.png';
import recommendIcon from '../../../assets/icons/recommend-icon.png';
import writeIcon from '../../../assets/icons/write.png';
import { loginState } from "../../../recoil";
import { useRecoilValue } from "recoil";

function Footer() {
  const memberId = localStorage.getItem("memberId")
  const feedMatch = useMatch("/feed");
  const mainMatch = useMatch("/");
  const recommendMatch = useMatch("/recommend");
  const memorizeMatch = useMatch(`/memorize/${memberId}`);
  const shelfMatch = useMatch(`/shelf/${memberId}`);
  const searchMatch = useMatch("/search");
  const isLogIn = useRecoilValue(loginState);
  return (
    <>
      {isLogIn ?
        <S.Footer>
          <Link to="/feed">
            <S.Menu active={feedMatch !== null ? "true" : "false"}>
              <img src={feedIcon}></img>
              <span>피드</span>
            </S.Menu>
          </Link>
          <Link to="/recommend">
            <S.Menu active={recommendMatch || mainMatch !== null ? "true" : "false"}>
              <img src={recommendIcon}></img>
              <span>추천</span>
            </S.Menu>
          </Link>
          <Link to={`/memorize/${memberId}`}>
            <S.Menu active={memorizeMatch !== null ? "true" : "false"}>
              <img src={writeIcon} ></img>
              <span>기록</span>
            </S.Menu>
          </Link>
          <Link to={`/shelf/${memberId}`}>
            <S.Menu active={shelfMatch !== null ? "true" : "false"}>
              <img src={bookShelfIcon} ></img>
              <span>책장</span>
            </S.Menu>
          </Link>
          <Link to="/search">
            <S.Menu active={searchMatch !== null ? "true" : "false"}>
              <img src={searchIcon}></img>
              <span>검색</span>
            </S.Menu>
          </Link>
        </S.Footer> : null
      }
    </>
  );
}

export default Footer;