
import { useEffect } from "react";
// import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { accessTokenState } from "../../recoil";

const BASE_URL = 'https://j9b203.p.ssafy.io';

function KakaoRedirect() {
  const setAccessToken = useSetRecoilState(accessTokenState);
  const code = new URL(window.location.href).searchParams.get("code");
  const navigate = useNavigate();

  console.log(code, '코드값');

  useEffect(() => {
    const fetchNaverLogin = async () => {
      try {
        const res = await axios({
          url: `${BASE_URL}/api/members/kakao/login`,
          method: "post",
          data: {
            code: code,
          },
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(res, "로그인 res");
        const isFirstLogin = res.data.firstLogin;
        const memberId = res.data.id;
        const nickName = res.data.nickname;
        const accessToken = res.headers["authorization"];
        const refreshToken = res.headers["authorization-refresh"];
        localStorage.setItem("isFirstLogin", isFirstLogin);
        localStorage.setItem("memberId", memberId);
        setAccessToken(accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("accessToken", accessToken)
        localStorage.setItem("nickName", nickName);
        if (isFirstLogin === true) {
          navigate("/join")
        } else {
          navigate("/", {
            state: {
              isFirstLogin: isFirstLogin,
              memberId: memberId,
              nickName: nickName,
            },
          });
        }
      } catch (error) {
        console.log("ERORR입니다!!", error);
      }
    };
    fetchNaverLogin();
  }, [code]);

  return <div></div>;
}

export default KakaoRedirect;
