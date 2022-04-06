import Seed, { F } from '.';

describe('final', () => {
  let seed: Seed;
  beforeAll(() => {
    seed = Seed.new(); // same as Seed.new({ bitsSize: '128', language: 'english', passphrase: '' });
  });

  it('must be same', () => {
    const mnemonic = F.entropyToMnemonic(seed.entropy);
    expect(mnemonic).toEqual(seed.mnemonic);
    const seed2 = F.mnemonicToSeed(mnemonic);
    expect(seed2).toEqual(seed.buffer);

    expect(Seed.fromEntropy(seed.entropy)).toEqual(seed);
    expect(Seed.fromEntropy(seed.entropy.toHex())).toEqual(seed);

    expect(Seed.fromMnemonic(seed.mnemonic)).toEqual(seed);
    expect(Seed.fromMnemonic(seed.mnemonic.toString())).toEqual(seed);
    expect(Seed.fromSeed(seed)).toEqual(seed);
  });

  afterAll(() => {
    seed.kill();
    expect(seed.buffer).toEqual(Buffer.alloc(seed.buffer.byteLength).fill(0));
    expect(seed.mnemonic.lang).toEqual('english');
    expect(seed.mnemonic.raw.length).toEqual(0);
    expect(seed.mnemonic.len).toEqual(0);
    expect(seed.entropy.len).toEqual(0);
    expect(seed.entropy.str).toEqual('');
  });
});
