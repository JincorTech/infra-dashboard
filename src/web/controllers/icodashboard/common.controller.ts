import * as Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { inject } from 'inversify';
import { controller, httpPost, httpGet } from 'inversify-express-utils';

import { responseWith } from '../../helpers/responses';
import { IcoDashboardApp, IcoDashboardAppType } from '../../../services/app/ico.dashboards.app';

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
    '/'
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
    responseWith(res, await this.dashboardApp.getDashboardInfo(req.params.id));
  }

  /**
   * Set common dashboard info
   */
  @httpPost(
    '/:id'
  )
  async setDashboardInfo(req: Request, res: Response): Promise<void> {
    responseWith(res, await this.dashboardApp.setDashboardInfo(req.params.id, req.body));
  }
}
