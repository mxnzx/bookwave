import { privateApi } from "./index";

// 닉네임 중복 체크
export const checkNickName = async (nickName: string) => {
  try {
    const response = await privateApi.get("/api/members/nickname", {
      params: {
        nickname: nickName,
      },
    });
    // console.log("중복체크 성공", response);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 닉네임 변경
export const updateNickName = async (nickname: string) => {
  try {
    // console.log(nickname, "닉네임 변경 진입");
    const response = await privateApi.put("/api/members/nickname", {
      nickname,
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
