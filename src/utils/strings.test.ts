import {
  hexStrToBinaryStr,
  binaryStrToHexStr,
  unicodeNormalize,
} from './strings';

describe('strings', () => {
  test('hexStrToBinaryStr()', () => {
    expect(hexStrToBinaryStr('2ACE6ABDB77')).toEqual(
      '00101010110011100110101010111101101101110111'
    );
    expect(() => hexStrToBinaryStr('2ACE6ABDB77ZZYY')).toThrowError(
      new Error(`parse error`)
    );
  });
  test('binaryStrToHexStr()', () => {
    const binary = hexStrToBinaryStr('0123456789abcdef');
    expect(binaryStrToHexStr(binary)).toEqual('0123456789abcdef');
    expect(
      binaryStrToHexStr(
        '001010101100111001101010101111011011011101111001'
      ).toUpperCase()
    ).toEqual('2ACE6ABDB779');
    expect(() => binaryStrToHexStr('0201020310230')).toThrowError(
      new Error(`parse error`)
    );
  });
  test('unicodeNormalize()', () => {
    expect(unicodeNormalize('김화겸 이도하 AFWEQWE12315234r')).toEqual(
      '김화겸 이도하 AFWEQWE12315234r'.normalize('NFKD')
    );
  });
});
