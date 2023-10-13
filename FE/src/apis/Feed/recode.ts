/* eslint-disable no-useless-catch */
import { privateApi } from "../index";

// 독후감 작성 페이지 들어가면 보여지는 책 정보
export const fetchBookData = async (bookSeq: number, userSeq: number) => {
  try {
    const response = await privateApi.get(
      `api/record/book-info/${bookSeq}?memberId=${userSeq}`
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

// 피드 리스트 인덱스 가져오기
export const featchRecodeList = async (memberId: number) => {
  try {
    const response = await privateApi.get(`api/record/view-list/${memberId}`);
    // console.log( "리스트 인덱스 가져오기 axios " + response.data.data.recordIdList);
    return response.data.data.recordIdList;
  } catch (error) {
    console.log("리스트 인덱스 가져오는데 어? ");
    throw error;
  }
};

// 게시글 누르면 보여지는 정보 || 게시글 상세보기
export const fetchRecodeDetail = async (recordId: number) => {
  try {
    const response = await privateApi.get(`api/record/view-detail/${recordId}`);
    return response.data.data;
  } catch (error) {
    console.error("API 호출 중 오류 발생:", error);
    throw error;
  }
};

// 게시글 작성
type CreateType = {
  memberId: number;
  bookId: number;
  title: string;
  content: string;
  startDate: string;
  endDate: string;
  star: number;
};
type UploadFileType = File | undefined;

export const postRecode = async (
  payload: CreateType,
  recordPictureFile: UploadFileType
) => {
  try {
    const formData = new FormData();

    // JSON 데이터를 Blob으로 변환하여 추가
    const jsonBlob = new Blob([JSON.stringify(payload)], {
      type: "application/json",
    });
    formData.append("recordRegistRequest", jsonBlob);

    if (recordPictureFile) {
      formData.append("recordPicture", recordPictureFile);
    } else {
      formData.append("recordPicture", new File([], "empty"));
    }

    const response = await privateApi.post(`/api/record/regist`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    // console.log(response.data, "게시글 등록 axios 성공");
    return response.data;
  } catch (error) {
    console.error("게시글 등록하는데 실패:", error);
    throw error;
  }
};

// 게시글 수정
type UpdateType = {
  recordId: number;
  bookImageUrl: string;
  recordImageUrl: string | null;
  title: string;
  content: string;
  startDate: string;
  endDate: string;
  star: number;
};
type UpdateFileType = File | undefined;

export const updateRecode = async (
  payload: UpdateType,
  updatePictureFile: UpdateFileType
) => {
  try {
    const formData = new FormData();

    // JSON 데이터를 Blob으로 변환하여 추가
    const jsonBlob = new Blob([JSON.stringify(payload)], {
      type: "application/json",
    });
    formData.append("recordModifyRequest", jsonBlob);

    if (updatePictureFile) {
      formData.append("recordPicture", updatePictureFile);
    } else {
      formData.append("recordPicture", new File([], "empty"));
    }

    const response = await privateApi.put(`/api/record/modify/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    // console.log("게시글 수정 axios 성공");
    return response.data;
  } catch (error) {
    console.error("게시글 수정하려는데 어?: ", error);
    throw error;
  }
};

// 게시글 수정 페이지 정보 얻기
export const fetchRecodeUpdate = async (recordId: number) => {
  try {
    const response = await privateApi.get(`api/record/modify-info/${recordId}`);
    // console.log("게시글 수정페이지 불러오기 axios 성공");
    return response.data.data;
  } catch (error) {
    console.error("게시글 수정페이 들어갔는데 어?: ", error);
    throw error;
  }
};

// 게시글 삭제하기
export const deleteRecode = async (recordId: number) => {
  try {
    const response = await privateApi.delete(`api/record/delete/${recordId}`);
    // console.log("게시글 삭제 axios 성공");
    return response.data.data;
  } catch (error) {
    // console.error("게시글 삭제하려는데 어?: ", error);
    throw error;
  }
};

// 댓글 작성
export const postComment = async (recordId: number, content: string) => {
  try {
    const response = await privateApi.post(`api/record/comment/regist`, {
      recordId: recordId,
      content: content,
    });
    // console.log("댓글 작성 axois 성공");
    return response.data;
  } catch (error) {
    console.error("게시글 댓글 달어야하는데 어?: ", error);
    throw error;
  }
};

// 게시글 댓글 삭제하기
export const deleteComment = async (commentId: number) => {
  try {
    const response = await privateApi.delete(
      `api/record/comment/delete/${commentId}`
    );
    // console.log("댓글 삭제 axios 성공");
    return response.data;
  } catch (error) {
    // console.error("댓글 삭제하려는데 어?: ", error);
    throw error;
  }
};

// 게시글 좋아요
export const putLike = async (recordId: number) => {
  try {
    const response = await privateApi.put(`api/record/like`, {
      recordId: recordId,
    });
    // console.log("좋아요~ axios 성공");
    return response.data;
  } catch (error) {
    console.error("좋다는데 어?: ", error);
    throw error;
  }
};

// 게시글 작성 -> 상태 변경
export const postChangeState = async (bookId: number, state: number) => {
  try {
    const response = await privateApi.post(`api/books/state-change`, {
      bookId: bookId,
      state: state,
    });
    return response.data;
  } catch (error) {
    console.error("책 상태 변경 중 오류 발생: ", error);
    throw error;
  }
};
