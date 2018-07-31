import { Column } from 'typeorm';

export class SettingsFeatures {
  @Column()
  public icoAddress: string;

  @Column()
  public icoEndTimestamp: string;

  @Column()
  public whitelistAddress: string;

  @Column()
  public whitelistPkCipher: string;

  public whitelistPk: string;

  static create(data: any = {}) {
    const o = new SettingsFeatures();
    o.assignFrom(data);
    return o;
  }

  assignFrom(data: any = {}) {
    this.icoAddress = data.icoAddress;
    this.icoEndTimestamp = data.icoEndTimestamp;
    this.whitelistAddress = data.whitelistAddress;
    this.whitelistPk = data.whitelistPk;
  }
}
