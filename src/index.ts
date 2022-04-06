export * as F from './functions';
export type { EntropyBits, Language, Mnemonic, Binary } from './functions';
import type { EntropyBits, Language, Mnemonic, Binary } from './functions';
import {
  generateEntropy,
  entropyToMnemonic,
  mnemonicToSeed,
  mnemonicToEntropy,
  BinaryImpl,
  MnemonicImpl,
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
  /**
   *
   * @param src - Binary or (`Hex`)string;
   * @param option - SeedOption = {
                   - passphrase?: string;
                   - bitsSize?: EntropyBits;
                   - language?: Language;
                   - };
   * @returns
   */
  static fromEntropy(src: Binary | string, option: SeedOption = {}): Seed {
    const { language, passphrase } = {
      ...this.defaultSeedOption,
      ...option,
    };
    let entropy: Binary;
    if (typeof src === 'string') {
      entropy = BinaryImpl.fromHex(src); // Hex
    } else {
      entropy = src; // Binary
    }
    const mnemonic = entropyToMnemonic(entropy, language);
    const buffer = mnemonicToSeed(mnemonic, passphrase);
    return new this(entropy, mnemonic, buffer);
  }
  static fromMnemonic(src: Mnemonic | string, option: SeedOption = {}): Seed {
    const { passphrase, language = 'english' } = {
      ...this.defaultSeedOption,
      ...option,
    };
    let mnemonic: Mnemonic;
    if (typeof src === 'string') {
      mnemonic = MnemonicImpl.new(language, src.split(' ')); // Mnemonic String
    } else {
      mnemonic = src; // Mnemonic
    }
    const entropy = mnemonicToEntropy(mnemonic, false);
    const buffer = mnemonicToSeed(mnemonic, passphrase);
    return new this(entropy, mnemonic, buffer);
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
