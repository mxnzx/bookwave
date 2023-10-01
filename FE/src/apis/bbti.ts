import { privateApi } from "./index";


// BBTI 설문 리스트 조회
export const fetchBBTIList = async () => {
  try {
    const response = await privateApi.get("/api/bbti/bbti-question");
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
