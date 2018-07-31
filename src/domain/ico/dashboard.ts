import { Column, ObjectID, ObjectIdColumn, Entity } from 'typeorm';

export enum DeployState {
  NEW = 'new',
  NEW_PENDING = 'new_pending',
  NEW_ERROR = 'new_error',
  DEPLOYED = 'deployed',
  UPDATE_PENDING = 'update_pending',
  UPDATE_ERROR = 'update_error'
}

const allowedDeployStateTransition = {
  [DeployState.NEW]: [DeployState.NEW_PENDING, DeployState.NEW_ERROR],
  [DeployState.NEW_PENDING]: [DeployState.DEPLOYED, DeployState.NEW_ERROR],
  [DeployState.NEW_ERROR]: [DeployState.NEW_PENDING],
  [DeployState.DEPLOYED]: [DeployState.UPDATE_PENDING, DeployState.UPDATE_ERROR],
  [DeployState.UPDATE_PENDING]: [DeployState.DEPLOYED, DeployState.UPDATE_ERROR],
  [DeployState.UPDATE_ERROR]: [DeployState.UPDATE_PENDING],
};

import { Token } from './token';
import { SettingsBlockchain } from './settings.blockchain';
import { SettingsExchange } from './settings.exchange';
import { SettingsKyc } from './settings.kyc';
import { SettingsEmail } from './settings.email';
import { SettingsFeatures } from './settings.features';

@Entity()
export class Dashboard {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  userId: string;

  @Column()
  title: string;

  @Column()
  frontendUrl: string;

  @Column()
  backendUrl: string;

  @Column(type => Token)
  token: Token;

  @Column(type => SettingsBlockchain)
  settingsBlockchain: SettingsBlockchain;

  @Column(type => SettingsExchange)
  settingsExchange: SettingsExchange;

  @Column(type => SettingsKyc)
  settingsKyc: SettingsKyc;

  @Column(type => SettingsEmail)
  settingsEmail: SettingsEmail;

  @Column(type => SettingsFeatures)
  settingsFeatures: SettingsFeatures;

  @Column()
  deployState: string;

  @Column()
  deployStatus: string;

  @Column()
  createdAt: number;

  @Column()
  updatedAt: number;

  static create(data: any = {}) {
    const o = new Dashboard();
    o.token = Token.create(data.token);

    o.settingsBlockchain = SettingsBlockchain.create({});
    o.settingsExchange = SettingsExchange.create({});
    o.settingsKyc = SettingsKyc.create({});
    o.settingsEmail = SettingsEmail.create({});
    o.settingsFeatures = SettingsFeatures.create({});

    o.createdAt = ~~(+new Date() / 1000);
    o.assignFrom(data);
    o.deployState = DeployState.NEW;
    o.deployStatus = '';
    return o;
  }

  assignFrom(data: any = {}) {
    this.userId = data.userId;
    this.title = data.title;
    this.frontendUrl = data.frontendUrl;
    this.token.assignFrom(data.token);
    this.backendUrl = data.backendUrl;
    this.updatedAt = ~~(+new Date() / 1000);
  }

  setStateAndStatus(state: DeployState, status: string) {
    this.deployStatus = status;
    if (
      !allowedDeployStateTransition[this.deployState] ||
      allowedDeployStateTransition[this.deployState].indexOf(state) < 0
    ) {
      throw new Error('Invalid deploy state requested');
    }
    this.deployState = state;
  }
}
