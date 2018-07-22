import { getConnection, getMongoManager, ObjectID } from 'typeorm';
import { injectable } from 'inversify';

import { Dashboard } from '../../domain/ico/dashboard';
import { DashboardSettings } from '../../domain/ico/settings';

export const IcoDashboardSettingsDaoType = Symbol('IcoDashboardSettingsDao');

/**
 *
 */
@injectable()
export class IcoDashboardSettingsDao {
  /**
   * @param id
   */
  async getByDashboardId(dashboardId: ObjectID): Promise<DashboardSettings> {
    const result = await getConnection().getMongoRepository(Dashboard).findOneOrFail(dashboardId);
    return result.settings;
  }

  /**
   * @param obj
   */
  async save(dashboardId: ObjectID, obj: DashboardSettings): Promise<Dashboard> {
    const dashboard = await getConnection()
      .getMongoRepository(Dashboard).findOneOrFail(dashboardId);
    dashboard.settings = obj;
    return getConnection().getMongoRepository(Dashboard).save(dashboard);
  }
}
