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
  selector: 'ms-arcon',
  templateUrl: './arcon.component.html',
  styleUrls: ['./arcon.component.scss']
})
export class ArconComponent implements OnInit {
  communicationTypData: any;
  ArconData: any;

  communication_type;
  arconip;
  arconport;
  arconuser;
  arconpwd;
  Message: any;


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
    this.getArconData();
  }


  getCommunicationTyp() {
    this.apiService
      .arconCommunicationTypeApi()
      .subscribe(
        (data: any) => {
          this.communicationTypData = data.Data.communication_type;
          console.log(this.communicationTypData, ' CommunicationTyp ok');
        },
        (err: HttpErrorResponse) => {
          console.log(err, ' CommunicationTyp Error');
        }
      );
  }

  getArconData() {
    this.apiService
      .arconDatapi()
      .subscribe(
        (data: any) => {
          this.ArconData = data.Data;
          this.communication_type = this.ArconData.communication_type;
          this.arconip = this.ArconData.arconip;
          this.arconport = this.ArconData.arconport;
          this.arconuser = this.ArconData.arconuser;
          this.arconpwd = this.ArconData.arconpwd
        },
        (err: HttpErrorResponse) => {
          console.log(err, ' getArconData Error');
        }
      );
  }

  submit() {
    const info = {
      communication_type: this.communication_type,
      arconip: this.arconip,
      arconport: this.arconport,
      arconuser: this.arconuser,
      arconpwd: this.arconpwd
    }
    this.apiService
      .arconSubmit(info)
      .subscribe(
        (data: any) => {
            this.Message = data.Message;
            this.toastr.success(this.Message);
        },
        (err: HttpErrorResponse) => {
          this.toastr.error('Arocn Error...');
          console.log(err, ' submit Error');
        }
      );

  }

}
