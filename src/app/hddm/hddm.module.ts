import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { ToastrModule } from 'ngx-toastr';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {MatDialogModule} from '@angular/material/dialog';
import { MatBadgeModule } from '@angular/material/badge';


import { HddmRoutes } from './hddm.routing';
import { WidgetComponentModule } from '../widget-component/widget-component.module';
import { CredStoreComponent } from './cred-store/cred-store.component';
import { DiscoveryComponent } from './discovery/discovery.component'; 
import { MachineComponent } from './machine/machine.component';
import { GroupComponent } from './group/group.component';
import { ApplicationComponent } from './application/application.component';
import { CloudComponent } from './cloud/cloud.component';
import {SoftwareComponent} from './software/software.component';
import { ResourceComponent } from './resource/resource.component'
@NgModule({
	declarations: [
		CredStoreComponent,
		DiscoveryComponent,
		MachineComponent,
		GroupComponent,
		ApplicationComponent,
		CloudComponent,
		SoftwareComponent,
		ResourceComponent
		
	],
	imports: [
	
	
MatDialogModule,
		MatSelectModule,
    Ng2SearchPipeModule,
	CommonModule,
	MatBadgeModule,
		MatInputModule,
		MatFormFieldModule,
		FlexLayoutModule,
		MatCardModule,
		MatButtonModule,
		MatIconModule,
		MatToolbarModule,
		MatCheckboxModule,
		MatDividerModule,
		FormsModule,
		TranslateModule,
		ReactiveFormsModule,
		RouterModule.forChild(HddmRoutes),
		ToastrModule.forRoot(),
		SlickCarouselModule
	]
})
export class HddmModule { }
