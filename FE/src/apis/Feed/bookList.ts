/* eslint-disable no-useless-catch */
import { privateApi } from "../index";

// 피드 => 독후감 작성 모달 (읽는 중인 책 / 다 읽은 책)
export const fetchBookList = async (userSeq: number) => {
  try {
    const response = await privateApi.get(
      `api/bookshelf/list?memberId=${userSeq}`
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
