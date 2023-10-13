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

// BBTI 설문 데이터 등록
export const postBBTITResult = async (memberId: number, bbtiList: string[]) => {
  try {
    const response = await privateApi.post("/api/bbti/regist", {
      memberId,
      bbtiList
    })
    // console.log(response.data);
    return response.data
  } catch (error) {
    throw error;
  }

}