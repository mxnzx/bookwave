
export type Book = {
  bookId: number;
  isbn: string;
  bookImageUrl: string;
  bookTitle: string;
  bookAuthor: string;
  state: number;
};
export type ShelfResponse = {
  userNickname: string;
  wishBookList: Book[];
  readingBookList: Book[];
  doneBookList: Book[];
  // [key: string]: Book[]; // 문자열 인덱스 서명 추가
}

export type BookDetail = {
  id: number;
  isbn: string;
  imageUrl: string;
  title: string;
  author: string;
  publishDate: string;
  genre: string;
  publisher: string;
  content: string;
  state: number;
  emotionChartList: any; // 이 필드의 정확한 타입을 모르기 때문에 임시로 any로 지정합니다.
  recordListCnt: number;
  recordPreviewDtoList: {
    recordId: number;
    recordMemberNickname: string;
    recordMemberProfileImageUrl: string | null;
    recordTitle: string;
    recordContent: string;
  }[];
  bookshelfCnt: number;
  bookScore: number;
};


