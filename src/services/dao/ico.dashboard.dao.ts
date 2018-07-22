import { getConnection, getMongoManager, ObjectID } from 'typeorm';
import { injectable } from 'inversify';

import { Dashboard } from '../../domain/ico/dashboard';

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
        userId
      },
      order: {
        title: 'ASC'
      }
    });
  }

  /**
   * @param id
   */
  async getAllById(id: ObjectID): Promise<Dashboard> {
    return getConnection().getMongoRepository(Dashboard).findOneOrFail(id);
  }

  /**
   * @param obj
   */
  async save(obj: Dashboard): Promise<Dashboard> {
    return getConnection().getMongoRepository(Dashboard).save(obj);
  }
}
