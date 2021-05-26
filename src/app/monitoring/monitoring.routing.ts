import { Routes } from '@angular/router';
// import { SaasComponent } from './saas/saas.component';
// import { CrmComponent } from './crm/crm.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {MonitoringComponent} from './monitoring/monitoring.component';
import {NxtGenSupportDashboardComponent} from './nxt-gen-support-dashboard/nxt-gen-support-dashboard.component';
import {ReportsComponent} from './reports/reports.component';
import {UnknownsComponent} from './unknowns/unknowns.component';

export const MonitoringRoutes: Routes = [
   {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full'
   },
   {
      path: 'dashboard',
      component: DashboardComponent
   },
   {
      path: 'monitoring',
      component: MonitoringComponent
   },
   {
      path: 'nxt-gen-support-dashboard',
      component: NxtGenSupportDashboardComponent
   },
   {
      path: 'reports',
      component: ReportsComponent,
   },         
   {
      path: 'unknowns',
      component: UnknownsComponent
   },
];
