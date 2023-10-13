/* eslint-disable no-useless-catch */
import { privateApi } from "../index";

export const featchBBTI = async (userSeq: number) => {
  try {
    const response = await privateApi.get(
      `api/bookshelf/list?memberId=${userSeq}`
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

// 유저 정보 전체 불러오기
export const featchFeedBBTI = async () => {
  try {
    const response = await privateApi.get(`api/record/memberlist`);
    return response.data;
  } catch (error) {
    console.log("피드에서 bbti 정보 불러오는데 axios 어?", error);
    throw error;
  }
};
