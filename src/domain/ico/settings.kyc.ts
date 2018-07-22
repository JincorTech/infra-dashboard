import { Column } from 'typeorm';

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

  static create(data: any) {
    const o = new SettingsKyc();
    o.assignFrom(data);
    o.settings = {};
    return o;
  }

  assignFrom(data: any) {
    this.enabled = data.enabled;
    this.defaultStatus = data.defaultStatus;
    this.provider = data.provider;
    this.settings = data.settings;
  }
}
