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


@Component({
  selector: 'ms-ldap',
  templateUrl: './ldap.component.html',
  styleUrls: ['./ldap.component.scss']
})
export class LdapComponent implements OnInit {

  LdapData;
  communicationTypData;
  communication_type;
  ldapIp;
  ldapPort;
  baseDn;
  account;
  password;
  Message;

  LdapFm = [];


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
    this.getCommunicationTyp();
    this.getLDAPData();
  }


  getCommunicationTyp() {
    this.apiService
      .ldapCommunicationTypeApi()
      .subscribe(
        (data: any) => {
          this.communicationTypData = data.Data.communication_type;
          console.log(this.communicationTypData, ' CommunicationTyp ok');
        },
        (err: HttpErrorResponse) => {
          // this.toastr.error('User Details Updated Error...');
          console.log(err, ' CommunicationTyp Error');
        }
      );
  }


  getLDAPData() {
    this.apiService
      .LDAPDataApi()
      .subscribe(
        (data: any) => {
          this.LdapData = data.Data;
          this.communication_type = this.LdapData['communication_type'];
          this.ldapIp = this.LdapData['LDAP IP'];
          this.ldapPort = this.LdapData['LDAP PORT'];
          this.baseDn = this.LdapData['basedn'];
          this.account = this.LdapData['sysacc'];
          this.password = this.LdapData['syspwd'];

          console.log(this.LdapData, ' getLDAPData');
        },
        (err: HttpErrorResponse) => {
          // this.toastr.error('User Details Updated Error...');
          console.log(err, ' getLDAPData Error');
        }
      );
  }


  submit() {
    const info = {
      communication_type: this.communication_type,
      ldapip: this.ldapIp,
      ldapport: this.ldapPort,
      sysacc: this.account,
      syspwd: this.password,
      basedn: this.baseDn
    }

    this.apiService
      .LDAPDataSubmintApi(info)
      .subscribe(
        (data: any) => {
          this.Message = data.Message;
          this.getCommunicationTyp();
          this.getLDAPData();
          this.toastr.success(this.Message);

          console.log(this.Message, ' submit ok ');
        },
        (err: HttpErrorResponse) => {
          this.toastr.error('LDAP Details Error...');
          console.log(err, ' submit Error');
        }
      );
  }

}
