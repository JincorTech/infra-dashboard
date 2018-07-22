import * as Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { inject } from 'inversify';
import { controller, httpPost, httpGet } from 'inversify-express-utils';

import { responseWith } from '../../helpers/responses';
import { IcoSettingsAppType, IcoSettingsApp } from '../../../services/app/ico.settings.app';
import { joiValidateMiddleware } from '../../middlewares/request.validation';

/**
 * Settings controller
 */
/* istanbul ignore next */
@controller(
  '/api/v1/app/ico/:id/settings'
)
export class DashboardSettingsController {
  constructor(
    @inject(IcoSettingsAppType) private settingsApp: IcoSettingsApp
  ) { }

  /**
   * Get blockchain settings
   */
  @httpGet(
    '/blockchain'
  )
  async getBlockchainSettings(req: Request, res: Response): Promise<void> {
    responseWith(res, await this.settingsApp.getBlockchainSettings(req.params.id));
  }

  /**
   * Set blockchain settings
   */
  @httpPost(
    '/blockchain',
    joiValidateMiddleware(Joi.object().keys({
      nodeUrl: Joi.string().required(),
      defaultInvestGas: Joi.string(),
      purchaseGasLimit: Joi.string(),
      ethStartScanBlock: Joi.string()
    }))
  )
  async setBlockchainSettings(req: Request, res: Response): Promise<void> {
    responseWith(res, await this.settingsApp.setBlockchainSettings(req.params.id, req.body));
  }

  /**
   * Get exchange settings
   */
  @httpGet(
    '/exchange'
  )
  async getExchangeSettings(req: Request, res: Response): Promise<void> {
    responseWith(res, await this.settingsApp.getExchangeSettings(req.params.id));
  }

  /**
   * Set exchange settings
   */
  @httpPost(
    '/exchange',
    joiValidateMiddleware(Joi.object().keys({
      enabled: Joi.boolean().required(),
      provider: Joi.string(),
      settings: Joi.object()
    }))
  )
  async setExchangeSettings(req: Request, res: Response): Promise<void> {
    responseWith(res, await this.settingsApp.setExchangeSettings(req.params.id, req.body));
  }

  /**
   * Get kyc settings
   */
  @httpGet(
    '/kyc'
  )
  async getKycSettings(req: Request, res: Response): Promise<void> {
    responseWith(res, await this.settingsApp.getKycSettings(req.params.id));
  }

  /**
   * Set kyc settings
   */
  @httpPost(
    '/kyc',
    joiValidateMiddleware(Joi.object().keys({
      enabled: Joi.boolean().required(),
      defaultStatus: Joi.string().required(),
      provider: Joi.string(),
      settings: Joi.object()
    }))
  )
  async setKycSettings(req: Request, res: Response): Promise<void> {
    responseWith(res, await this.settingsApp.setKycSettings(req.params.id, req.body));
  }

  /**
   * Get email settings
   */
  @httpGet(
    '/email'
  )
  async getEmailSettings(req: Request, res: Response): Promise<void> {
    responseWith(res, await this.settingsApp.getEmailSettings(req.params.id));
  }

  /**
   * Set email settings
   */
  @httpPost(
    '/email',
    joiValidateMiddleware(Joi.object().keys({
      enabled: Joi.boolean().required(),
      defaultStatus: Joi.string().required(),
      provider: Joi.string(),
      settings: Joi.object()
    }))
  )
  async setEmailSettings(req: Request, res: Response): Promise<void> {
    responseWith(res, await this.settingsApp.setEmailSettings(req.params.id, req.body));
  }

  /**
   * Get features settings
   */
  @httpGet(
    '/features'
  )
  async getFeaturesSettings(req: Request, res: Response): Promise<void> {
    responseWith(res, await this.settingsApp.getFeaturesSettings(req.params.id));
  }

  /**
   * Set features settings
   */
  @httpPost(
    '/features',
    joiValidateMiddleware(Joi.object().keys({
      icoAddress: Joi.string(),
      icoEndTimestamp: Joi.string(),
      whitelistAddress: Joi.string(),
      whitelistPk: Joi.string()
    }))
  )
  async setFeaturesSettings(req: Request, res: Response): Promise<void> {
    responseWith(res, await this.settingsApp.setFeaturesSettings(req.params.id, req.body));
  }

  /**
   * Apply settings
   */
  @httpPost(
    '/apply',
    joiValidateMiddleware(Joi.object().keys({
      id: Joi.string().required()
    }))
  )
  async applySettings(req: Request, res: Response): Promise<void> {
    responseWith(res, await this.settingsApp.applySettings(req.body));
  }
}
