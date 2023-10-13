import { privateApi } from "./index";
import { useQuery } from "@tanstack/react-query";
import { BookDetail, ShelfResponse } from "../types/types";


// 도서 장르 조회
export const fetchGenre = async (memberId: number | null) => {
  try {
    const response = await privateApi.get("/api/genre/genre-question", {
      params: {
        memberId: memberId,
      },
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

// 도서 선호 장르 등록
export const postGenre = async (memberId: number | null, genreList: number[]) => {
  try {
    const response = await privateApi.post(`/api/genre/regist?memberId=${memberId}`, {
      genreList: genreList
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 책장 리스트 조회
export const fetchShelf = async (memberId: number | null) => {
  try {
    const response = await privateApi.get(`/api/bookshelf/list?memberId=${memberId}`);
    // console.log(response.data.data, "책장불러오기 성공");
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
// 책장 리스트 조회 리액트 쿼리
export const useShelf = (memberId: number | null) => {
  return useQuery<ShelfResponse, Error>(
    ['shelf', memberId],
    () => fetchShelf(memberId),
    {
      enabled: !!memberId, // memberId가 null이 아닐 때만 쿼리를 실행
    }
  );
};

// 도서 상세 조회
export const fetchBookDetail = async (bookId: number | null) => {
  try {
    const response = await privateApi.get(`/api/books/detail/${bookId}`);
    // console.log(response.data.data, "책장불러오기 성공");
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
// 도서 상세 조회 리액트 쿼리
export const useBookDetail = (bookId: number | null) => {
  return useQuery<BookDetail, Error>(
    ['bookDetail', bookId],
    () => fetchBookDetail(bookId),
    {
      enabled: !!bookId,
    }
  );
};

// 도서 상태 변경
export const postBookState = async (bookId: number | null, state: number | null) => {
  try {
    const response = await privateApi.post('/api/books/state-change', {
      bookId,
      state
    });
    // console.log(response.data, "도서 상태 변경 성공");
    return response.data;
  } catch (error) {
    throw error;
  }
};