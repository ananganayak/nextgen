import { Routes } from '@angular/router';
// import { SaasComponent } from './saas/saas.component';
// import { CrmComponent } from './crm/crm.component';
import {ExecSummaryDashboardComponent} from './exec-summary-dashboard/exec-summary-dashboard.component';
import {EventAnalyticsDashboardComponent} from './event-analytics-dashboard/event-analytics-dashboard.component';
import {ServiceVisualDashboardComponent} from './service-visual-dashboard/service-visual-dashboard.component';
import {AutoClassficationDashboardComponent} from './auto-classfication-dashboard/auto-classfication-dashboard.component';

export const DashboardRoutes: Routes = [
   {
      path: '',
      redirectTo: 'exec-summary-dashboard',
      pathMatch: 'full'
   },
   {
      path: 'exec-summary-dashboard',
      component: ExecSummaryDashboardComponent
   },
   {
      path: 'event-analytics-dashboard',
      component: EventAnalyticsDashboardComponent
   },
   {
      path: 'service-visual-dashboard',
      component: ServiceVisualDashboardComponent
   },
   {
      path: 'auto-classfication-dashboard',
      component: AutoClassficationDashboardComponent
   }
];
