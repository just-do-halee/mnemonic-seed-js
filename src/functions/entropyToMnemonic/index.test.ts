import entropyToMnemonic from '../entropyToMnemonic';
import generateEntropy from '../generateEntropy';
import { BinaryImpl } from '../generateEntropy/Binary';
import { Mnemonic, MnemonicImpl } from './Mnemonic';

describe('entropyToMnemonic', () => {
  test('end-to-end', () => {
    const entropy = generateEntropy('256');
    entropyToMnemonic(entropy, 'english');
  });
  it('will be failed (malformed raw entropy)', () => {
    const binary = BinaryImpl.new('0101010101');
    expect(() => entropyToMnemonic(binary)).toThrowError(
      new Error(`the entropy must be divided by 11. (10)`)
    );
  });
});

describe('Mnemonic class', () => {
  let mnemonic: Mnemonic;
  beforeAll(() => {
    const entropy = generateEntropy('128', true);
    mnemonic = entropyToMnemonic(entropy, 'english');
  });
  test('static isValidRawMnemonicArray()', () => {
    expect(
      MnemonicImpl.isValidRawMnemonicArray('english', ['absurd', 'above'])
    ).toBeTruthy();
  });
  test('len', () => {
    expect(mnemonic.len).toEqual(12);
  });
  test('constructor()', () => {
    // wrong mnemonic
    expect(() =>
      MnemonicImpl.unsafeNew('english', ['apple', 'banana'], [1])
    ).toThrowError(new Error(`not matched array sizes`));
    expect(() => MnemonicImpl.new('english', ['화겸', '김'])).toThrowError(
      new Error(`not a valid raw mnemonic array`)
    );
    // right mnemonic
    const rawIndex: number[] = MnemonicImpl.new('english', [
      'abandon',
      'ability',
    ]).rawIndex;
    expect(rawIndex[0]).toEqual(0);
    expect(rawIndex[1]).toEqual(1);
  });
  test('toString()', () => {
    const mnemonicStr = mnemonic.toString();

    expect(mnemonicStr).toEqual(mnemonic.raw.join(' '));
  });
  afterAll(() => {
    // it will be killed
    mnemonic.kill();
    expect(mnemonic.lang).toEqual('english');
    expect(mnemonic.raw.length).toEqual(0);
    expect(mnemonic.len).toEqual(0);
  });
});
