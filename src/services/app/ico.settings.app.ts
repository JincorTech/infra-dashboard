import { injectable, inject } from "inversify";
import { IcoDashboardSettingsDaoType, IcoDashboardSettingsDao } from "../dao/ico.dashboard.settings.dao";
import { ObjectID } from "typeorm";
import { outputTransform } from "./helpers";

export const IcoSettingsAppType = Symbol('IcoSettingsApp');

@injectable()
export class IcoSettingsApp {
  constructor(
    @inject(IcoDashboardSettingsDaoType) protected dashboardSettingsDao: IcoDashboardSettingsDao
  ) {
  }

  async getBlockchainSettings(id: string): Promise<object> {
    const settings = await this.dashboardSettingsDao.getByDashboardId(ObjectID.createFromHexString(id));
    return outputTransform(settings.blockchain);
  }

  async setBlockchainSettings(id: string, data: object): Promise<object> {
    const objId = ObjectID.createFromHexString(id);

    const settings = await this.dashboardSettingsDao.getByDashboardId(objId);
    settings.blockchain.assignFrom(data);

    await this.dashboardSettingsDao.save(objId, settings);

    return outputTransform(settings.blockchain);
  }

  async getExchangeSettings(id: string): Promise<object> {
    const settings = await this.dashboardSettingsDao.getByDashboardId(ObjectID.createFromHexString(id));
    return outputTransform(settings.exchange);
  }

  async setExchangeSettings(id: string, data: object): Promise<object> {
    const objId = ObjectID.createFromHexString(id);

    const settings = await this.dashboardSettingsDao.getByDashboardId(objId);
    settings.exchange.assignFrom(data);
    if (settings.exchange.enabled) {
      // settings.exchange.provider == 'coinpayments'
    }

    await this.dashboardSettingsDao.save(objId, settings);

    return outputTransform(settings.exchange);
  }

  async getKycSettings(id: string): Promise<object> {
    const settings = await this.dashboardSettingsDao.getByDashboardId(ObjectID.createFromHexString(id));
    return outputTransform(settings.kyc);
  }

  async setKycSettings(id: string, data: object): Promise<object> {
    const objId = ObjectID.createFromHexString(id);

    const settings = await this.dashboardSettingsDao.getByDashboardId(objId);
    settings.kyc.assignFrom(data);
    if (settings.kyc.enabled) {
      // settings.kyc.provider == 'jumio'
      // settings.kyc.provider == 'shuf'
    }

    await this.dashboardSettingsDao.save(objId, settings);

    return outputTransform(settings.kyc);
  }

  async getEmailSettings(id: string): Promise<object> {
    const settings = await this.dashboardSettingsDao.getByDashboardId(ObjectID.createFromHexString(id));
    return outputTransform(settings.email);
  }

  async setEmailSettings(id: string, data: object): Promise<object> {
    const objId = ObjectID.createFromHexString(id);

    const settings = await this.dashboardSettingsDao.getByDashboardId(objId);
    settings.email.assignFrom(data);
    // settings.email.provider == 'mailgun'

    await this.dashboardSettingsDao.save(objId, settings);

    return outputTransform(settings.email);
  }

  async getFeaturesSettings(id: string): Promise<object> {
    const settings = await this.dashboardSettingsDao.getByDashboardId(ObjectID.createFromHexString(id));
    return outputTransform(settings.features);
  }

  async setFeaturesSettings(id: string, data: object): Promise<object> {
    const objId = ObjectID.createFromHexString(id);

    const settings = await this.dashboardSettingsDao.getByDashboardId(objId);
    settings.features.assignFrom(data);

    await this.dashboardSettingsDao.save(objId, settings);

    return outputTransform(settings.features);
  }

  async applySettings(id: string): Promise<object> {
    return outputTransform({
      id: "d28e05de-242f-48c0-bf3d-ae2a5547499b",
      status: "pending"
    });
  }
}
