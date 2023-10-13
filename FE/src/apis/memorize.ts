import { privateApi } from './index';


// 기록 페이지 독서 기록 조회
export const fetchMemoRecord = async (id: number | null) => {
  try {
    const response = await privateApi.get(`/api/members/record-list/${id}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

// 기록 페이지 일기 조회
export const fetchMemoDiary = async () => {
  try {
    const response = await privateApi.get(`/api/members/diary-list`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
// 기록 페이지 회원 정보 조회
export const fetchMemoMemberInfo = async (id: number | null) => {
  try {
    const response = await privateApi.get(`/api/members/info/${id}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

