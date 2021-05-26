import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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
import { FormControl, FormGroup } from '@angular/forms';
import { leadingComment } from '@angular/compiler';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ms-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
  rolesTableData: [];
  checked = false;
  addRoleName;
  roleNames: any;
  rolemappersData: any;
  displayRoleName: any;
  rolemappersData2: any;
  allsting = [];
  showClassGrp: FormGroup;
  allDDDDasd = [];
  newKeyAsPermissionName = {};
  checkoutForm: FormGroup;
  subscription: Subscription;

  actionType = "";

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
    this.getRolesTable();
    this.getRoleName();

  }

  getRolesTable() {
    this.apiService
      .rolesTableApi()
      .subscribe(
        (data: any) => {
          this.rolesTableData = data.data.tab_name;
          console.log(this.rolesTableData);
        },
        (err: HttpErrorResponse) => {
          console.log(err, ' getRolesTable Error');
        }
      );
  }

  appAddNewRoleFn(modal){
    this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title', size: 'xl', scrollable: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  getRoleName() {
    this.apiService
      .roleNameApi()
      .subscribe(
        (res: any) => {
          if(res['result'] == "success"){
            this.roleNames = res.data.role_name;
          }else{
            this.toastr.error(res['data']);
          }
        },
        (err: HttpErrorResponse) => {
          console.log(err, 'getRoleName Error');
        }
      );
  }

  // Delete role FUnction
  deleteRoles(name):void{
    this.apiService
      .roleDeleteService(name)
      .subscribe(
        (res: any) => {
          if(res['result'] == "success"){
          this.toastr.success(res['data']);
          }else{
            this.toastr.error(res['data']);
          }
        },
        (err: HttpErrorResponse) => {
          console.log(err, 'getRoleName Error');
        }
      );
  }

  addRLData;

  // Submit Add Roles Function
  submitAddRolesFn(){
    if(!this.addRoleName){
      this.toastr.error("Please Enter The Role Name");
    }else{
      this.addRLData = {};
      this.rolesTableData.forEach(ele => {
        var permission = "";
        if ($("input[name='chkRead" + ele + "']:checked").length > 0) {
            permission = "R";
        }
        if ($("input[name='chkWrite" + ele + "']:checked").length > 0) {
            permission = permission + "W";
        }
        if ($("input[name='chkDelete" + ele + "']:checked").length > 0) {
            permission = permission + "X";
        }
        if (permission) {
          this.addRLData[ele] = permission;
        }
      });
      console.log(this.addRLData);
      const dataarr = {
        role_name : this.addRoleName,
        mapping : this.addRLData
      }
      this.apiService.postAddRolesService(dataarr).subscribe(
        res => {
          if(res['result'] == "success"){
            this.getRoleName();
            this.toastr.success(res['data']);
          }else{
            this.toastr.error(res['data']);
          }
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  updateRolesList;
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  closeResult = '';

  checkeddata = [];



  //Get Roles Based Condition Function
  getRolesCondition(name, modal) {
    this.displayRoleName = name;
    // console.log(this.rolesTableData);
    this.apiService
    .roleBasedMappersService(name)
    .subscribe(
      (data: any): void => {
        if(data['result'] == "success"){
          console.log(data);
          this.checkeddata = data['data']['admin'];
          this.chkRoleVal();
        }else{
          this.toastr.error(data['data']);
        }
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    )

    this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title', size: 'xl', scrollable: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }


  upCheckedData = [];


  chkRoleVal(){
    for (let i = 0; i < this.rolesTableData.length; i++) {
      var datavale = [];
      for (let j = 0; j < this.checkeddata.length; j++) {
        if(this.checkeddata[j].tab_name == this.rolesTableData[i]){
          // var stabname = this.checkeddata[j].tab_name;
          var spermission = this.checkeddata[j].permission_name;
          if (spermission.indexOf('R') !== -1) {
            datavale.push("R");
          }
          if (spermission.indexOf('W') !== -1) {
            datavale.push("W");
          }
          if (spermission.indexOf('X') !== -1) {
            datavale.push("X");
            // document.getElementById('chkDelete' + stabname).checked = true;
          }
        }
      }
      this.upCheckedData.push({"Name": this.rolesTableData[i], "value" : datavale})
    }
    console.log(this.upCheckedData);
  }

  upRLData ;
  // Update Role FUnction
  submitUpRolesFn(){
    this.upRLData = {};
    this.rolesTableData.forEach(ele => {
      var permission = "";
      if ($("input[name='chkUpRead" + ele + "']:checked").length > 0) {
          permission = "R";
      }
      if ($("input[name='chkUpWrite" + ele + "']:checked").length > 0) {
          permission = permission + "W";
      }
      if ($("input[name='chkUpDelete" + ele + "']:checked").length > 0) {
          permission = permission + "X";
      }
      if (permission) {
        this.upRLData[ele] = permission;
      }
    });
    const dataarr = {
      mapping : this.upRLData
    }
    console.log(dataarr);

    this.apiService.putUpRolesService(this.displayRoleName, dataarr).subscribe(
      res => {
        if(res['result'] == "success"){
          this.getRoleName();
          this.toastr.success(res['data']);
        }else{
          this.toastr.error(res['data']);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

}
