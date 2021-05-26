import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { ApiService } from 'app/service/api.service';
import { ToastrService } from 'ngx-toastr';
import { ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { animate, state, style, transition, trigger } from '@angular/animations';
import * as moment from 'moment';
@Component({
  selector: 'ms-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})




export class CatalogComponent implements OnInit {
  category_data;
  process_data;
  process_val = [];
  history_data: any;
  closeResult = '';

  dataSource;
  columnsToDisplay = ['processname', 'start_date', 'end_date', 'state', 'action'];
  expandedElement: PeriodicElement;
  run_dataset: any;
  runProcessStatus = false;
  runProcessTextField;
  runProcessID: any;
  runProcessIDOnly: any;
  listOfUser: any;
  sharedWithUserList: any;
  userGroupList = [];
  readyUser = [];
  enbleShareBtn = false;
  processData: any;
  searchCatagoery;
  searchProcess;

  constructor(
    private pageTitleService: PageTitleService,
    private http: HttpClient,
    private apiService: ApiService,
    private modalService: NgbModal,
    private loadingBar: LoadingBarService,
    config: NgbModalConfig,
    private renderer: Renderer2,
    private toastr: ToastrService,
    private sanitizer: DomSanitizer
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.pageTitleService.setTitle('Alerts');
    this.getCategory();
  }

  // MODEL START
  open(content, size) {
    this.modalService.open(content, { size: size, ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
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


  getCategory() {
    this.apiService
      .categoryApi()
      .subscribe(
        (data: any) => {
          // this.toastr.success(data.response);
          this.category_data = data.response['categories'];
          this.getProcess();
          console.log(data.response, ' getCategory');
        },
        (err: HttpErrorResponse) => {
          this.toastr.error('err: getCategory Delete');
          console.log(err, ' getCategory Error');
        }
      );
  }


  getProcess() {
    this.apiService
      .processApi()
      .subscribe(
        (data: any) => {
          this.process_data = data.response;
          this.process_val = data.response['process-list'];
          console.log(data.response, ' getProcess');
        },
        (err: HttpErrorResponse) => {
          this.toastr.error('err: getProcess');
          console.log(err, ' getProcess Error');
        }
      );
  }

  showInfoAll() {
    this.getProcess();
  }

  showInfo(l) {
    this.process_val = [];
    for (const proce of this.process_data['process-list']) {
      if (proce.category === l) {
        this.process_val.push(proce);
      }
    }
  }

  getHistory(id) {
    this.loadingBar.start();
    this.dataSource = [];
    console.log(id);
    this.apiService
      .historyApi(id)
      .subscribe(
        (data: any) => {
          this.history_data = data.response;
          this.dataSource = data.response['process-instances'];
          console.log(this.dataSource, ' getHistory');
          this.loadingBar.complete();
        },
        (err: HttpErrorResponse) => {
          this.toastr.error('err: getHistory');
          console.log(err, ' getHistory Error');
        }
      );
  }


  getRunProcess(id) {
  }

  stopHistory() {
  }


  runThis(id) {
    this.runProcessTextField = '';
    this.runProcessStatus = null;
    this.runProcessID = id['process-name'] + ' - ' + moment().format('MMMM Do YYYY, h:mm:ss a');
    this.runProcessIDOnly = id['process-id'];
    // this.loadingBar.start();moment
    console.log(this.runProcessID, ' runProcessIDD ');
    this.apiService
      .runProcessApi(id['process-id'])
      .subscribe(
        (data: any) => {
          this.run_dataset = data.response;


          if (data.status === 'failure') {
            this.toastr.error('Failure: Run Process');
            this.runProcessStatus = false;
          } else {
            this.toastr.success('Success: Run Process');
            this.runProcessStatus = true;

            if (this.run_dataset.formcontent.length > 0) {
              console.log(this.runProcessTextField, ' runProcessTextField');

            } else {
              this.runProcessConfirm(this.runProcessIDOnly, '{}');

            }

            console.log(data, ' run_dataset');
          }

          // this.loadingBar.complete();
        },
        (err: HttpErrorResponse) => {
          // this.toastr.error('err: run_dataset');
          console.log(err, ' run_dataset Error');
        }
      );
  }



  startProcess() {
    console.log(this.runProcessTextField, ' runProcessTextField');
  }

  runProcessConfirm(id, body) {
    this.apiService
      .runProcessConfirmApi(id, body)
      .subscribe(
        (data: any) => {
          this.toastr.success('Success: Workflow Executed successfully!');
          console.log(data, ' runProcessConfirm');
          // this.loadingBar.complete();
        },
        (err: HttpErrorResponse) => {
          this.toastr.error('Error: Workflow Executed successfully!');
          console.log(err, ' runProcessConfirm Error');
        }
      );
  }


  sharedUser(id, process) {
    this.userGroupList = [];
    this.processData = process;

    this.apiService
      .userApi()
      .subscribe(
        (data: any) => {
          this.listOfUser = data.data;
          console.log(this.listOfUser, ' userApi');
          this.getSharedwith(id);
        },
        (err: HttpErrorResponse) => {
          console.log(err, ' userApi Error');
        }
      );
  }

  getSharedwith(id) {
    this.apiService
      .sharedwithApi(id)
      .subscribe(
        (data: any) => {
          this.sharedWithUserList = data.response.users;
          for (const usr of this.listOfUser) {
            for (const slt of this.sharedWithUserList) {
              if (usr.user_id == slt) {
                usr.isChecked = true;
              }
            }
          }
          this.userGroupList = this.listOfUser;
        },
        (err: HttpErrorResponse) => {
          console.log(err, ' getSharedwith Error');
        }
      );
  }

  updateAllComplete(usrId, usrList) {
    this.enbleShareBtn = true;
    this.readyUser = [];
    for (const usr of usrList) {
      if (usr.isChecked == true) {
        this.readyUser.push(usr);
      }
    }
  }


  saveUserList() {
    const usrlist = [];
    for (const usr of this.readyUser) {
      usrlist.push(usr.user_id);
    }
    this.apiService
      .saveShareApi(this.processData, usrlist)
      .subscribe(
        (data: any) => {
          console.log(data, ' saveUserList ok ');
          this.getCategory();
        },
        (err: HttpErrorResponse) => {
          console.log(err, ' saveUserList Error');
        }
      );
  }

  sharedProcess() {

  }


}
export interface PeriodicElement {
  processname: string;
  start_date: string;
  end_date: string;
  state: string;
  action: string;
}

