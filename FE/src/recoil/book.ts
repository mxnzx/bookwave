import { atom } from 'recoil';
import { BookDetail } from '../types/types';

export const bookDetailState = atom<BookDetail | null>({
  key: 'bookDetailState',
  default: null,
});