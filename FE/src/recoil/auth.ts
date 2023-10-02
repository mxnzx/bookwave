import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

// 토큰 로컬스토리지에 저장 atom
export const accessTokenState = atom({
  key: 'accessTokenState',
  default: null,
  effects_UNSTABLE: [persistAtom], // Recoil Persist를 적용
});

// 로그인 여부 selector
export const loginState = selector({
  key: 'loginState',
  get: ({ get }) => get(accessTokenState) !== null,
});
