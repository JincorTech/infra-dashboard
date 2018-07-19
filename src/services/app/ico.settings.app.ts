import { injectable } from "inversify";

export const IcoSettingsAppType = Symbol('IcoSettingsApp');

@injectable()
export class IcoSettingsApp {

  async getBlockchainSettings(id: string): Promise<object> {
    return {
      defaultInvestGas: "130000",
      purchaseGasLimit: "100000",
      ethStartScanBlock: "3000000"
    };
  }

  async setBlockchainSettings(id: string, data: object): Promise<object> {
    return {
      defaultInvestGas: "150000",
      purchaseGasLimit: "100000",
      ethStartScanBlock: "3000000"
    };
  }

  async getExchangeSettings(id: string): Promise<object> {
    return {
      type: "coinpayments",
      settings: {
        currency1: "ETH"
      }
    };
  }

  async setExchangeSettings(id: string, data: object): Promise<object> {
    return {
      type: "coinpayments",
      settings: {
        currency1: "ETH"
      }
    };
  }

  async getKycSettings(id: string): Promise<object> {
    return {
      enabled: true,
      defaultStatus: "not_verified",
      type: "jumio"
    };
  }

  async setKycSettings(id: string, data: object): Promise<object> {
    return {
      enabled: true,
      defaultStatus: "not_verified",
      type: "jumio"
    };
  }

  async getEmailSettings(id: string): Promise<object> {
    return {
      templateFolder: "default",
      from: "noreply@superflow.com",
      referral: "partners@superflow.com",
      provider: {
        type: "mailgun"
      }
    };
  }

  async setEmailSettings(id: string, data: object): Promise<object> {
    return {
      from: "superflow@superflow.com",
      provider: {
        type: "mailgun",
        settings: {
          domain: "domain.com",
          apiKey: "key-12341234"
        }
      }
    };
  }

  async getFeaturesSettings(id: string): Promise<object> {
    return {
      icoAddress: "0x7672210729e053B2462D39CF3746A5d19B405aAD",
      icoEndTimestamp: "1517443900"
    };
  }

  async setFeaturesSettings(id: string, data: object): Promise<object> {
    return {
      icoAddress: "0x7672210729e053B2462D39CF3746A5d19B405aAD",
      icoEndTimestamp: "1517443900"
    };
  }

  async applySettings(id: string): Promise<object> {
    return {
      id: "d28e05de-242f-48c0-bf3d-ae2a5547499b",
      status: "pending"
    };
  }
}
