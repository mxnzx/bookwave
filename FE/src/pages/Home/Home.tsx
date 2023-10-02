import { loginState } from "../../recoil";
import { useRecoilValue } from "recoil";
import RecommendPage from "../RecommendPage/RecommendPage";
import GuestPage from "../GuestPage/GuestPage";


const Home = () => {
  const isLogIn = useRecoilValue(loginState);

  return (
    <div>
      {/* 로그인 여부에 따라서 컴포넌트 렌더링 */}
      {isLogIn ? <RecommendPage/> : <GuestPage />}
    </div>
  );
}
export default Home;