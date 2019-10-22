import { expect, tap } from '@pushrocks/tapbundle';
import { Qenv } from '@pushrocks/qenv';

const testQenv = new Qenv('./', './.nogit/');

import * as digitalocean from '../ts/index';

let testAccount: digitalocean.DigitalOceanAccount;
let testDroplet: digitalocean.DigitalOceanDroplet;

tap.test('should create a valid account instance', async () => {
  testAccount = new digitalocean.DigitalOceanAccount(testQenv.getEnvVarOnDemand('DO_API_TOKEN'));
  expect(testAccount).to.be.instanceOf(digitalocean.DigitalOceanAccount);
});

tap.test('should be able to create a droplet', async () => {
  const droplet = await digitalocean.DigitalOceanDroplet.createDroplet(testAccount, {
    name: 'mydroplet1',
    image: 'ubuntu-18-04-x64',
    region: 'fra1',
    size: 's-1vcpu-1gb'
  });
  console.log(droplet);
});

tap.test('should list all dreoplets', async () => {
  const droplets = await testAccount.listDroplets();
  expect(droplets.length).to.equal(1);
});

tap.test('should delete all dreoplets', async () => {
  const droplets = await testAccount.listDroplets();
  for (const droplet of droplets) {
    await droplet.remove();
  }
});

tap.start();
