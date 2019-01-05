import * as plugins from './do.plugins';

import { TDropletSizes, TRegions, TImages } from './interfaces';
import { DigitalOceanAccount } from './do.classes.doaccount';

export class DigitalOceanDroplet {
  public static async createDroplet(dropletCreateOptions: {
    account: DigitalOceanAccount;
    name: string;
    size: TDropletSizes;
    region: TRegions;
    image: string | TImages;
  }) {
    const response = await dropletCreateOptions.account.request('/droplets', 'POST', {
      name: dropletCreateOptions.name,
      region: dropletCreateOptions.region,
      size: dropletCreateOptions.size,
      image: dropletCreateOptions.image,
      ssh_keys: null,
      backups: false,
      ipv6: true,
      user_data: null,
      private_networking: null,
      volumes: null,
      tags: ['web']
    });

    console.log(response);
  }

  constructor() {}
}
