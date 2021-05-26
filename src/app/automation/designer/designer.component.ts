import { AfterViewInit, Component, OnInit, ViewChild, Inject, ElementRef, Renderer2 } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service'
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ApiService } from 'app/service/api.service';
import { animate, state, style, transition, trigger } from '@angular/animations'
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as moment from 'moment';
import { NgbModal, ModalDismissReasons, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { fromEvent, Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

export interface PeriodicElement {
  processName: string;
  forms: string;
  processId: string;
}


@Component({
  selector: 'ms-designer',
  templateUrl: './designer.component.html',
  styleUrls: ['./designer.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*', display: 'block' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class DesignerComponent implements OnInit {

  // dataSource = ELEMENT_DATA;
  columnsToDisplay = ['processName', 'processId'];
  dataSource;
  expandedElement: PeriodicElement | null;
  listData = [];
  dataSourceMain: any;
  closeResult = '';
  Categories: any;

  nw_WorkflowName;
  nw_Description;
  nw_category;
  nw_ManualEffort;
  nw_CostHour;
  Categoryimgs: any;
  category_icon_seleted;
  category_icon_seletedShow = false;
  showiframe = false;
  // @ViewChild('selectIcon', { static: false }) selectIcon: ElementRef;
  clickedElement: Subscription = new Subscription();


  @ViewChild('selectIcon', { static: true }) divClick: ElementRef;
  iframeUrl = null;
  mainIframeUrl: any;


  constructor(
    private pageTitleService: PageTitleService,
    private http: HttpClient,
    private apiService: ApiService,
    private modalService: NgbModal,
    private loadingBar: LoadingBarService,
    config: NgbModalConfig,
    private renderer: Renderer2,
    private toastr: ToastrService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private route: ActivatedRoute
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }



  ngOnInit(): void {
    this.pageTitleService.setTitle('Alerts');
    this.getListOfWorkflow();
    this.getCategories();
    this.loadCategoryimgs();
  }


  getListOfWorkflow() {
    this.loadingBar.start();
    this.apiService
      .designerListOfWorkflow()
      .subscribe(
        (data: any) => {
          this.dataSourceMain = data.response;

          // tslint:disable-next-line:forin
          for (var key in this.dataSourceMain) {
            this.listData.push({
              processName: this.dataSourceMain[key].processName,
              processId: this.dataSourceMain[key].processId,
              forms: this.dataSourceMain[key].forms,
            })
          }
          this.dataSource = this.listData;

          this.loadingBar.complete();
        },
        (err: HttpErrorResponse) => {
          console.log(err, ' AlertsDataApiAlertsDataApi Error');
        }
      );
  }



  getCategories() {
    // this.loadingBar.start();
    this.apiService
      .categoriesApi()
      .subscribe(
        (data: any) => {
          this.Categories = data.response;
        },
        (err: HttpErrorResponse) => {
          console.log(err, ' datadatadata Error');
        }
      );
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


  newWorkflowfun() {
    const data = {
      workflowId: this.nw_WorkflowName,
      description: this.nw_Description,
      tower: this.nw_category,
      manual_effort: this.nw_ManualEffort,
      cost_per_hour: this.nw_CostHour,
      imgurl: this.category_icon_seleted.icon
    }

    this.apiService
      .createNewWorkflowApi(data)
      .subscribe(
        (data: any) => {
          this.toastr.success(data.response);
          this.getListOfWorkflow();
          const element: HTMLElement = document.getElementById('newWorkflow') as HTMLElement;
          element.click();
          this.nw_WorkflowName = [];
          this.nw_Description = [];
          this.nw_category = [];
          this.nw_ManualEffort = [];
          this.nw_CostHour = [];
          this.category_icon_seleted = [];
          console.log(data, ' newWorkflowfun');
        },
        (err: HttpErrorResponse) => {
          this.toastr.error('err');
          console.log(err, ' newWorkflowfun Error');
        }
      );
  }


  loadCategoryimgs() {
    this.apiService
      .categoryLoadApi()
      .subscribe(
        (data: any) => {
          this.Categoryimgs = data;
        },
        (err: HttpErrorResponse) => {
          console.log(err, ' Categoryimgs Error');
        }
      );
  }

  clearIcon() {
    this.category_icon_seletedShow = false;
    this.category_icon_seleted = [];
  }

  selectecategoryItem(data) {
    this.category_icon_seletedShow = true;
    const element: HTMLElement = document.getElementById('selectIcon') as HTMLElement;
    element.click();
    this.category_icon_seleted = {
      category: data.category,
      name: data.name,
      icon: data.icon
    }
  }


  deployThis(data) {
    this.apiService
      .deployApi(data.processName)
      .subscribe(
        (data: any) => {
          this.toastr.success(data.response);
          this.getListOfWorkflow();
          console.log(data.response, ' deployThis');
        },
        (err: HttpErrorResponse) => {
          this.toastr.error('err: Deploy');
          console.log(err, ' deployThis Error');
        }
      );
  }



  unDeployThis(data) {
    this.apiService
      .unDeployApi(data.processName)
      .subscribe(
        (data: any) => {
          this.toastr.success(data.response);
          this.getListOfWorkflow();
          console.log(data.response, ' unDeployThis');
        },
        (err: HttpErrorResponse) => {
          this.toastr.error('err: Un Deploy');
          console.log(err, ' unDeployThis Error');
        }
      );
  }


  creatWorkflow(data) {

    // this.apiService
    //   .createWorkflowFormApi(data.processId)
    //   .subscribe(
    //     (data: any) => {
    //       this.toastr.success(data.response);
    //       this.getListOfWorkflow();
    //       console.log(data.response, ' creatWorkflow');
    //     },
    //     (err: HttpErrorResponse) => {
    //       this.toastr.error('err: Create Workflow Form');
    //       console.log(err, ' creatWorkflow Error');
    //     }
    //   );

    const url = '/automation/formbuilding';
    this.router.navigate([url], {
      queryParams: {
        processId: data.processId
      }
    })

  }


  createTaskForm(data) {
    this.apiService
      .createTaskFormApi(data.processId)
      .subscribe(
        (data: any) => {
          this.toastr.success(data.response);
          this.getListOfWorkflow();
          console.log(data.response, ' creatWorkflow');
        },
        (err: HttpErrorResponse) => {
          this.toastr.error('err: Create Workflow Form');
          console.log(err, ' creatWorkflow Error');
        }
      );
  }

  editBpmn(data) {
    const url = 'http://172.16.1.101:8080/kie-wb?standalone=&path=git://master@';
    const customer_tenant_ids = 'autointelli_internal';
    const userId_process_name = JSON.parse(localStorage.getItem('auth-id')) + '_' + data.processName;
    this.iframeUrl = url + customer_tenant_ids + '/' + data.processName + '/src/main/resources/' + userId_process_name + '.bpmn2'
    this.mainIframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.iframeUrl);
    this.showiframe = true;
  }

  closeIiframe() {
    this.showiframe = false;
    this.iframeUrl = null;
  }


  WorkflowIdDelete(data) {
    this.apiService
      .WorkflowIdDeleteApi(data.processid)
      .subscribe(
        (data: any) => {
          this.toastr.success(data.response);
          this.getListOfWorkflow();
          console.log(data.response, ' WorkflowIdDelete');
        },
        (err: HttpErrorResponse) => {
          this.toastr.error('err: Workflow Delete');
          console.log(err, ' WorkflowIdDelete Error');
        }
      );
  }

  WorkflowIdEdit(data) {

  }


}

