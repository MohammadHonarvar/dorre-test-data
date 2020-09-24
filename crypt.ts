import crypto from 'crypto';

const key = 'testFotTest';
// encrypt returns base64-encoded ciphertext
export const encrypt = (str: string) => {
  // Hint: the `iv` should be unique (but not necessarily random).
  // `randomBytes` here are (relatively) slow but convenient for
  // demonstration.
  const iv = crypto.randomBytes(8).toString('utf-8');
  const cipher = crypto.createCipheriv('aes128', key, iv);

  // Hint: Larger inputs (it's GCM, after all!) should use the stream API
  let enc = cipher.update(str, 'utf8', 'base64');
  enc += cipher.final('base64');
  return [enc, iv];
};

// decrypt decodes base64-encoded ciphertext into a utf8-encoded string
export const decrypt = (enc: string, iv: string) => {
  const decipher = crypto.createDecipheriv('aes128', key, iv);
  // decipher.setAuthTag(authTag);
  let str = decipher.update(enc, 'base64', 'utf8');
  str += decipher.final('utf8');
  return str;
};
