import { injectable } from "inversify";

export const IcoDashboardAppType = Symbol('IcoDashboardApp');

@injectable()
export class IcoDashboardApp {
  async getDashboards(): Promise<any[]> {
    return [
      {
        id: "d28e05de-242f-48c0-bf3d-ae2a5547499b",
        title: "Superflow ICO",
        site: "https://ico.superflow.com",
        realHostIps: ["123.123.123.123", "123.123.123.124"]
      }
    ];
  }

  async createDashboard(data: object): Promise<object> {
    return {
      id: "d28e05de-242f-48c0-bf3d-ae2a5547499b",
      title: "Superflow ICO"
    };
  }

  async getDashboardInfo(id: string): Promise<object> {
    return {
      id: "d28e05de-242f-48c0-bf3d-ae2a5547499b",
      title: "Superflow ICO",
      frontendUrl: "https://ico.superflow.com",
      backendUrl: "https://api.ico.superflow.com",
      realHostIps: ["123.123.123.123", "123.123.123.124"],
      tokenAddress: "0x1a164bd1a4bd6f26726dba43972a91b20e7d93be",
      tokenPriceUsd: "1.0"
    };
  }

  async setDashboardInfo(id: string, data: object): Promise<object> {
    return {
      id: "d28e05de-242f-48c0-bf3d-ae2a5547499b",
      title: "Super-Delux ICO",
      frontendUrl: "https://ico.superflow.com",
      backendUrl: "https://api.ico.superflow.com",
      realHostIps: ["123.123.123.123", "123.123.123.124"],
      tokenAddress: "0x1a164bd1a4bd6f26726dba43972a91b20e7d93be",
      tokenPriceUsd: "1.0"
    };
  }
}
