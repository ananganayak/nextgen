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
  selector: 'ms-smtp',
  templateUrl: './smtp.component.html',
  styleUrls: ['./smtp.component.scss']
})
export class SmtpComponent implements OnInit {
  communicationTypes: any;

  communication_type;
  smtpip;
  smtpport;
  smtpuser = '';
  smtppass = '';
  smtpauth;
  showUserNameAndPassword = false;

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
    this.pageTitleService.setTitle('SMTP Details');
    this.getSMTPCommunicationType();
  }


  getSMTPCommunicationType() {
    this.apiService
      .SMTPCommunicationType()
      .subscribe(
        (data: any) => {
          this.communicationTypes = data.Data.communication_type;
          console.log(this.communicationTypes, ' communicationTypes');
        },
        (err: HttpErrorResponse) => {
          // this.toastr.error('User Details Updated Error...');
          console.log(err, ' User Details Updated Error');
        }
      );
  }


  DoesYourServerNeedsAuthentication(e) {
    this.showUserNameAndPassword = e;

    if (e === true) {
      this.smtpauth = 'YES';
    } else {
      this.smtpauth = 'NO';
      this.smtpuser = '';
      this.smtppass = '';
    }
    console.log(e, ' eeeeee')
  }

  submit() {
    const info = {
      communication_type: this.communication_type,
      smtpip: this.smtpip,
      smtpport: this.smtpport,
      smtpauth: this.smtpauth,
      smtpuser: this.smtpuser,
      smtppass: this.smtppass
    }
    
    this.apiService
      .SMTPCommunicationTypeUpdate(info)
      .subscribe(
        (data: any) => {
          this.toastr.success('Submitted Sucessfully...');
          console.log(this.communicationTypes, ' communicationTypes');
        },
        (err: HttpErrorResponse) => {
          this.toastr.error('Submitted Error...');
          console.log(err, ' Submitted Error');
        }
      );
  }

}
