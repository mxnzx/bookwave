import { privateApi, publicApi } from "./";


export const postLogin = async (code: string) => {
  try {
    const response = await privateApi.post('/api/members/kakao/login', {
      code: code,
    });
    return response.data;
  } catch (error) {
    throw new Error("api/auth 로그인 요청 실패")
  }
}