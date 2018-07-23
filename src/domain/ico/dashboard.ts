import { Column, ObjectID, ObjectIdColumn } from 'typeorm';

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
import { DashboardSettings } from './settings';

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

  @Column()
  token: Token;

  @Column()
  settings: DashboardSettings;

  @Column()
  deployState: string;

  @Column()
  deployStatus: string;

  @Column()
  createdAt: number;

  @Column()
  updatedAt: number;

  static create(data: any) {
    const o = new Dashboard();
    o.token = Token.create((data || {}).token);
    o.settings = DashboardSettings.create();
    o.createdAt = ~~(+new Date() / 1000);
    o.assignFrom(data);
    o.deployState = DeployState.NEW;
    o.deployStatus = '';
    return o;
  }

  assignFrom(data: any) {
    this.userId = data.userId;
    this.title = data.title;
    this.frontendUrl = data.frontendUrl;
    this.token = data.token;
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
