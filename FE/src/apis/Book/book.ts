import { privateApi } from "../index";

// 키워드로 도서 검색
export const fetchBookByKeyword = async (keyword: string) => {
  try {
    const response = await privateApi.get(`api/books/search-keyword?keyword=${keyword}`);
    console.log(response.data, "키워드로 도서 검색 axios 성공");
    return response.data;
  } catch (error) {
    console.error("키워드로 도서 검색 중 axios 오류 발생: ", error);
    throw error;
  }
};
