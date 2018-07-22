import { Column, ObjectID, ObjectIdColumn } from 'typeorm';

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
  createdAt: number;

  @Column()
  updatedAt: number;

  static create(data: any) {
    const o = new Dashboard();
    o.token = Token.create((data || {}).token);
    o.settings = DashboardSettings.create();
    o.createdAt = ~~(+new Date() / 1000);
    o.assignFrom(data);
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
}
