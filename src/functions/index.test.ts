import {
  generateEntropy,
  calcChecksum,
  mnemonicToSeed,
  entropyToMnemonic,
} from '../functions';
import { TESTS } from '../assets';
import { BinaryImpl } from './generateEntropy/Binary';

// -----------------------------

const vectors: { [index: string]: string[][] } = TESTS.vectors;

// -----------------------------

describe('', () => {
  test('end-to-end', () => {
    const entropy = generateEntropy();
    const mnemonic = entropyToMnemonic(entropy);
    mnemonicToSeed(mnemonic);
  });

  test('vectors', () => {
    const rawEntropyToEntropy = (rawEnt: string) => {
      const binary = BinaryImpl.fromHex(rawEnt);
      const buffer = Buffer.from(rawEnt, 'hex');
      const checksumBinary = calcChecksum(buffer);
      binary.str += checksumBinary;
      return binary;
    };

    for (const lang in vectors) {
      for (const [vrawEntropy, vmnemonic, vseedHex, _] of vectors[lang]) {
        const entropy = rawEntropyToEntropy(vrawEntropy);
        const mnemonic = entropyToMnemonic(entropy, lang as any);
        expect(mnemonic.toString()).toEqual(vmnemonic);
        const seed = mnemonicToSeed(mnemonic, 'TREZOR').toString('hex');
        expect(seed).toEqual(vseedHex);
      }
    }
  });
});
