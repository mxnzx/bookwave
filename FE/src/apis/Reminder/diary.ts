import { privateApi } from "../index";

// 일기 작성
type payload = {
  diaryContent: string;
  color: string;
};
export const postDairy = async (payload: payload) => {
  try {
    const authToken = localStorage.getItem("accessToken");

    const response = await privateApi.post(`/api/diary/regist`, payload, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    // console.log(response.data, "일기 작성 axios 성공");
    return response.data;
  } catch (error) {
    console.error("일기쓰려는데 axios 어? ", error);
    throw error;
  }
};

// 일기 수정페이지 상세 정보 불러오기
export const fetchDiary = async (diaryId: number) => {
  try {
    const authToken = localStorage.getItem("accessToken");
    const response = await privateApi.get(`api/diary/detail/${diaryId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    // console.log(response.data, "일기 상세 정보 불러오기 성공");
    return response.data.data;
  } catch (error) {
    console.error("일기 상세 정보 불러오려는데 어? ", error);
    throw error;
  }
};

// 일기 수정
type UpdateType = {
  diaryId: number;
  content: string;
  color: string;
};
export const updateDiary = async (payload: UpdateType) => {
  try {
    const authToken = localStorage.getItem("accessToken");

    const response = await privateApi.put(`/api/diary/modify`, payload, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    // console.log(response.data, "일기 수정 axios 성공");
    return response.data;
  } catch (error) {
    console.error("일기 수정하려는데 axios 어? ", error);
    throw error;
  }
};

// 일기 삭제하기
export const deleteDiary = async (diaryId: number) => {
  try {
    const authToken = localStorage.getItem("accessToken");
    const response = await privateApi.delete(`api/diary/delete/${diaryId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    // console.log("일기 삭제 성공");
    return response.data.data;
  } catch (error) {
    console.error("일기 삭제하려는데 어?: ", error);
    throw error;
  }
};
