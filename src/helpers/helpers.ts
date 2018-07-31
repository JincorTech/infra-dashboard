import * as LRU from 'lru-cache';
import { ObjectID } from "mongodb";

export function base64encode(email: string): string {
  return Buffer.from(email, 'utf8').toString('base64');
}

export function base64decode(str) {
  return Buffer.from(unescape(str), 'base64').toString('utf8');
}

/**
 * Execute methods and cache it value by key.
 */
export class CacheMethodResult {
  private cache: LRU;

  /**
   * Init lru cache
   * @param maxCount lru cache size
   * @param ttl of cache record
   */
  constructor(maxCount: number, ttl: number) {
    this.cache = LRU({
      max: maxCount,
      maxAge: ttl
    });
  }

  /**
   * Run method or get from cache result.
   * @param key cache name
   * @param method to execute
   */
  async run<T>(key: string, method: () => Promise<T>): Promise<T> {
    if (this.cache.has(key)) {
      return this.cache.get(key);
    }
    return method().then(val => {
      this.cache.set(key, val);
      return val;
    });
  }
}
