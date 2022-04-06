import randomBytes from 'randombytes';
import createHash from 'create-hash';
import { pbkdf2Sync } from 'pbkdf2';

export type BufferType = string | Buffer | createHash.TypedArray | DataView;

export { randomBytes };

export function sha256(...buffers: BufferType[]): Buffer {
  const hash = createHash('sha256');
  for (const buffer of buffers) {
    hash.update(buffer);
  }
  return hash.digest();
}

export function hmacSHA512PBKDF2(
  password: BufferType,
  salt: BufferType
): Buffer {
  return pbkdf2Sync(password, salt, 2048, 64, 'sha512');
}
