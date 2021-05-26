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
  selector: 'ms-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  ListOfTask;
  displayedColumns: string[] = ['processid', 'taskName', 'taskId', 'status', 'action'];
  dataSource = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;

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
    this.getListOfTasks();

  }

  getListOfTasks() {

    const customer_id = 'autointelli';
    const tenant_id = 'internal';


    this.apiService
      .reviewListofTaskApi(customer_id, tenant_id)
      .subscribe(
        (data: any) => {
          this.ListOfTask = data.response.Tasks;
          this.dataSource = this.ListOfTask;
          // this.dataSource.paginator = this.paginator;

          console.log(this.ListOfTask, ' ListOfTask');
        },
        (err: HttpErrorResponse) => {
          this.toastr.error('List Of Tasks Error...');
          console.log(err, 'List Of Tasks Error');
        }
      );
  }

}

export interface PeriodicElement {
  processid: string;
  processinstanceid: string;
  status: string;
  taskId: string;
  taskName: string;
}
