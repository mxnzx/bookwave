/* eslint-disable no-useless-catch */
import { privateApi } from "../index";

// 유저 정보 불러오기
export const fetchUserInfo = async () => {
  try {
    const response = await privateApi.get("/api/members/allGetInfo");
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
