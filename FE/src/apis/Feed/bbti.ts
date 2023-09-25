/* eslint-disable no-useless-catch */
import { privateApi } from "../index";

export const featchBBTI = async (userSeq: number) => {
  try {
    const authToken = localStorage.getItem("accessToken");

    const response = await privateApi.get(
      `api/bookshelf/list?memberId=${userSeq}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
