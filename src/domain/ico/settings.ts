import { Column } from 'typeorm';

import { SettingsBlockchain } from './settings.blockchain';
import { SettingsExchange } from './settings.exchange';
import { SettingsKyc } from './settings.kyc';
import { SettingsEmail } from './settings.email';
import { SettingsFeatures } from './settings.features';

export class DashboardSettings {
  @Column()
  blockchain: SettingsBlockchain;

  @Column()
  exchange: SettingsExchange;

  @Column()
  kyc: SettingsKyc;

  @Column()
  email: SettingsEmail;

  @Column()
  features: SettingsFeatures;

  static create() {
    const o = new DashboardSettings();
    o.blockchain = SettingsBlockchain.create({});
    o.exchange = SettingsExchange.create({});
    o.kyc = SettingsKyc.create({});
    o.features = SettingsFeatures.create({});
    return o;
  }
}
