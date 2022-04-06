import mnemonicToEntropy from '../mnemonicToEntropy';
import entropyToMnemonic from '../entropyToMnemonic';
import generateEntropy, {
  calcChecksum,
  generateEntropyBytes,
} from '../generateEntropy';
import { BinaryImpl } from '../generateEntropy/Binary';

describe('mnemonicToEntropy', () => {
  test('end-to-end (with checksum)', () => {
    // with checksum
    const entropy = generateEntropy();
    const mnemonic = entropyToMnemonic(entropy);
    const entropy2 = mnemonicToEntropy(mnemonic);
    expect(entropy).toEqual(entropy2);
  });
  test('end-to-end (without checksum)', () => {
    // without checksum
    const rawEntropyBytes = generateEntropyBytes('128');
    const checksum = calcChecksum(rawEntropyBytes);

    const entropyWCS = BinaryImpl.fromBytes(rawEntropyBytes);

    const entropy = BinaryImpl.fromBytes(rawEntropyBytes);
    entropy.str += checksum;

    const mnemonic = entropyToMnemonic(entropy);
    const entropy2WCS = mnemonicToEntropy(mnemonic, true);

    expect(entropyWCS).toEqual(entropy2WCS);
  });
});
