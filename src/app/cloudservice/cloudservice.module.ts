import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AgmCoreModule } from '@agm/core';
// import { EasyPieChartModule } from 'ng2modules-easypiechart';
import { NgxEasypiechartModule } from 'ngx-easypiechart';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

// import { EventmanagementRoutes } from './eventmanagement.routing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WidgetComponentModule } from '../widget-component/widget-component.module';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingBarModule } from '@ngx-loading-bar/core';
// import { CloudserviceRoutingModule } from './cloudservice.routing';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';
import { AutoscaleComponent } from './autoscale/autoscale.component';
import { AnalyticsComponent } from './analytics/analytics.component';

import {CloudserviceRoutes} from './cloudservice.routing'

@NgModule({
  declarations: [
    AutoscaleComponent,
    AnalyticsComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatSelectModule,
    FlexLayoutModule,
    WidgetComponentModule,
    // EasyPieChartModule,
    NgxEasypiechartModule,
    MatPaginatorModule,
    MatChipsModule,
    TranslateModule,
    PerfectScrollbarModule,
    RouterModule.forChild(CloudserviceRoutes),
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatCardModule,
    MatMenuModule,
    MatListModule,
    MatCheckboxModule,
    MatDividerModule,
    ChartsModule,
    NgxDatatableModule,
    MatProgressBarModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatSortModule,
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyD4y2luRxfM8Q8yKHSLdOOdNpkiilVhD9k' }),
    MatAutocompleteModule,
    MatDatepickerModule,
    NgbModule,
    LoadingBarModule,
    // CloudserviceRoutingModule,
    
  ]
})
export class CloudserviceModule { }
