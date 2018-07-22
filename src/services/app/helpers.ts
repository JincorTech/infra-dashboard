type TransformMethod = (obj: any) => any;

/**
 * @param obj
 * @param method
 */
export function transformDeepObjectKeysFn(obj: any, method: TransformMethod): any {
  if (obj === null || typeof obj === 'undefined') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(o =>
      transformDeepObjectKeysFn(o, method)
    );
  }

  if (typeof obj === 'object') {
    Object.keys(obj).forEach(attrName => {
        obj[attrName] = transformDeepObjectKeysFn(
          obj[attrName],
          method
        );
      });

    return method(obj);
  }

  return obj;
}

/**
 * @param method
 */
export function transformDeepObjectKeys(method: TransformMethod): TransformMethod {
  return obj => transformDeepObjectKeysFn(obj, method)
}

/**
 * @TODO: Implement AES ciphering of fields
 * @param key
 * @param isDecode
 */
export function mapCipher(key: Buffer, isDecode: boolean): TransformMethod {
  return obj => {
    Object.keys(obj).filter(name => name.indexOf('Cipher') === name.length - 6).forEach(name => {
      const decryptedName = name.slice(0, name.length - 6);

      if (!obj[decryptedName]) {
        return obj[decryptedName];
      }

      if (isDecode) {
        obj[decryptedName] = Buffer.from(JSON.stringify(obj[name]), 'utf8')
          .toString('base64');
      } else {
        obj[name] = JSON.parse(Buffer.from(decryptedName, 'base64')
          .toString('utf8'));
      }
    });
    return obj;
  }
}

/**
 *
 */
export function transformOmitCipherFields(): TransformMethod {
  return obj => {
    Object.keys(obj).filter(name => name.indexOf('Cipher') === name.length - 6).forEach(name => {
      delete obj[name];
    });
    return obj;
  }
}

/**
 * @param methods
 */
export function combineTransforms(...methods: TransformMethod[]): TransformMethod {
  return obj => methods.reduce((p, c) => c(p), obj);
}

export const beforeStoreTransform = transformDeepObjectKeys(
  combineTransforms(
    mapCipher(Buffer.from(''), true),
    transformOmitCipherFields()
  )
);

export const outputTransform = transformDeepObjectKeys(
  combineTransforms(
    mapCipher(Buffer.from(''), false),
    transformOmitCipherFields()
  )
);
