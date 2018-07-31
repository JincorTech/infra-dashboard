import { injectable } from "inversify";
import { ObjectID } from "mongodb";

export const IcoMonitorAppType = Symbol('IcoMonitorApp');

@injectable()
export class IcoMonitorApp {
  async getMonitorInfo(id: ObjectID): Promise<object> {
    return {
      stacks: {
        backend: {
          status: "live"
        },
        frontend: {
          status: "live"
        }
      }
    };
  }
}
