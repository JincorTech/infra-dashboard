import { injectable, inject } from "inversify";
import { IcoDashboardDaoType, IcoDashboardDao } from "../dao/ico.dashboard.dao";
import { Dashboard } from "../../domain/ico/dashboard";
import { ObjectID } from "typeorm";
import { outputTransform } from "./helpers";

export const IcoDashboardAppType = Symbol('IcoDashboardApp');

@injectable()
export class IcoDashboardApp {
  constructor(
    @inject(IcoDashboardDaoType) protected dashboardDao: IcoDashboardDao
  ) {
  }

  async getDashboards(): Promise<any[]> {
    return outputTransform(this.dashboardDao.getAllByUser(null));
  }

  async createDashboard(data: object): Promise<object> {
    const dashboard = new Dashboard();

    dashboard.assignFrom(data);

    return outputTransform(await this.dashboardDao.save(dashboard));
  }

  async getDashboardInfo(id: string): Promise<object> {
    return this.dashboardDao.getAllById(ObjectID.createFromHexString(id));
  }

  async setDashboardInfo(id: string, data: object): Promise<object> {
    const dashboard = await this.dashboardDao.getAllById(ObjectID.createFromHexString(id));

    dashboard.assignFrom(data);

    return outputTransform(dashboard);
  }
}
