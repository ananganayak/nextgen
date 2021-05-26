import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { SaasComponent } from './saas/saas.component';
// import { CrmComponent } from './crm/crm.component';
import { AutoscaleComponent } from './autoscale/autoscale.component';
import { AnalyticsComponent } from './analytics/analytics.component';


export const CloudserviceRoutes: Routes = [
   {
      path: '',
      redirectTo: 'autoscale',
      pathMatch: 'full'
   },
   {
      path: 'autoscale',
      component: AutoscaleComponent
   },
   {
      path: 'analytics',
      component: AnalyticsComponent
   }
   
];


// @NgModule({
 // imports: [RouterModule.forChild(CloudserviceRoutes)],
  //  exports: [RouterModule]
 // })
 // export class CloudserviceRoutingModule { }
