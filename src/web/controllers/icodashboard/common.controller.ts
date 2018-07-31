import * as Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { inject } from 'inversify';
import { controller, httpPost, httpGet } from 'inversify-express-utils';

import { responseWith } from '../../helpers/responses';
import { IcoDashboardApp, IcoDashboardAppType } from '../../../services/app/ico.dashboards.app';
import { joiValidateMiddleware, validEthereumAddress } from '../../middlewares/request.validation';
import { objectIDFromRouteParam } from '../../helpers/ormhelpers';

const requestValidator = Joi.object().keys({
  title: Joi.string().required().disallow(''),
  frontendUrl: Joi.string().uri().required(),
  backendUrl: Joi.string().uri().required(),
  token: Joi.object().keys({
    address: validEthereumAddress().required(),
    symbol: Joi.string(),
    name: Joi.string(),
    decimals: Joi.number().valid(0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30)
  }).required()
});

/**
 * Dashboard controller
 */
/* istanbul ignore next */
@controller(
  '/api/v1/app/ico'
)
export class DashboardInfoController {
  constructor(
    @inject(IcoDashboardAppType) private dashboardApp: IcoDashboardApp
  ) { }

  /**
   * Get dashboards
   */
  @httpGet(
    '/'
  )
  async getDashboards(req: Request, res: Response): Promise<void> {
    responseWith(res, await this.dashboardApp.getDashboards());
  }

  /**
   * Create dashboard
   */
  @httpPost(
    '/',
    joiValidateMiddleware(requestValidator)
  )
  async createDashboard(req: Request, res: Response): Promise<void> {
    responseWith(res, await this.dashboardApp.createDashboard(req.body));
  }

  /**
   * Get dashboard info
   */
  @httpGet(
    '/:id'
  )
  async getDashboardInfo(req: Request, res: Response): Promise<void> {
    const model = await this.dashboardApp.getDashboardInfo(objectIDFromRouteParam(req.params.id));
    model
    responseWith(res, model);
  }

  /**
   * Set common dashboard info
   */
  @httpPost(
    '/:id',
    joiValidateMiddleware(requestValidator)
  )
  async setDashboardInfo(req: Request, res: Response): Promise<void> {
    responseWith(res, await this.dashboardApp.setDashboardInfo(objectIDFromRouteParam(req.params.id), req.body));
  }
}
