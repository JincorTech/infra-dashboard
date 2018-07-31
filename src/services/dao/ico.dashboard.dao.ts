import { getConnection, getMongoManager, ObjectID } from 'typeorm';
import { injectable } from 'inversify';

import { Dashboard } from '../../domain/ico/dashboard';
import { SettingsBlockchain } from '../../domain/ico/settings.blockchain';
import { SettingsFeatures } from '../../domain/ico/settings.features';
import { SettingsEmail } from '../../domain/ico/settings.email';
import { SettingsKyc } from '../../domain/ico/settings.kyc';
import { SettingsExchange } from '../../domain/ico/settings.exchange';

export const IcoDashboardDaoType = Symbol('IcoDashboardDao');

/**
 *
 */
@injectable()
export class IcoDashboardDao {
  /**
   * @param userId
   */
  async getAllByUser(userId: ObjectID): Promise<Dashboard[]> {
    return getConnection().getMongoRepository(Dashboard).find({
      where: {
        // userId
      },
      order: {
        title: 'ASC'
      }
    });
  }

  /**
   * @param id
   */
  async getById(id: ObjectID): Promise<Dashboard> {
    const dashboard = await getConnection().getMongoRepository(Dashboard).findOneOrFail(id);
    if (!dashboard.settingsBlockchain) {
      dashboard.settingsBlockchain = SettingsBlockchain.create();
    }
    if (!dashboard.settingsExchange) {
      dashboard.settingsExchange = SettingsExchange.create();
    }
    if (!dashboard.settingsEmail) {
      dashboard.settingsEmail = SettingsEmail.create();
    }
    if (!dashboard.settingsFeatures) {
      dashboard.settingsFeatures = SettingsFeatures.create();
    }
    if (!dashboard.settingsKyc) {
      dashboard.settingsKyc = SettingsKyc.create();
    }

    return dashboard;
  }

  /**
   * @param obj
   */
  async save(obj: Dashboard): Promise<Dashboard> {
    return getConnection().getMongoRepository(Dashboard).save(obj);
  }
}
