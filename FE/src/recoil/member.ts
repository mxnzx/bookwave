import { atom } from 'recoil';
import profile from '../assets/icons/profile.png';

export const profileImageState = atom({
  key: 'profileImageState',
  default: profile,  // default image
});