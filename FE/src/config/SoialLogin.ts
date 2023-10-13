const KAKAO_CLIENT_ID = "d162981d38b2d120dd8de1714dd68c63";
const KAKAO_REDIRECT_URL = import.meta.env.VITE_REACT_APP_KAKAO_REDIRECT_URL;
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URL}&response_type=code`;

const NAVER_CLIENT_ID = "aWQgyiORSXixtGdZLzfh";

const NAVER_REDIRECT_URL = import.meta.env.VITE_REACT_APP_NAVER_REDIRECT_URL;
const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${NAVER_REDIRECT_URL}`;
// const NAVER_AUTH_URR = "https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=aWQgyiORSXixtGdZLzfh&client_secret=fIvbgxHXcK&code=ecej2aiLp9TaqTvN52&state";

export { KAKAO_AUTH_URL, NAVER_AUTH_URL };
