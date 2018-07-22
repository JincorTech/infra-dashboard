import * as crypto from 'crypto';

/**
 * @param text
 */
export function getSha256Hash(text: Buffer): Buffer {
  return crypto.createHash('sha256').update(text).digest();
}

export function getSha512Hash(text: Buffer): Buffer {
  return crypto.createHash('sha512').update(text).digest();
}

export function getHmacSha256(key: Buffer, msg: Buffer): Buffer {
  return crypto.createHmac('sha256', key).update(msg).digest();
}

export function getHmacSha512(key: Buffer, msg: Buffer): Buffer {
  return crypto.createHmac('sha512', key).update(msg).digest();
}

/**
 * @param inputBuffer
 * @param keys
 */
export function encryptAes256ctr(inputBuffer: Buffer, keys: Buffer[]): Buffer {
  let outBuffer: Buffer;
  keys.map((key) => {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-ctr', getSha256Hash(key), iv);
    outBuffer = Buffer.concat([cipher.update(inputBuffer), cipher.final()]);
    inputBuffer = Buffer.concat([iv, outBuffer]);
  });
  return inputBuffer;
}

/**
 * @param inputBuffer
 * @param keys
 */
export function decryptAes256ctr(inputBuffer: Buffer, keys: Buffer[]): Buffer {
  let outBuffer: Buffer;
  keys.map((key) => {
    const iv = inputBuffer.slice(0, 16);
    const decipher = crypto.createDecipheriv('aes-256-ctr', getSha256Hash(key), iv);
    outBuffer = Buffer.concat([decipher.update(inputBuffer.slice(16)), decipher.final()]);
    inputBuffer = Buffer.from(outBuffer);
  });
  return inputBuffer;
}
