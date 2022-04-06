export type UnicodeType = 'NFC' | 'NFD' | 'NFKC' | 'NFKD';

export function unicodeNormalize(
  s: string,
  type: UnicodeType = 'NFKD'
): string {
  return s.normalize(type);
}

export function bytesToBinaryStr(bytes: Buffer): string {
  let binary = '';
  bytes.forEach((byte: number) => {
    binary += byte.toString(2).padStart(8, '0');
  });
  return binary;
}

export function hexStrToBinaryStr(hex: string): string {
  hex = hex.replace('0x', '').toLowerCase();
  let binary = '';
  for (const ch of hex) {
    switch (ch) {
      case '0':
        binary += '0000';
        break;
      case '1':
        binary += '0001';
        break;
      case '2':
        binary += '0010';
        break;
      case '3':
        binary += '0011';
        break;
      case '4':
        binary += '0100';
        break;
      case '5':
        binary += '0101';
        break;
      case '6':
        binary += '0110';
        break;
      case '7':
        binary += '0111';
        break;
      case '8':
        binary += '1000';
        break;
      case '9':
        binary += '1001';
        break;
      case 'a':
        binary += '1010';
        break;
      case 'b':
        binary += '1011';
        break;
      case 'c':
        binary += '1100';
        break;
      case 'd':
        binary += '1101';
        break;
      case 'e':
        binary += '1110';
        break;
      case 'f':
        binary += '1111';
        break;
      default:
        throw new Error(`parse error`);
    }
  }

  return binary;
}

export function stringToChunkArray(s: string, size: number) {
  const ret = [];
  for (let i = 0; i < s.length; i += size) {
    ret.push(s.slice(i, i + size));
  }
  return ret;
}
