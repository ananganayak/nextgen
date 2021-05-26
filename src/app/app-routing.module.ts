import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AuthGuard } from './core/guards/auth.guard';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'monitoring/dashboard',
    pathMatch: 'full',
  }, {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always',
    children: [
      { path: 'reports', loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule) }
    ]
  }, {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always',
    children: [
      { path: 'monitoring', loadChildren: () => import('./monitoring/monitoring.module').then(m => m.MonitoringModule) }
    ]
  }, {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always',
    children: [
      { path: 'hddm', loadChildren: () => import('./hddm/hddm.module').then(m => m.HddmModule) }
    ]
  }, {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always',
    children: [
      {
        path: 'eventmanagement',
        loadChildren: () => import('./eventmanagement/eventmanagement.module').then(m => m.EventmanagementModule)
      }
    ]
  }, {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always',
    children: [
      {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
      }
    ]
  }, 
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always',
    children: [
      {
        path: 'cloudservice',
        loadChildren: () => import('./cloudservice/cloudservice.module').then(m => m.CloudserviceModule)
      }
    ]
  },
   {
     path: '',
     component: MainComponent,
     canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always',
     children: [
       {
         path: 'machinelearning',
         loadChildren: () => import('./machinelearning/machinelearning.module').then(m => m.MachinelearningModule)
       }
     ]
   },
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always',
    children: [
      {
        path: 'automation',
        loadChildren: () => import('./automation/automation.module').then(m => m.AutomationModule)
      }
    ]
  }, {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always',
 
    children: [
      { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) }
    ]
  }, {
    path: 'session', loadChildren: () => import('./session/session.module').then(m => m.SessionModule)
  }, {
    path: '**',
    redirectTo: 'session/login'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: []
})
export class RoutingModule { }
