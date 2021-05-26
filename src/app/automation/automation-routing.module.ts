import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { CatalogComponent } from './catalog/catalog.component';
import { DesignerComponent } from './designer/designer.component';
import { ReviewComponent } from './review/review.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormbuildingComponent } from './formbuilding/formbuilding.component';
import{ReportsComponent} from './reports/reports.component'

const routes: Routes = [
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
    path: 'catalog',
    component: CatalogComponent
  },
  {
    path: 'designer',
    component: DesignerComponent
  },
  {
    path: 'review',
    component: ReviewComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'formbuilding',
    component: FormbuildingComponent
  },
  {
    path: 'reports',
    component: ReportsComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
 
exports: [RouterModule]
})
export class AutomationRoutingModule { }
