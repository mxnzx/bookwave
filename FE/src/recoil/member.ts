import { atom } from 'recoil';
import profile from '../assets/icons/profile.png';

export const profileImageState = atom({
  key: 'profileImageState',
  default: profile,  // default image
});

export const followerModalState = atom({
  key: 'followerModalState',
  default: false,
});

export const followingModalState = atom({
  key: 'followingModalState',
  default: false,
});