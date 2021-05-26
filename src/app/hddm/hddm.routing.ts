import { Routes } from '@angular/router';
// import { SaasComponent } from './saas/saas.component';
// import { CrmComponent } from './crm/crm.component';
import {ApplicationComponent} from './application/application.component';
import {CloudComponent} from './cloud/cloud.component';
import {CredStoreComponent} from './cred-store/cred-store.component';
import {DiscoveryComponent} from './discovery/discovery.component';
import {GroupComponent} from './group/group.component';
import {MachineComponent} from './machine/machine.component';
import { SoftwareComponent } from './software/software.component';
import { ResourceComponent } from './resource/resource.component';


export const HddmRoutes: Routes = [
   {
      path: '',
      redirectTo: 'application',
      pathMatch: 'full'
   },
   {
      path: 'application',
      component: ApplicationComponent
   },
   {
      path: 'cloud',
      component: CloudComponent
   },
   {
      path: 'cred-store',
      component: CredStoreComponent
   },
   {
      path: 'discovery',
      component: DiscoveryComponent
   },
   {
      path: 'group',
      component: GroupComponent
   },
   {
      path: 'machine',
      component: MachineComponent
   },
   {
      path: 'software',
      component: SoftwareComponent
   },
   {
      path: 'resource',
      component: ResourceComponent
   },
];
