import { Column } from 'typeorm';

export class SettingsEmail {
  @Column()
  public templateFolder: string;

  @Column()
  public emailFrom: string;

  @Column()
  public emailReferral: string;

  @Column()
  public provider: string;

  @Column()
  public settingsCipher: string;

  public settings: any;

  static create(data: any) {
    const o = new SettingsEmail();
    o.assignFrom(data);
    o.settings = o.settings || {};
    return o;
  }

  assignFrom(data: any) {
    this.templateFolder = data.templateFolder;
    this.emailFrom = data.emailFrom;
    this.emailReferral = data.emailReferral;
    this.provider = data.provider;
    this.settings = data.settings;
  }
}
