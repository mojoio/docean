import * as plugins from './do.plugins';

import { TDropletSizes, TRegions, TImages } from './interfaces';
import { DigitalOceanAccount } from './do.classes.doaccount';

export class DigitalOceanDroplet {
  // STATIC
  public static async createDroplet(
    doAccountRef: DigitalOceanAccount,
    dropletCreateOptions: {
      name: string;
      size: TDropletSizes;
      region: TRegions;
      image: string | TImages;
    }
  ): Promise<DigitalOceanDroplet> {
    const response = await doAccountRef.request('/droplets', 'POST', {
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
    return new DigitalOceanDroplet(doAccountRef, response.droplet);
  }

  public static async listDroplets(doAccountRefArg: DigitalOceanAccount) {
    const response = await doAccountRefArg.request('/droplets?page=1&per_page=200', 'GET');
    const droplets: DigitalOceanDroplet[] = [];
    for (const dropletData of response.droplets) {
      droplets.push(new DigitalOceanDroplet(doAccountRefArg, dropletData));
    }
    return droplets;
  }

  // INSTANCE
  public doAccountRef: DigitalOceanAccount;

  public id: number;
  public name: string;
  public memory: number;
  public vcpus: number;
  public disk: number;
  public locked: boolean;
  public status: 'new';
  public kernel: any;
  public created_at: string;
  public features: [];
  public backup_ids: [];
  public next_backup_window: null;
  public snapshot_ids: [];
  public image: {
    id: number;
    name: string;
    distribution: 'Ubuntu';
    slug: string;
    public: true;
    regions: string[];
    created_at: string;
    min_disk_size: number;
    type: string;
    size_gigabytes: number;
    description: string;
    tags: string[];
    status: 'available';
    error_message: string;
  };
  public volume_ids: [];
  public size: {
    slug: 's-1vcpu-1gb';
    memory: 1024;
    vcpus: 1;
    disk: 25;
    transfer: 1;
    price_monthly: 5;
    price_hourly: 0.00744;
    regions: any[];
    available: true;
  };
  public size_slug: 's-1vcpu-1gb';
  public networks: { v4: string[]; v6: string[] };
  public region: {
    name: 'Frankfurt 1';
    slug: 'fra1';
    features: any[];
    available: true;
    sizes: any[];
  };
  public tags: ['web'];

  constructor(doAccountRef: DigitalOceanAccount, dropletData: any) {
    this.doAccountRef = doAccountRef;
    Object.assign(this, dropletData);
  }

  public async remove() {
    await this.doAccountRef.request(`/droplets/${this.id}`, 'DELETE');
  }
}
