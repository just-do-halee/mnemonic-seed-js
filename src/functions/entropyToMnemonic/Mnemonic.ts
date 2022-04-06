import { WORDLISTS } from '../../assets';
import type { Writable } from '../../utils';
import { unicodeNormalize } from '../../utils/strings';

export type Language = 'english' | 'korean';

export type RawMnemonicArray = string[];
export type RawMnemonicIndexArray = number[];

export interface Mnemonic {
  readonly len: number;
  readonly lang: Language;
  readonly raw: RawMnemonicArray;
  readonly rawIndex: RawMnemonicIndexArray;
  toString(): string;
  kill(): void;
}

export class MnemonicImpl implements Mnemonic {
  readonly rawIndex: RawMnemonicIndexArray;
  constructor(readonly lang: Language, readonly raw: RawMnemonicArray) {
    this.rawIndex = [];
    if (
      MnemonicImpl.isValidRawMnemonicArray(lang, raw, (index) => {
        this.rawIndex.push(index); // push each index number
      }) === false
    )
      throw new Error(`not a valid raw mnemonic array`);
  }
  static unsafeNew(
    language: Language,
    mnemonicArray: RawMnemonicArray,
    mnemonicIndexArray: RawMnemonicIndexArray
  ): Mnemonic {
    if (mnemonicArray.length !== mnemonicIndexArray.length)
      throw new Error(`not matched array sizes`);

    const ret: Writable<MnemonicImpl> = new MnemonicImpl(language, []);
    ret.raw = mnemonicArray;
    ret.rawIndex = mnemonicIndexArray;
    return ret as Mnemonic;
  }
  get len(): number {
    return this.raw.length;
  }
  static indexOfMnemonicWord(s: string, lang: Language): number {
    return WORDLISTS[lang].indexOf(unicodeNormalize(s));
  }
  static isValidRawMnemonicArray(
    lang: Language,
    raw: RawMnemonicArray,
    callback: (index: number) => void = (_: number) => {}
  ): boolean {
    for (const word of raw) {
      const index = MnemonicImpl.indexOfMnemonicWord(word, lang);
      callback(index);
      if (index === -1) return false;
    }
    return true;
  }
  // ---------
  toString(): string {
    return this.raw.join(' ');
  }
  kill(): void {
    const mine: Writable<MnemonicImpl> = this;
    mine.lang = 'english';
    mine.raw = [];
  }
}
