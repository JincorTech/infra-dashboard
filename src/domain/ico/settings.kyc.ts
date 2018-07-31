import { Column } from 'typeorm';

export enum KycStatus {
  notVerified = 'not_verified',
  verified = 'verified',
  failed = 'failed',
  pending = 'pending'
}

export function getAllowedKycStatuses() {
  return [KycStatus.notVerified, KycStatus.verified, KycStatus.failed];
}

export class SettingsKyc {
  @Column()
  public enabled: boolean;

  @Column()
  public defaultStatus: string;

  @Column()
  public provider: string;

  @Column()
  public settingsCipher: string;

  public settings: any;

  static create(data: any = {}) {
    const o = new SettingsKyc();
    o.assignFrom(data);
    o.defaultStatus = o.defaultStatus || KycStatus.notVerified;
    o.settings = {};
    return o;
  }

  assignFrom(data: any = {}) {
    this.enabled = data.enabled;
    this.defaultStatus = data.defaultStatus;
    this.provider = data.provider;
    this.settings = data.settings;
  }
}
