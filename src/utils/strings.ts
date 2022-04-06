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

export function binaryStrToHexStr(binary: string): string {
  let hex = '';
  for (const ch of stringToChunkArray(binary, 4)) {
    switch (ch) {
      case '0000':
        hex += '0';
        break;
      case '0001':
        hex += '1';
        break;
      case '0010':
        hex += '2';
        break;
      case '0011':
        hex += '3';
        break;
      case '0100':
        hex += '4';
        break;
      case '0101':
        hex += '5';
        break;
      case '0110':
        hex += '6';
        break;
      case '0111':
        hex += '7';
        break;
      case '1000':
        hex += '8';
        break;
      case '1001':
        hex += '9';
        break;
      case '1010':
        hex += 'a';
        break;
      case '1011':
        hex += 'b';
        break;
      case '1100':
        hex += 'c';
        break;
      case '1101':
        hex += 'd';
        break;
      case '1110':
        hex += 'e';
        break;
      case '1111':
        hex += 'f';
        break;
      default:
        throw new Error(`parse error`);
    }
  }

  return hex;
}

export function stringToChunkArray(s: string, size: number) {
  const ret = [];
  for (let i = 0; i < s.length; i += size) {
    ret.push(s.slice(i, i + size));
  }
  return ret;
}
