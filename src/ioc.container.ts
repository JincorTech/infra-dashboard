import { Container, ContainerModule } from 'inversify';
import 'reflect-metadata';
import { interfaces, TYPE } from 'inversify-express-utils';

import { DashboardInfoController } from './web/controllers/icodashboard/common.controller';
import { DashboardSettingsController } from './web/controllers/icodashboard/settings.controller';
import { DashboardMonitorController } from './web/controllers/icodashboard/monitor.controller';
import { IcoDashboardApp, IcoDashboardAppType } from './services/app/ico.dashboards.app';
import { IcoMonitorApp, IcoMonitorAppType } from './services/app/ico.monitor.app';
import { IcoSettingsApp, IcoSettingsAppType } from './services/app/ico.settings.app';
import { IcoDashboardDao, IcoDashboardDaoType } from './services/dao/ico.dashboard.dao';
import { IcoDashboardSettingsDao, IcoDashboardSettingsDaoType } from './services/dao/ico.dashboard.settings.dao';

/* istanbul ignore next */
export function buildServicesContainerModule(): ContainerModule {
  return new ContainerModule((
    bind, unbind, isBound, rebind
  ) => {
    bind<IcoDashboardDao>(IcoDashboardDaoType).to(IcoDashboardDao);
    bind<IcoDashboardSettingsDao>(IcoDashboardSettingsDaoType).to(IcoDashboardSettingsDao);
  });
}

/* istanbul ignore next */
export function buildApplicationsContainerModule(): ContainerModule {
  return new ContainerModule((
    bind, unbind, isBound, rebind
  ) => {
    bind<IcoDashboardApp>(IcoDashboardAppType).to(IcoDashboardApp);
    bind<IcoMonitorApp>(IcoMonitorAppType).to(IcoMonitorApp);
    bind<IcoSettingsApp>(IcoSettingsAppType).to(IcoSettingsApp);
  });
}

/* istanbul ignore next */
export function buildMiddlewaresContainerModule(): ContainerModule {
  return new ContainerModule((
    bind, unbind, isBound, rebind
  ) => {
  });
}

/* istanbul ignore next */
export function buildControllersContainerModule(): ContainerModule {
  return new ContainerModule((
    bind, unbind, isBound, rebind
  ) => {
    bind<interfaces.Controller>(TYPE.Controller)
      .to(DashboardInfoController).whenTargetNamed('DashboardInfo');
    bind<interfaces.Controller>(TYPE.Controller)
      .to(DashboardSettingsController).whenTargetNamed('DashboardSettings');
    bind<interfaces.Controller>(TYPE.Controller)
      .to(DashboardMonitorController).whenTargetNamed('DashboardMonitor');
  });
}

/* istanbul ignore next */
export function buildIoc(): Container {
  const container = new Container();
  container.load(
    buildMiddlewaresContainerModule(),
    buildServicesContainerModule(),
    buildApplicationsContainerModule(),
    buildControllersContainerModule()
  );
  return container;
}

export const container = buildIoc();
