import { AfterViewInit, Component, OnInit, ViewChild, Inject } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service'
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ApiService } from 'app/service/api.service';
import { animate, state, style, transition, trigger } from '@angular/animations'
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as moment from 'moment';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { LoadingBarService } from '@ngx-loading-bar/core';
import  {io} from 'socket.io-client';
import { Router } from '@angular/router';
// import {MatExpansionModule} from '@angular/material/expansion';
@Component({
  selector: 'ms-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})


export class AlertsComponent implements OnInit {
  alertData = [];
  events: string[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource = [];
  displayedColumns: string[] = ['alertid', 'aci_name', 'acomponent', 'alert_created_time', 'astatus', 'BOT_Name','TicketID', 'Triage'];
  expandedElement: PeriodicElement;
  closeResult = '';

  private socket: any;
  public socketdata: any;

  ticketdropdownLov = [
    {
        id: '1',
        name: 'Update',
        value: 'update'
    },
    {
        id: '2',
        name: 'Status Change',
        value: 'status_change'
    },
    {
        id: '3',
        name: 'Worklog Update'
        , value: 'worklog_update'
    },
    {
        id: '4',
        name: 'Resolve',
        value: 'resolve'
    },
  ];
  

  addIcon:boolean=false;

  panelOpenState = false;
  errorMessage = '';
  // MatPaginator Inputs
  length;
  pageSize = 10;
  
  pageSizeOptions: number[] = [5, 10, 25, 100];

  SelectedMetricsVals;
  // MatPaginator Output
  alertTotal = [];
  getGroupByData = [];
  getGroupByDataOpen: any;
  getGroupByDataWip: any;
  getGroupByDataPending: any;
  getGroupByDataResolved: any;
  getGroupByDataClosed: any;

  apiCountStartFrom = 0;
  apiCurrentPage = 1;
  apiResultPerPage = 10;
  apiStatusType = 'all';
  PreviousPageIndex;
  clientsList: any;
  searchFillterType = null;
  searchFillterVal = null;
  searchSort = null;
  customerid;
  clientNameVal;

  myControl = new FormControl();
  options = [];
  filteredOptions: Observable<string[]>;
  searchFiltterVal;
  ShowCustomer_id = false;
  showDate = false;
  showUserInput = false;
  StartDateVal: string;
  endDateVal: string;
  userInput;
  TicketFormData;
  isTicketID;

  Subject;
  Description;
  Type;

  constructor(
    private pageTitleService: PageTitleService,
    private http: HttpClient,
    private apiService: ApiService,
    private modalService: NgbModal,
    private loadingBar: LoadingBarService,
    private toastr: ToastrService,
    private router: Router
  ) { 

    // Connect Socket with server URL
    this.socket = io(this.apiService.webSocketApi);
  }

  ngOnInit(): void {
    this.pageTitleService.setTitle('Alerts')
    this.getAlertData();
    this.getGroupby();
    this.getClientsName();
    this.getTicketFormMasterData();
    this.autoRefreshFn();
  }

  isTicketStatus;
  isTicketSelID;
  isTicketFormval = [];
  getFormDetFn(content, val, alertid, itsmid) {
    this.isTicketStatus = val;
    this.isTicketID = alertid;
    this.isTicketSelID = itsmid;
    this.apiService.getTicketFormValService(this.isTicketStatus).subscribe(
      data => {
        console.log(data);
        if (data['result'] === 'success') {
          this.isTicketFormval = data['data'].slice(1);
          console.log(this.isTicketFormval);
          this.toastr.success(data['result']);
        } else {
          this.toastr.error(data['data']);
        }
      },
      err => {
        console.log(err);
        this.errorMessage = err.error.message;
      }
    );
    
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  btnTicketFormSubmit() {
    // const info = {
    //   Subject: this.Subject,
    //   Description: this.Description,
    //   Type: this.Type,
    //   Alert_id: this.isTicketID,
    //   action_cmd: 'createticket'
    // }
    const info = [];
    if(this.isTicketSelID){
      info["Ticket ID"] = this.isTicketSelID;
    }

    for (var i = 0; i < this.isTicketFormval.length; i++) {
      var skey = this.isTicketFormval[i][1];
      var form_ele = $("#formworkflow .form-control[name='ctrl" + skey + "']");
      info[skey] = form_ele.val();
    }

    var ticket_action_cmd = "";
    if (this.isTicketStatus == "create") {
        ticket_action_cmd = "createticket";
        info["Alert_id"] = this.isTicketID;
    } else if (this.isTicketStatus == "status_change") {
        ticket_action_cmd = "changeticketstatus";
    } else if (this.isTicketStatus == "worklog_update") {
        ticket_action_cmd = "addticketworklog";
    } else if (this.isTicketStatus == "resolve") {
        ticket_action_cmd = "resolveticket";
    } else if (this.isTicketStatus == "update") {
        ticket_action_cmd = "changegroup";
    }

    info["action_cmd"] = ticket_action_cmd;

    this.apiService
      .createticketApi(info)
      .subscribe(
        (data: any) => {
          console.log(data.result, ' datadata ');
          if (data.result === 'failure') {
            console.log(data, ' datadata failure');
            this.toastr.error(data['data']);
          } else {
            // console.log(data, ' datadata Sucessfull');
            if(typeof data.data === 'string'){
              this.toastr.success(data['data']);
            }else{
              this.toastr.success("Ticket ID : " + data.data['ticket_id'] + " created successfully!");
              this.getAlertData();
            }
          }
        },
        (err: HttpErrorResponse) => {
          console.log(err, ' getClientsName Error');
        }
      );
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

  searchFiltter(e) {
    console.log(' searchFiltterVal', e);
    this.searchFillterType = e;
    if (e === 'customer_id') {
      this.ShowCustomer_id = true;
      this.showDate = false;
      this.showUserInput = false;
    } else if (e === 'datetime') {
      this.showDate = true;
      this.ShowCustomer_id = false;
      this.showUserInput = false;
    } else {
      this.showUserInput = true;
      this.ShowCustomer_id = false;
      this.showDate = false;
    }
  }

  botTimelineData;
  // get bot info function 
  showBotInfoFn(modal, autoID, alertID){

    const botAlertId = alertID;
    const botAutomatioId = autoID;

    this.apiService.getBotInfoService(botAlertId).subscribe((data: any) => {
          console.log(data.result, ' datadata ');
          if (data.result === 'failure') {
            this.toastr.error(data['data']);
          } else {
            console.log(data, ' datadata Sucessfull');
            this.botTimelineData = data.data;
          }
        },
        (err: HttpErrorResponse) => {
          console.log(err, ' getClientsName Error');
        }
      );

    this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  searchByCustomer_id() {
    // const getonlySearchval = [];
    const getonlySearchval = this.clientNameVal.split('::');
    this.searchFillterVal = getonlySearchval[1];
    this.getAlertData();
  }


  StartDate(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
    this.StartDateVal = moment(event.value).format('YYYY_MM_DD')
    console.log(moment(event.value).format('YYYY_MM_DD hh:mm'), ' StartDate')
  }

  EndDate(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
    this.endDateVal = moment(event.value).format('YYYY_MM_DD');
    console.log(moment(event.value).format('YYYY_MM_DD hh:mm'), ' EndDate')
  }


  searchByDateTime() {
    this.searchFillterVal = this.StartDateVal + '-' + this.endDateVal;
    this.getAlertData();
  }


  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  getStatusType(status) {
    this.apiStatusType = status;
    this.getAlertData();
  }


  searchByUserInput() {
    console.log(this.userInput, ' userInput')
    this.searchFillterVal = this.userInput;
    this.getAlertData();
  }

  handlePage(e: any) {
    // this.PreviousPageIndex = e.previousPageIndex;
    this.apiCountStartFrom = e.pageIndex * e.pageSize;
    this.apiResultPerPage = e.pageSize;
    this.getAlertData();
  }

  clearSearch() {
    this.userInput = '';
    this.clientNameVal = '';

    this.searchFillterType = null;
    this.searchFillterVal = null;
    this.getAlertData();
  }

  tableheader(name) {
    console.log(name, ' object', this.sort.direction)

    
    if(this.sort.direction == 'asc'){
      this.searchSort = name + "_a";
    }else if(this.sort.direction == 'desc'){
      this.searchSort = name + "_d"
    }
    this.apiCurrentPage = 1;
    this.getAlertData();

  }

  getAlertData() {
    this.loadingBar.start();
    const istart = (this.apiCurrentPage - 1) * this.apiCountStartFrom
    const apiPayload = {
      apiCountStartFrom: istart,
      apiResultPerPage: this.apiResultPerPage,
      apiStatusType: this.apiStatusType,
      searchFillterType: this.searchFillterType,
      searchFillterVal: this.searchFillterVal, 
      searchSortVal: this.searchSort, 
    }

    this.apiService
      .AlertsDataApi(apiPayload)
      .subscribe(
        (data: any) => {
          this.alertData = data.data.alert;
          this.alertTotal = data.data.count;
          this.length = this.alertTotal;
          this.dataSource = this.alertData;
          // this.dataSource.paginator = this.paginator;
          // this.dataSource.sort = this.sort;
          this.loadingBar.complete();
        },
        (err: HttpErrorResponse) => {
          console.log(err, ' AlertsDataApiAlertsDataApi Error');
        }
      );
  }

  // get CSV Download
  downloadCsvfn(){
    const istart = (this.apiCurrentPage - 1) * this.apiCountStartFrom
    const apiPayload = {
      apiCountStartFrom: istart,
      apiResultPerPage: this.apiResultPerPage,
      apiStatusType: this.apiStatusType,
      searchFillterType: this.searchFillterType,
      searchFillterVal: this.searchFillterVal, 
      searchSortVal: this.searchSort, 
    }
    this.apiService.getCSVLinkservice(apiPayload).subscribe(
        (data: any) => {
          if(data.result == "success"){
            this.toastr.success(data['result']);
            let a = document.createElement('a');
            a.href = data['data'].link;
            a.download = 'Book.csv';
            document.body.appendChild(a);
            a.click();        
            document.body.removeChild(a);
          }else{
            this.toastr.error(data['data']);
          }
        },
        (err: HttpErrorResponse) => {
          console.log(err, ' AlertsDataApiAlertsDataApi Error');
        }
      );
  }

  getGroupby() {

    this.apiService
      .groupbyApi()
      .subscribe(
        (data: any) => {
          this.getGroupByDataOpen = data.data.open;
          this.getGroupByDataWip = data.data.wip;
          this.getGroupByDataPending = data.data.pending;
          this.getGroupByDataResolved = data.data.resolved;
          this.getGroupByDataClosed = data.data.closed;
        },
        (err: HttpErrorResponse) => {
          console.log(err, ' getGroupby Error');
        }
      );
  }

  isTFMasterval;
  getTicketFormMasterData(){
    this.apiService.getTFMasterValService().subscribe(
      data => {
        console.log(data);
        if (data['result'] === 'success') {
          this.isTFMasterval = data['data'];
          console.log(this.isTicketFormval);
          this.toastr.success(data['result']);
        } else {
          this.toastr.error(data['data']);
        }
      },
      err => {
        console.log(err);
        this.errorMessage = err.error.message;
      }
    );
  }


  getClientsName() {
    this.apiService
      .clientsNameApi()
      .subscribe(
        (data: any) => {
          this.clientsList = data.data.slice(1);
          for (let i = 0; i < this.clientsList.length; i++) {
            const element = this.clientsList[i][0];
            this.options.push(element);
          }
          this.filteredOptions = this.myControl.valueChanges
            .pipe(
              startWith(''),
              map(value => this._filter(value))
            );
        },
        (err: HttpErrorResponse) => {
          console.log(err, ' getClientsName Error');
        }
      );
  }

  refreshAlertSummary(dataset){
    var itemp = 0;
    if (dataset.total != 0) {
        this.alertTotal = this.alertTotal + dataset.total;
        // $scope.span_total_count = itemp;
    }
    if (dataset.open != 0) {
        this.getGroupByDataOpen = this.getGroupByDataOpen + dataset.open;
        $(".open_count").text(itemp);
    }
    if (dataset.wip != 0) {
        this.getGroupByDataWip = this.getGroupByDataWip + dataset.wip;
        $(".wip_count").text(itemp);
    }
    if (dataset.pending != 0) {
      this.getGroupByDataPending = this.getGroupByDataPending + dataset.pending;
        $(".pending_count").text(itemp);
    }
    if (dataset.resolve != 0) {
      this.getGroupByDataResolved = this.getGroupByDataResolved + dataset.resolve;
        $(".resolved_count").text(itemp);
    }
    if (dataset.closed != 0) {
      this.getGroupByDataClosed = this.getGroupByDataClosed + dataset.closed;
        $(".closed_count").text(itemp);
    }
  }

  // Live Alert grid data web socket function
  autoRefreshFn(){

    this.socket.on('connect', function () {
      console.log("Alert socket Connected");
    });

    this.socket.on('alert', function (data) {
      // console.log("Alert socket Connected");
      this.socketdata = data;
      console.log(this.socketdata);
      if(this.socketdata.Action == "create" && this.socketdata.Module == "alert"){
        var data_arr = this.socketdata.Data;
        this.refreshAlertSummary(data_arr.status_legends);
        //debugger;
        var event_data = data_arr.event_details;
        const sevent_date = new Date(event_data["event_created_time"] * 1000);
        const sevent_dates = sevent_date.toLocaleString();
        event_data["event_created_time"] = sevent_dates;

        var screate_date = new Date(data_arr.alert_details["event_created_time"] * 1000);
        const screate_dates = screate_date.toLocaleString();
        var alert_row = {
            "alertid": data_arr.alert_details["alertid"],
            "aci_name": data_arr.alert_details["ci_name"],
            "acomponent": data_arr.alert_details["component"],
            "adescription": data_arr.alert_details["description"],
            "anotes": data_arr.alert_details["notes"],
            "aseverity": data_arr.alert_details["severity"],
            "alert_created_time": screate_dates,
            "asource": data_arr.alert_details["source"],
            "astatus": data_arr.alert_details["status"],
            "automationid": "",
            "itsmid": "",
            "associated_events": [event_data]
        };
        var alert_datatable = this.dataSource;
        alert_datatable.unshift(alert_row);
        alert_datatable = alert_datatable.slice(0, this.pageSize);
        //console.log(alert_datatable);
        this.dataSource = alert_datatable;
        // $(".alert_table tbody:first").effect("highlight", {color: 'ivory'}, 3000);
      }else{
        var data_arr = this.socketdata.Data;
        if (data_arr.status_legends) {
          this.refreshAlertSummary(data_arr.status_legends);
        }
        var alert_datatable = this.dataSource;
        for (var i = 0; i < alert_datatable.length; i++) {
            // console.log(alert_datatable[i]);
            if (alert_datatable[i].alertid == data_arr.alertid) {
                //console.log(alert_datatable[i].alertid);
                if (data_arr.alert_details) {
                    alert_datatable[i].aseverity = data_arr.alert_details["severity"];
                }
                if (data_arr.status_details) {
                    alert_datatable[i].astatus = data_arr.status_details["status"];
                }
                if (data_arr.ticket_details) {
                    alert_datatable[i].itsmid = data_arr.ticket_details["ticketid"];
                }
                if (data_arr.bot_details) {
                    alert_datatable[i].automationid = data_arr.bot_details["botname"];
                }
                if (data_arr.event_details) {
                  const event_arr = data_arr.event_details;
                  const sevent_date = new Date(event_arr["event_created_time"] * 1000);
                  const sevent_dates = sevent_date.toLocaleString();
                  event_arr["event_created_time"] = sevent_dates;
                  //console.log(alert_datatable[i].associated_events);
                  alert_datatable[i].associated_events.unshift(event_arr);
                }
                this.dataSource = alert_datatable;
                break;
            }
        }
      }
    });
  }
//triage list fun........................
  getTriageListFn(alertId){
    this.apiService.evmAlertApi(alertId).subscribe(
      data => {
        console.log(data);
      }
    );
      
  }

  isIconClicked(el){
    this.expandedElement = this.expandedElement === el ? null : el;
    this.addIcon= !this.addIcon;
  }


  backToDashboardfn(){
    this.router.navigateByUrl("monitoring/nxt-gen-support-dashboard");
  }

}
export interface PeriodicElement {
  alertid: string;
  aci_name: string;
  acomponent: string;
  alert_created_time: string;
  astatus: string;
  TicketID: string;
  Triage: string;
  BOT_Name: string;
}

