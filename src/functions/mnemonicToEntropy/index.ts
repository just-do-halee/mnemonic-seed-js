import { Mnemonic } from '../entropyToMnemonic';
import { Binary, BinaryImpl } from '../generateEntropy';

export type { Binary };

export default function (
  mnemonic: Mnemonic,
  withoutChecksum: boolean = false
): Binary {
  const indexToBinaryStr = (index: number) =>
    index.toString(2).padStart(11, '0');

  let binary = mnemonic.rawIndex.map(indexToBinaryStr).join('');

  if (withoutChecksum) {
    const checksumBitNum = binary.length / 33;
    binary = binary.slice(0, binary.length - checksumBitNum);
  }

  return BinaryImpl.unsafeNew(binary);
}
