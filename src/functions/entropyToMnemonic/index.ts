import { WORDLISTS } from '../../assets';
import { STRINGS } from '../../utils';
import { Binary } from '../generateEntropy';
import { MnemonicImpl } from './Mnemonic';

import type {
  Mnemonic,
  Language,
  RawMnemonicArray,
  RawMnemonicIndexArray,
} from './Mnemonic';

// -----------------------------

const { unicodeNormalize } = STRINGS;

// -----------------------------

export { MnemonicImpl };
export type {
  Mnemonic,
  Language,
  RawMnemonicArray,
  RawMnemonicIndexArray,
} from './Mnemonic';

export default function (
  entropy: Binary,
  language: Language = 'english'
): Mnemonic {
  if (entropy.len % 11 !== 0) {
    throw new Error(`the entropy must be divided by 11. (${entropy.len})`);
  }
  const indexToWord = (index: number) =>
    unicodeNormalize(WORDLISTS[language][index]);

  const mnemonicIndexArray: RawMnemonicIndexArray = [];
  const mnemonicArray: RawMnemonicArray = entropy.chunks(11).map((bits11) => {
    const index = bits11.toNumber();
    mnemonicIndexArray.push(index);
    return indexToWord(index);
  });

  return MnemonicImpl.unsafeNew(language, mnemonicArray, mnemonicIndexArray);
}
