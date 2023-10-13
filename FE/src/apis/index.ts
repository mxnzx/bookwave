import axios, { AxiosInstance } from "axios";
export * from "./auth";
export * from "./book";
export * from "./member";
export * from "./Feed/userInfo";
export * from "./Feed/bookList";
export * from "./Feed/bbti";
export * from "./Feed/recode";
export * from "./Reminder/diary";
export * from "./Book/book";
export * from "./memorize";
export * from "./bbti";

const BASE_URL = "https://j9b203.p.ssafy.io";

export const publicApi: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const privateApi: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("accessToken"),
  },
});

privateApi.interceptors.request.use(config => {
  const token = localStorage.getItem("accessToken");
  config.headers.Authorization = token;

  return config;
});

export async function postRefreshToken() {
  const headers = {
    "Authorization-Refresh": localStorage.getItem("refreshToken"),
  };
  const response = await publicApi.get("/api/members/reissue", { headers });
  return response;
}

privateApi.interceptors.response.use(
  response => {
    // console.log("response");
    return response;
  },

  async error => {
    const { config } = error;
    if (error.response.status === 401) {
      const originRequest = config;
      try {
        const response = await postRefreshToken();
        const newAccessToken = response.headers["authorization"];
        // console.log(newAccessToken, "newAccessToken");
        localStorage.setItem("accessToken", response.headers["authorization"]);
        localStorage.setItem(
          "refreshToken",
          response.headers["authorization-refresh"]
        );
        axios.defaults.headers.common.Authorization = newAccessToken;
        originRequest.headers.Authorization = newAccessToken;
        // console.log("토큰 재발급 완료");
        return axios(originRequest);
      } catch {
        console.log("catch 에러");
        // localStorage.removeItem('accessToken');
        // localStorage.removeItem('refreshToken');
        // window.location.href = ("/");
      }
    }
    return Promise.reject(error);
  }
);
