/* eslint-disable no-useless-catch */
import { privateApi } from "../index";

// 유저 정보 불러오기
export const fetchUserInfo = async () => {
  try {
    // 이 부분에서 토큰을 가져오도록 수정
    const authToken = localStorage.getItem("accessToken");

    const response = await privateApi.get("/api/members/allGetInfo", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
