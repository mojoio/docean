import * as plugins from './do.plugins';

export class DigitalOceanAccount {
  token: string;

  constructor(tokenArg: string) {
    this.token = tokenArg;
  }

  /**
   * the main request method used
   */
  async request(routeArg: string, methodArg: string, payloadArg?: any) {
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
}
