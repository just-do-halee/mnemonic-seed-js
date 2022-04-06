import { STRINGS } from '../../utils';

import type { Writable } from '../../utils';

// -----------------------------

const { bytesToBinaryStr, hexStrToBinaryStr, stringToChunkArray } = STRINGS;

// -----------------------------

export type BinaryString = string;

export interface Binary {
  readonly len: number;
  str: BinaryString;
  chunks(size: number): Binary[];
  toNumber(): number;
  kill(): void;
}

export class BinaryImpl implements Binary {
  get str(): BinaryString {
    return this.binaryString;
  }
  set str(v: string) {
    if (BinaryImpl.isValidBinaryString(v) === false) {
      throw new Error(`not a binary string`);
    }
    this.binaryString = v;
  }
  get len(): number {
    return this.str.length;
  }
  constructor(private binaryString: BinaryString) {
    this.str = binaryString;
  }
  // ---------
  static unsafeNew(s: BinaryString): Binary {
    const ret = new BinaryImpl('0');
    ret.setUnsafeStr(s);
    return ret;
  }
  static isValidBinaryString(s: BinaryString): boolean {
    for (const ch of s) {
      if (ch !== '0' && ch !== '1') return false;
    }
    return true;
  }
  static fromBytes(bytes: Buffer): Binary {
    const binaryString = bytesToBinaryStr(bytes);
    return new BinaryImpl(binaryString);
  }
  static fromHex(hexString: string): Binary {
    const binaryString = hexStrToBinaryStr(hexString);
    return new BinaryImpl(binaryString);
  }
  // ---------
  protected setUnsafeStr(v: string) {
    this.binaryString = v;
  }
  chunks(size: number): Binary[] {
    return stringToChunkArray(this.str, size).map(BinaryImpl.unsafeNew);
  }
  toNumber(): number {
    return parseInt(this.binaryString, 2);
  }
  kill(): void {
    const mine: Writable<BinaryImpl> = this;
    mine.str = '';
  }
}
