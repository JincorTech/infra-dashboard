import { Column } from 'typeorm';

import * as web3utils from 'web3-utils';

export class Token {
  @Column()
  public address: string;

  @Column()
  public symbol: string;

  @Column()
  public name: string;

  @Column()
  public decimals: number;

  @Column()
  public priceUsd: number;

  static create(data: any = {}) {
    const o = new Token();
    o.assignFrom(data);
    o.decimals = data.decimals || 18;
    o.priceUsd = data.priceUsd || 1;
    return o;
  }

  assignFrom(data: any = {}) {
    this.address = data.address && web3utils.toChecksumAddress(data.address) || '';
    this.name = data.name;
    this.symbol = data.symbol;
    this.decimals = data.decimals;
    this.priceUsd = data.priceUsd;
  }
}
