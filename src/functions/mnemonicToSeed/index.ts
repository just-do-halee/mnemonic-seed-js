import { CRYPTO } from '../../utils';
import { Mnemonic } from '../entropyToMnemonic';

// -----------------------------

const { hmacSHA512PBKDF2 } = CRYPTO;

// -----------------------------

export type WordList = 'english' | 'korean';

export default function (mnemonic: Mnemonic, passphrase: string = ''): Buffer {
  return hmacSHA512PBKDF2(mnemonic.toString(), 'mnemonic' + passphrase);
}
