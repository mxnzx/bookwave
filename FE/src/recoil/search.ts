// states/searchState.ts
import { atom } from 'recoil';

export const searchTextState = atom<string>({
  key: 'searchTextState',
  default: '',
});

export const selectedGenreIndexState = atom<number | null>({
  key: 'selectedGenreIndexState',
  default: null,
});