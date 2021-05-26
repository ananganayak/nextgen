import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { UserComponent } from './user/user.component';

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
import { NgxEasypiechartModule } from 'ngx-easypiechart';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WidgetComponentModule } from '../widget-component/widget-component.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';


import { SmtpComponent } from './smtp/smtp.component';
import { LdapComponent } from './ldap/ldap.component';
import { CsmappingComponent } from './csmapping/csmapping.component';
import { ArconComponent } from './arcon/arcon.component';
import { LicenseComponent } from './license/license.component';
import { RolesComponent } from './roles/roles.component';
import { BotsRepoComponent } from './bots-repo/bots-repo.component';
import { PolicyEngineComponent } from './policy-engine/policy-engine.component';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { ReadonlyPipe } from './roles/readonly.pipe';
import { WriteonlyPipe } from './roles/writeonly.pipe';
import { DeleteonlyPipe } from './roles/deleteonly.pipe';
import { IntelliDcmComponent } from './intelli-dcm/intelli-dcm.component';
import {MatTreeModule} from '@angular/material/tree';



@NgModule({
  declarations: [
    UserComponent,
    SmtpComponent,
    LdapComponent,
    CsmappingComponent,
    ArconComponent,
    LicenseComponent,
    RolesComponent,
    BotsRepoComponent,
    PolicyEngineComponent,
    ReadonlyPipe,
    WriteonlyPipe,
    DeleteonlyPipe,
    IntelliDcmComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    CommonModule,
    MatTableModule,
    MatSelectModule,
    FlexLayoutModule,
    WidgetComponentModule,
    NgxEasypiechartModule,
    MatPaginatorModule,
    MatChipsModule,
    TranslateModule,
    PerfectScrollbarModule,
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
    MatSlideToggleModule,
    ClipboardModule,
    MatCheckboxModule,
    MatTreeModule

  ]
})
export class AdminModule { }
