import * as request from 'web-request';
import { injectable } from "inversify";
import config from '../../config';
import { StackServiceBuilder } from './ico.stack.service';

@injectable()
export class DeployStack {
  protected baseUrl: string;

  constructor() {
    this.baseUrl = config.deployerHelper.url;
  }

  async deploy(builder: StackServiceBuilder) {
    return request.json<any>('/stacks/actions/deploy', {
      baseUrl: this.baseUrl,
      method: 'POST',
      body: builder.buildDeployHelperJSONRequest()
    });
  }
}