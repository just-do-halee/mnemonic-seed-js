import { CRYPTO } from '../../utils';
import { Binary, BinaryImpl } from './Binary';
import { bytesToBinaryStr } from '../../utils/strings';

// -----------------------------

const { randomBytes, sha256 } = CRYPTO;

// -----------------------------

export { BinaryImpl };
export type { Binary } from './Binary';
export type EntropyBits = '128' | '160' | '192' | '224' | '256';

/**
 *
 * @param entropyBitNum * original entropy bit number
 *                      * ('128' | '160' | '192' | '224' | '256')
 * @param checksum * attaching checksum
 *                 * (128 + 4 | 160 + 5 | 192 + 6 | 224 + 7 | 256 + 8) bits
 */

export default function (
  entropyBitNum: EntropyBits = '128',
  checksum: boolean = true
): Binary {
  const bytes = generateEntropyBytes(entropyBitNum); // create original entropy.

  let binary = BinaryImpl.fromBytes(bytes); // to binary string type.

  if (checksum) {
    binary.str += calcChecksum(bytes);
  }

  return binary;
}

export function calcChecksum(bytes: Buffer) {
  const checksumBitNum = (bytes.byteLength * 8) / 32; // S bits / 32 bits
  const byte = sha256(bytes).slice(0, 1);
  const binary1byte = bytesToBinaryStr(byte);
  return binary1byte.slice(0, checksumBitNum);
}

export function generateEntropyBytes(entropyBitNum: EntropyBits = '128') {
  return randomBytes(~~entropyBitNum / 8);
}
