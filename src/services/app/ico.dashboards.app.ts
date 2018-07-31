import { injectable, inject } from "inversify";
import { IcoDashboardDaoType, IcoDashboardDao } from "../dao/ico.dashboard.dao";
import { Dashboard } from "../../domain/ico/dashboard";
import { ObjectID } from "mongodb";

export const IcoDashboardAppType = Symbol('IcoDashboardApp');

@injectable()
export class IcoDashboardApp {
  constructor(
    @inject(IcoDashboardDaoType) protected dashboardDao: IcoDashboardDao
  ) {
  }

  async getDashboards(): Promise<Dashboard[]> {
    return this.dashboardDao.getAllByUser(null);
  }

  async createDashboard(data: object): Promise<Dashboard> {
    const dashboard = Dashboard.create(data);

    dashboard.assignFrom(data);

    return await this.dashboardDao.save(dashboard);
  }

  async getDashboardInfo(id: ObjectID): Promise<Dashboard> {
    return await this.dashboardDao.getById(id);
  }

  async setDashboardInfo(id: ObjectID, data: object): Promise<Dashboard> {
    const dashboard = await this.dashboardDao.getById(id);

    dashboard.assignFrom(data);

    await this.dashboardDao.save(dashboard);

    return dashboard;
  }
}
