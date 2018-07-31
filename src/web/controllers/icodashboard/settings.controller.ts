import * as Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { inject } from 'inversify';
import { controller, httpPost, httpGet } from 'inversify-express-utils';

import { responseWith } from '../../helpers/responses';
import { IcoSettingsAppType, IcoSettingsApp } from '../../../services/app/ico.settings.app';
import { joiValidateMiddleware, validEthereumAddress, validEthereumPk } from '../../middlewares/request.validation';
import { getAllowedKycStatuses } from '../../../domain/ico/settings.kyc';
import { objectIDFromRouteParam } from '../../helpers/ormhelpers';

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
    responseWith(res, await this.settingsApp.getBlockchainSettings(
      objectIDFromRouteParam(req.params.id)));
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
    responseWith(res, await this.settingsApp.setBlockchainSettings(
      objectIDFromRouteParam(req.params.id), req.body));
  }

  /**
   * Get exchange settings
   */
  @httpGet(
    '/exchange'
  )
  async getExchangeSettings(req: Request, res: Response): Promise<void> {
    responseWith(res, await this.settingsApp.getExchangeSettings(
      objectIDFromRouteParam(req.params.id)));
  }

  /**
   * Set exchange settings
   */
  @httpPost(
    '/exchange',
    joiValidateMiddleware(Joi.object().keys({
      enabled: Joi.boolean().required(),
      provider: Joi.string().allow(['coinpayments']),
      settings: Joi.alternatives()
        .when('provider', {
          is: 'coinpayments',
          then: Joi.object().keys({
            apiKey: Joi.string().required().disallow(''),
            apiSecret: Joi.string().required().disallow(''),
            apiCurrency1: Joi.string().required().allow(['ETH', 'BTC', 'LTC', 'BCH', 'XRP']), // etc.?
            apiMerchantId: Joi.string().required().disallow(''),
            apiMerchantSecret: Joi.string().required().disallow('')
          }).required(),
          otherwise: Joi.empty()
        })
    }))
  )
  async setExchangeSettings(req: Request, res: Response): Promise<void> {
    responseWith(res, await this.settingsApp.setExchangeSettings(
      objectIDFromRouteParam(req.params.id), req.body));
  }

  /**
   * Get kyc settings
   */
  @httpGet(
    '/kyc'
  )
  async getKycSettings(req: Request, res: Response): Promise<void> {
    responseWith(res, await this.settingsApp.getKycSettings(
      objectIDFromRouteParam(req.params.id)));
  }

  /**
   * Set kyc settings
   */
  @httpPost(
    '/kyc',
    joiValidateMiddleware(Joi.object().keys({
      enabled: Joi.boolean().required(),
      defaultStatus: Joi.string().allow(getAllowedKycStatuses()).required(),
      provider: Joi.string().allow(''),
      settings: Joi.alternatives()
        .when('provider', {
          is: 'jumio',
          then: Joi.object().keys({

          }).required()
        })
        .when('provider', {
          is: 'shufti',
          then: Joi.object().keys({

          }).required(),
          otherwise: Joi.empty()
        })
    }))
  )
  async setKycSettings(req: Request, res: Response): Promise<void> {
    responseWith(res, await this.settingsApp.setKycSettings(
      objectIDFromRouteParam(req.params.id), req.body));
  }

  /**
   * Get email settings
   */
  @httpGet(
    '/email'
  )
  async getEmailSettings(req: Request, res: Response): Promise<void> {
    responseWith(res, await this.settingsApp.getEmailSettings(
      objectIDFromRouteParam(req.params.id)));
  }

  /**
   * Set email settings
   */
  @httpPost(
    '/email',
    joiValidateMiddleware(Joi.object().keys({
      provider: Joi.string().required(),
      settings: Joi.alternatives()
        .when('provider', {
          is: 'mailgun',
          then: Joi.object().keys({

          }).required()
        })
        .when('provider', {
          is: 'mailjet',
          then: Joi.object().keys({

          }).required(),
          otherwise: Joi.forbidden()
        })
    }))
  )
  async setEmailSettings(req: Request, res: Response): Promise<void> {
    responseWith(res, await this.settingsApp.setEmailSettings(
      objectIDFromRouteParam(req.params.id), req.body));
  }

  /**
   * Get features settings
   */
  @httpGet(
    '/features'
  )
  async getFeaturesSettings(req: Request, res: Response): Promise<void> {
    responseWith(res, await this.settingsApp.getFeaturesSettings(
      objectIDFromRouteParam(req.params.id)));
  }

  /**
   * Set features settings
   */
  @httpPost(
    '/features',
    joiValidateMiddleware(Joi.object().keys({
      icoAddress: validEthereumAddress(),
      icoEndTimestamp: Joi.string(),
      whitelistAddress: validEthereumAddress(),
      whitelistPk: validEthereumPk()
    }))
  )
  async setFeaturesSettings(req: Request, res: Response): Promise<void> {
    responseWith(res, await this.settingsApp.setFeaturesSettings(
      objectIDFromRouteParam(req.params.id), req.body));
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
