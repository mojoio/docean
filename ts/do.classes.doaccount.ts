import * as plugins from './do.plugins';
import { DigitalOceanDroplet } from './do.classes.dodroplet';

export class DigitalOceanAccount {
  public token: string;

  constructor(tokenArg: string) {
    this.token = tokenArg;
  }

  /**
   * the main request method used
   */
  public async request(routeArg: string, methodArg: string, payloadArg?: any) {
    const response = await plugins.smartrequest.request(
      `https://api.digitalocean.com/v2${routeArg}`,
      {
        method: methodArg,
        headers: {
          Authorization: `Bearer ${this.token}`,
          'Content-Type': `application/json`
        },
        requestBody: payloadArg
      }
    );
    return response.body;
  }

  public async listDroplets(): Promise<DigitalOceanDroplet[]> {
    return await DigitalOceanDroplet.listDroplets(this);
  }
}
