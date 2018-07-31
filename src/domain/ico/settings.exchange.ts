import { Column } from 'typeorm';

export class SettingsExchange {
  @Column()
  public enabled: boolean;

  @Column()
  public provider: string;

  @Column()
  public settingsCipher: string;

  public settings: any;

  static create(data: any = {}) {
    const o = new SettingsExchange();
    o.assignFrom(data);
    o.settings = o.settings || {};
    return o;
  }

  assignFrom(data: any = {}) {
    this.provider = data.provider;
    this.settings = data.settings;
  }
}
