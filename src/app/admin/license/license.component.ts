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
  selector: 'ms-license',
  templateUrl: './license.component.html',
  styleUrls: ['./license.component.scss']
})
export class LicenseComponent implements OnInit {
  hide = true;
  licenseData: any;

  constructor(
    private pageTitleService: PageTitleService,
    private http: HttpClient,
    private apiService: ApiService,
    private modalService: NgbModal,
    private loadingBar: LoadingBarService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
		this.pageTitleService.setTitle('License Details')
    this.getLicense();
  }

  getLicense() {
    this.loadingBar.start();
    this.apiService
      .licenseApi()
      .subscribe(
        (data: any) => {
          this.loadingBar.complete();
          this.licenseData = data.data[0].license_str;
          console.log(this.licenseData, ' getLicense ok');
        },
        (err: HttpErrorResponse) => {
          console.log(err, ' getLicense Error');
        }
      );
  }

  copyToClip() {
    this.toastr.success('Copied:' + this.licenseData);
  }

  update() {
    // this.loadingBar.start();
    this.apiService
      .licenseUpdateApi(this.licenseData)
      .subscribe(
        (data: any) => {
          this.hide = true;
          this.loadingBar.complete();
          this.getLicense();
          // console.log(data, ' update ok');
          if (data.result == 'success') {
            this.toastr.success('Updated License..');
          }
        },
        (err: HttpErrorResponse) => {
          this.toastr.error('License Update Error...');
          console.log(err, ' update Error');
        }
      );
  }

}