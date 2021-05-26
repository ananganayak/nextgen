import { Routes } from '@angular/router';
// import { SaasComponent } from './saas/saas.component';
// import { CrmComponent } from './crm/crm.component';
import { AlertsComponent } from './alerts/alerts.component';
import { EventsComponent } from './events/events.component';
import { DropEventsComponent } from './drop-events/drop-events.component';

export const EventmanagementRoutes: Routes = [
   {
      path: '',
      redirectTo: 'alerts',
      pathMatch: 'full'
   },
   {
      path: 'alerts',
      component: AlertsComponent
   },
   {
      path: 'drop-events',
      component: DropEventsComponent
   },
   {
      path: 'events',
      component: EventsComponent
   }
];
