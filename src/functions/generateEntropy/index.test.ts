import generateEntropy, { Binary } from '../generateEntropy';
import { BinaryImpl } from './Binary';

describe('generateEntropy', () => {
  describe('length', () => {
    it('will be 132(= 128 + 4cs) bits', () => {
      expect(generateEntropy('128', true).len).toEqual(132);
    });
    it('will be 165(= 160 + 5cs) bits', () => {
      expect(generateEntropy('160', true).len).toEqual(165);
    });
    it('will be 198(= 192 + 6cs) bits', () => {
      expect(generateEntropy('192', true).len).toEqual(198);
    });
    it('will be 231(= 224 + 7cs) bits', () => {
      expect(generateEntropy('224', true).len).toEqual(231);
    });
    it('will be 264(= 256 + 8cs) bits', () => {
      expect(generateEntropy('256', true).len).toEqual(264);
    });
  });
});

describe('Binary class', () => {
  let binary: Binary;
  beforeAll(() => {
    binary = generateEntropy('128', false);
  });
  test('constructor()', () => {
    expect(() => new BinaryImpl('0101010df0wefwef')).toThrowError(
      new Error(`not a binary string`)
    );
  });
  test('chunks()', () => {
    const size = 8;
    const chunks = binary.chunks(size);

    expect(chunks.length).toEqual(16);

    chunks.forEach((chunk, i) => {
      const start = i * size,
        end = start + size;
      expect(chunk.str).toEqual(binary.str.slice(start, end));
    });
  });
  afterAll(() => {
    //it will be killed
    binary.kill();
    expect(binary.len).toEqual(0);
    expect(binary.str).toEqual('');
  });
});
