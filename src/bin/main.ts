#!/usr/bin/env node
import 'reflect-metadata';

import Application from '../web/app';
import { container } from '../ioc.container';

async function main() {
  const app = new Application(container);
  await app.run();
}

main();
