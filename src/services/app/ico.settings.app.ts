import { injectable, inject } from "inversify";
import { ObjectID } from "mongodb";
import { IcoDashboardDaoType, IcoDashboardDao } from "../dao/ico.dashboard.dao";

export const IcoSettingsAppType = Symbol('IcoSettingsApp');

@injectable()
export class IcoSettingsApp {
  constructor(
    @inject(IcoDashboardDaoType) protected dashboardDao: IcoDashboardDao
  ) {
  }

  /**
   * @param id
   */
  async getBlockchainSettings(id: ObjectID): Promise<object> {
    const dashboard = await this.dashboardDao.getById(id);
    return dashboard.settingsBlockchain || {};
  }

  /**
   * @param id
   * @param data
   */
  async setBlockchainSettings(id: ObjectID, data: object): Promise<object> {
    const dashboard = await this.dashboardDao.getById(id);
    dashboard.settingsBlockchain.assignFrom(data);

    await this.dashboardDao.save(dashboard);

    return dashboard.settingsBlockchain;
  }

  /**
   * @param id
   */
  async getExchangeSettings(id: ObjectID): Promise<object> {
    const dashboard = await this.dashboardDao.getById(id);
    return dashboard.settingsExchange || {};
  }

  /**
   * @param id
   * @param data
   */
  async setExchangeSettings(id: ObjectID, data: object): Promise<object> {
    const dashboard = await this.dashboardDao.getById(id);
    dashboard.settingsExchange.assignFrom(data);

    if (dashboard.settingsExchange.enabled) {
      // dashboard.settingsExchange.provider == 'coinpayments'
    }

    await this.dashboardDao.save(dashboard);

    return dashboard.settingsExchange;
  }

  /**
   * @param id
   */
  async getKycSettings(id: ObjectID): Promise<object> {
    const dashboard = await this.dashboardDao.getById(id);
    return dashboard.settingsKyc || {};
  }

  /**
   * @param id
   * @param data
   */
  async setKycSettings(id: ObjectID, data: object): Promise<object> {
    const dashboard = await this.dashboardDao.getById(id);
    dashboard.settingsKyc.assignFrom(data);

    if (dashboard.settingsKyc.enabled) {
      // dashboard.settingsKyc.provider == 'jumio'
      // dashboard.settingsKyc.provider == 'shuf'
    }

    await this.dashboardDao.save(dashboard);

    return dashboard.settingsKyc;
  }

  /**
   * @param id
   */
  async getEmailSettings(id: ObjectID): Promise<object> {
    const dashboard = await this.dashboardDao.getById(id);
    return dashboard.settingsEmail || {};
  }

  /**
   * @param id
   * @param data
   */
  async setEmailSettings(id: ObjectID, data: object): Promise<object> {
    const dashboard = await this.dashboardDao.getById(id);
    dashboard.settingsEmail.assignFrom(data);

    // dashboard.settingsEmail.provider == 'mailgun'

    await this.dashboardDao.save(dashboard);

    return dashboard.settingsEmail;
  }

  /**
   * @param id
   */
  async getFeaturesSettings(id: ObjectID): Promise<object> {
    const dashboard = await this.dashboardDao.getById(id);
    return dashboard.settingsFeatures || {};
  }

  /**
   * @param id
   * @param data
   */
  async setFeaturesSettings(id: ObjectID, data: object): Promise<object> {
    const dashboard = await this.dashboardDao.getById(id);
    dashboard.settingsFeatures.assignFrom(data);

    await this.dashboardDao.save(dashboard);

    return dashboard.settingsFeatures;
  }

  /**
   * @param id
   */
  async applySettings(id: ObjectID): Promise<object> {
    return {
      id,
      status: 'pending'
    };
  }
}
