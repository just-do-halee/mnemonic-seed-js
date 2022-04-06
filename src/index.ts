export * as F from './functions';
export type { EntropyBits, Language, Mnemonic, Binary } from './functions';
import type { EntropyBits, Language, Mnemonic, Binary } from './functions';
import {
  generateEntropy,
  entropyToMnemonic,
  mnemonicToSeed,
  mnemonicToEntropy,
} from './functions';

export type SeedOption = {
  passphrase?: string;
  bitsSize?: EntropyBits;
  language?: Language;
};

export interface Seed {
  readonly buffer: Buffer;
  readonly mnemonic: Mnemonic;
  readonly entropy: Binary;
  kill(): void;
}

export default class implements Seed {
  static get defaultSeedOption(): SeedOption {
    return {
      passphrase: '',
      bitsSize: '128',
      language: 'english',
    };
  }
  static new(option: SeedOption = {}): Seed {
    const { bitsSize, language, passphrase } = {
      ...this.defaultSeedOption,
      ...option,
    };
    const entropy = generateEntropy(bitsSize, true);
    const mnemonic = entropyToMnemonic(entropy, language);
    const buffer = mnemonicToSeed(mnemonic, passphrase);
    return new this(entropy, mnemonic, buffer);
  }
  static fromEntropy(src: Binary, option: SeedOption = {}): Seed {
    const { language, passphrase } = {
      ...this.defaultSeedOption,
      ...option,
    };
    const mnemonic = entropyToMnemonic(src, language);
    const buffer = mnemonicToSeed(mnemonic, passphrase);
    return new this(src, mnemonic, buffer);
  }
  static fromMnemonic(src: Mnemonic, option: SeedOption = {}): Seed {
    const { passphrase } = {
      ...this.defaultSeedOption,
      ...option,
    };
    const entropy = mnemonicToEntropy(src, false);
    const buffer = mnemonicToSeed(src, passphrase);
    return new this(entropy, src, buffer);
  }
  static fromSeed(src: Seed): Seed {
    return new this(src.entropy, src.mnemonic, src.buffer);
  }
  /* *** Unsafe *** */
  private constructor(
    readonly entropy: Binary,
    readonly mnemonic: Mnemonic,
    readonly buffer: Buffer
  ) {}
  kill(): void {
    this.buffer.fill(0);
    this.mnemonic.kill();
    this.entropy.kill();
  }
}
