import { pinyin } from 'pinyin-pro';

export const getPinyin = (char) => {
  return pinyin(char, { toneType: 'symbol', type: 'array' })[0];
};