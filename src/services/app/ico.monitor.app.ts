import { injectable } from "inversify";

export const IcoMonitorAppType = Symbol('IcoMonitorApp');

@injectable()
export class IcoMonitorApp {
  async getMonitorInfo(id: string): Promise<object> {
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
