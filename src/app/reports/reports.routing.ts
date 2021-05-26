import { Routes } from '@angular/router';
// import { SaasComponent } from './saas/saas.component';
// import { CrmComponent } from './crm/crm.component';
import { PerformancesReportComponent } from './performances-report/performances-report.component';
import { EdgeUplinkInOutComponent } from './edge-uplink-in-out/edge-uplink-in-out.component';

export const ReportsRoutes: Routes = [
   {
      path: '',
      redirectTo: 'vm-summary-report',
      pathMatch: 'full'
   },
   {
      path: 'vm-summary-report',
      component: EdgeUplinkInOutComponent
   },
   {
      path: 'performances-report',
      component: PerformancesReportComponent
   },

];
