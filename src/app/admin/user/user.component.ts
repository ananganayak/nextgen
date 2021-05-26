import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { ApiService } from 'app/service/api.service';
import { ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';


export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

/** Constants used to fill up our data base. */
const COLORS: string[] = [
  'maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple', 'fuchsia', 'lime', 'teal',
  'aqua', 'blue', 'navy', 'black', 'gray'
];
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];


@Component({
  selector: 'ms-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = [
    'pk_id',
    'user_id',
    'first_name',
    'last_name',
    'email_id',
    'phone_number',
    'role_name',
    'Customer',
    'Action'
  ];
  FirstName;
  MiddleName;
  LastName;
  EmailId;
  Username;
  PhoneNumber;
  Roles;
  UserType;
  TimeZone;
  RolesVal;
  dataSource: MatTableDataSource<PeriodicElement>;
  closeResult = '';
  userID;
  userTypeVal;
  ZonesVal;
  EditUserVal;
  listOfMappingIds = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  rolesData: any;
  zonesData: any;
  usrCreatedStatus: any;
  updateZonesVal: any;
  updateRolesVal: any;
  updateUserTypeVal: any;
  userCustMapData: any;
  MappingUserId: any;
  userMappingLoading = false;

  constructor(
    private pageTitleService: PageTitleService,
    private http: HttpClient,
    private apiService: ApiService,
    private modalService: NgbModal,
    private loadingBar: LoadingBarService,
    private toastr: ToastrService,
    config: NgbModalConfig,
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.getListUsers();
    this.getListRoles();
    this.getZone();
  }

  ngAfterViewInit() {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // MODEL START
  open(content) {

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  // MODEL END


  // this.loadingBar.start();
  // this.loadingBar.complete();

  getListUsers() {
    this.loadingBar.start();
    this.apiService
      .usersAPi()
      .subscribe(
        (data: any) => {
          this.dataSource = data.data;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.loadingBar.complete();
          this.modalService.dismissAll('Cross click');
          this.Username = '';
          this.FirstName = '';
          this.MiddleName = '';
          this.LastName = '';
          this.EmailId = '';
          this.PhoneNumber = '';
          this.ZonesVal = '';
          this.RolesVal = '';
          this.userTypeVal = '';
        },
        (err: HttpErrorResponse) => {
          console.log(err, ' AlertsDataApiAlertsDataApi Error');
        }
      );
  }


  getListRoles() {
    this.apiService
      .userRolesApi()
      .subscribe(
        (data: any) => {
          this.rolesData = data.data.role_name;
        },
        (err: HttpErrorResponse) => {
          console.log(err, ' AlertsDataApiAlertsDataApi Error');
        }
      );
  }

  getZone() {
    this.apiService
      .TimeZonesApi()
      .subscribe(
        (data: any) => {
          this.zonesData = data.data;
        },
        (err: HttpErrorResponse) => {
          console.log(err, ' AlertsDataApiAlertsDataApi Error');
        }
      );
  }


  createUser() {
    const info = {
      user_id: this.Username,
      first_name: this.FirstName,
      middle_name: this.MiddleName,
      last_name: this.LastName,
      email_id: this.EmailId,
      phone_number: this.PhoneNumber,
      time_zone: this.ZonesVal,
      role: this.RolesVal,
      user_type: this.userTypeVal
    }

    this.apiService
      .createUserApi(info)
      .subscribe(
        (data: any) => {
          if (data.result === 'success') {
            this.toastr.success('User Created Sucessfully...');
            this.usrCreatedStatus = 'Created User';
            this.getListUsers();
          }
        },
        (err: HttpErrorResponse) => {
          this.toastr.error('User Creation Error...');
          console.log(err, ' createUser Error');
        }
      );
  }


  rolesOnChange(e) {
    console.log(e, ' ddddddd');
  }

  ZonesOnChange() {

  }

  editUser(content, data) {
    this.EditUserVal = {
      email_id: data.email_id,
      first_name: data.first_name,
      last_name: data.last_name,
      middle_name: data.middle_name,
      phone_number: data.phone_number,
      pk_id: data.pk_id,
      role_name: data.role_name,
      timezone: data.timezone,
      user_id: data.user_id,
      user_type_desc: data.user_type_desc,
      zone_id: data.zone_id
    }

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  UpdateUserInfo() {
    const data = {
      first_name: this.EditUserVal.first_name,
      middle_name: this.EditUserVal.middle_name,
      last_name: this.EditUserVal.last_name,
      email_id: this.EditUserVal.email_id,
      phone_number: this.EditUserVal.phone_number,
      user_id: this.EditUserVal.user_id,
      time_zone: this.updateZonesVal,
      role: this.updateRolesVal,
      user_type: this.updateUserTypeVal
    }

    console.log(data, ' editUser');

    this.apiService
      .updateUserDetailApi(data)
      .subscribe(
        (data: any) => {
          if (data.result === 'success') {
            this.toastr.success('User Details Updated Sucessfully...');
            this.getListUsers();
          }
        },
        (err: HttpErrorResponse) => {
          this.toastr.error('User Details Updated Error...');
          console.log(err, ' User Details Updated Error');
        }
      );

  }

  userDelete(id) {
    console.log(id, ' userDelete');
    this.apiService
      .deleteUserApi(id)
      .subscribe(
        (data: any) => {
          if (data.result === 'success') {
            this.toastr.success('User Deleted Sucessfully...');
            this.getListUsers();
          }
        },
        (err: HttpErrorResponse) => {
          this.toastr.error('User Creation Error...');
          console.log(err, ' User Deleting Error');
        }
      );
  }


  UserCustomerMappingTrigger(content, data) {
    this.userMappingLoading = true;
    this.MappingUserId = data.pk_id;
    // this.modalService.open(content, { size: 'xl' });

    this.modalService.open(content, { size: 'xl', ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });


    this.apiService
      .userCustMapApi(this.MappingUserId)
      .subscribe(
        (data: any) => {
          if (data.result === 'success') {
            this.userMappingLoading = false;
            this.userCustMapData = data.data;
            console.log(this.userCustMapData, ' userCustMapData');
          }
        },
        (err: HttpErrorResponse) => {

          this.toastr.error('User Creation Error...');
          console.log(err, ' User Deleting Error');
        }
      );
  }

  mappingEvt(e, id) {
    if (e.checked === true) {
      this.listOfMappingIds.push(id)
    } else {
      for (let i = 0; i < this.listOfMappingIds.length; i++) {
        if (this.listOfMappingIds[i] === id) {
          this.listOfMappingIds.splice(i, 1);
        }
      }
    }
    console.log(this.listOfMappingIds, ' mappingEvtmappingEvt 2');
  }


  userCustomerMapping() {
    this.loadingBar.start();
    const info = {
      user_id: this.MappingUserId,
      customer_id: this.listOfMappingIds
    }

    this.apiService
      .userCustMappingAPI(info)
      .subscribe(
        (data: any) => {
          if (data.result === 'success') {
            this.userCustMapData = data.data;
            this.modalService.dismissAll('Cross click');
            this.loadingBar.complete();
            console.log(this.userCustMapData, ' userCustMapData');
          }
        },
        (err: HttpErrorResponse) => {
          this.toastr.error('User Creation Error...');
          console.log(err, ' User Deleting Error');
        }
      );
  }




}

export interface PeriodicElement {
  pk_id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  email_id: string;
  phone_number: string;
  role_name: string;
}

