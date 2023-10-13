import { privateApi } from './index';

type UpdateProfileRequest = {
  nickname: string;
};


// 회원 정보 수정 요청
export const updateMemberProfile = async (memberId: number, nickname: UpdateProfileRequest, file?: File) => {
  const formData = new FormData();
  const jsonBlob = new Blob([JSON.stringify({ nickname: nickname.nickname })], { type: "application/json" });
  formData.append("nickname", jsonBlob);
  if (file) formData.append("file", file);
  const response = await privateApi.put(`/api/members/${memberId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  // console.log(response.data, "정보수정성공");
  
  return response.data;
};

// 회원 정보 수정 데이터 불러오기
export const fetchMemberProfile = async () => {
  const response = await privateApi.get('/api/members/getInfo');
  // console.log(response.data);
  return response.data;
};


// 회원 탈퇴 하기
export const updateWithDrawal = async () => {
  const response = await privateApi.put('/api/members/withdrawal');
  // console.log(response.data, "회원탈퇴 성공");
  return response.data;
};

// 팔로우 등록
export const postFollow = async (followerId: number | null) => {
  try {
    const response = await privateApi.post('/api/follow', {
      followerId
    });
    // console.log(response.data, "팔로우 성공");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 팔로잉 목록 조회
export const fetchFollowing = async (id: number | null) => {
  try {
    const response = await privateApi.get(`/api/follow/following?id=${id}`);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 팔로워 목록 조회
export const fetchFollower = async (id: number | null) => {
  try {
    const response = await privateApi.get(`/api/follow/follower?id=${id}`);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 팔로워 취소
export const deleteFollow = async (target: number | null) => {
  try {
    const response = await privateApi.delete(`/api/follow?target=${target}`);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 팔로우 여부 조회
export const fetchIsFollow = async (memberId: number | null) => {
  try {
    const response = await privateApi.get(`/api/follow?memberId=${memberId}`);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};