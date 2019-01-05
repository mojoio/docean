import { expect, tap } from '@pushrocks/tapbundle';
import { Qenv } from '@pushrocks/qenv';

const testQenv = new Qenv('./', './.nogit/');

import * as digitalocean from '../ts/index';

let testAccount: digitalocean.DigitalOceanAccount;
let testDroplet: digitalocean.DigitalOceanDroplet;

tap.test('should create a valid account instance', async () => {
  testAccount = new digitalocean.DigitalOceanAccount(process.env.DO_API_TOKEN);
  expect(testAccount).to.be.instanceOf(digitalocean.DigitalOceanAccount);
});

tap.test('should be able to create a droplet', async () => {
  await digitalocean.DigitalOceanDroplet.createDroplet({
    account: testAccount,
    name: 'mydroplet1',
    image: 'ubuntu-18-04-x64',
    region: 'fra1',
    size: 's-1vcpu-1gb'
  });
});

tap.start();
