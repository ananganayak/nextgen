import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';

import { SmtpComponent } from './smtp/smtp.component';
import { LdapComponent } from './ldap/ldap.component';
import { CsmappingComponent } from './csmapping/csmapping.component';
import { ArconComponent } from './arcon/arcon.component';
import { LicenseComponent } from './license/license.component';
import { RolesComponent } from './roles/roles.component';
import { BotsRepoComponent } from './bots-repo/bots-repo.component';
import { PolicyEngineComponent } from './policy-engine/policy-engine.component';
import { IntelliDcmComponent } from './intelli-dcm/intelli-dcm.component';


// http://localhost:4200/admin/users

const routes: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full'
  },
  {
    path: 'users',
    component: UserComponent
  },

  {
    path: 'smtp',
    component: SmtpComponent
  },
  {
    path: 'roles',
    component: RolesComponent
  },
  {
    path: 'ldap',
    component: LdapComponent
  },
  {
    path: 'bots-repo',
    component: BotsRepoComponent
  },
  {
    path: 'policy-engine',
    component: PolicyEngineComponent
  },
  {
    path: 'csmapping',
    component: CsmappingComponent
  },
  {
    path: 'license',
    component: LicenseComponent
  },
  {
    path: 'arcon',
    component: ArconComponent
  },
  {
    path: 'intelli-dcm',
    component:IntelliDcmComponent
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class AdminRoutingModule { }
