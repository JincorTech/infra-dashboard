import * as Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { inject } from 'inversify';
import { controller, httpPost, httpGet } from 'inversify-express-utils';

import { responseWith } from '../../helpers/responses';
import { IcoMonitorAppType, IcoMonitorApp } from '../../../services/app/ico.monitor.app';
import { objectIDFromRouteParam } from '../../helpers/ormhelpers';

/**
 * Monitor controller
 */
/* istanbul ignore next */
@controller(
  '/api/v1/app/ico/:id/info'
)
export class DashboardMonitorController {
  constructor(
    @inject(IcoMonitorAppType) private monitorApp: IcoMonitorApp
  ) { }

  /**
   * Get dashboard monitor info
   */
  @httpGet(
    '/monitor'
  )
  async getDashboards(req: Request, res: Response): Promise<void> {
    responseWith(res, await this.monitorApp.getMonitorInfo(objectIDFromRouteParam(req.params.id)));
  }
}
