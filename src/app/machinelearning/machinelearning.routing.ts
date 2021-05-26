import { Routes } from '@angular/router';

import { AnomalyComponent } from './anomaly/anomaly.component';



export const MachinelearningRoutes: Routes = [
   {
      path: '',
      redirectTo: 'anomaly',
      pathMatch: 'full'
   },
   {
      path: 'anomaly',
      component: AnomalyComponent
   },
   
];
