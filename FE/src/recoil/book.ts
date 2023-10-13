import { atom } from 'recoil';
import { BookDetail } from '../types/types';

interface IToDoState {
  [key: string]: string[];
}

export const bookDetailState = atom<BookDetail | null>({
  key: 'bookDetailState',
  default: null,
});

export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {
    "To Do": ["a", "b"],
    Doing: ["c", "d", "e"],
    Done: ["f"],
  },
});


type Book = {
  bookId: number;
  isbn: string;
  bookImageUrl: string;
  bookTitle: string;
  bookAuthor: string;
  state: number;
};

export const shelfState = atom({
  key: 'shelfState',
  default: { 
    wishBookList: [] as Book[], 
    readingBookList: [] as Book[], 
    doneBookList: [] as Book[],
  },
});

export const writeModalState = atom({
  key: 'writeModalState',
  default: false,
});



