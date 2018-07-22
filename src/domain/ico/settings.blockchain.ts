import { Column } from 'typeorm';

export class SettingsBlockchain {
  @Column()
  public nodeUrl: string;

  @Column()
  public defaultInvestGas: string;

  @Column()
  public purchaseGasLimit: string;

  @Column()
  public ethStartScanBlock: string;

  static create(data: any) {
    const o = new SettingsBlockchain();
    o.assignFrom(data);
    return o;
  }

  assignFrom(data: any) {
    this.nodeUrl = data.nodeUrl;
    this.defaultInvestGas = data.defaultInvestGas;
    this.purchaseGasLimit = data.purchaseGasLimit;
    this.ethStartScanBlock = data.ethStartScanBlock;
  }
}
