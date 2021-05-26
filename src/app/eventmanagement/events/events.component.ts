import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
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

import { LoadingBarService } from '@ngx-loading-bar/core';
@Component({
  selector: 'ms-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class EventsComponent implements OnInit {

  alertData = [];
  events: string[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource;
  displayedColumns: string[] = ['eventid', 'alertid', 'ci_name', 'component', 'description', 'notes',
    'severity', 'source', 'event_created_time', 'status'];

  expandedElement: PeriodicElement | null;

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
  apiResultPerPage = 10;
  apiStatusType = 'all';
  PreviousPageIndex;
  clientsList: any;
  searchFillterType = null;
  searchFillterVal = null;
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

  searchSort = null;
  apiCurrentPage = 1;
  
  constructor(
    private pageTitleService: PageTitleService,
    private http: HttpClient,
    private apiService: ApiService,
    private loadingBar: LoadingBarService,
  ) { }

  ngOnInit(): void {
    this.pageTitleService.setTitle('Events');
    this.getAlertData();
    this.getGroupby();
    this.getClientsName();
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

  searchByCustomer_id() {
    // const getonlySearchval = [];
    const getonlySearchval = this.clientNameVal.split('::');
    this.searchFillterVal = getonlySearchval[1];
    this.getAlertData();
  }


  StartDate(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
    this.StartDateVal = moment(event.value).format('YYYY-MM-DD hh:mm')
    console.log(moment(event.value).format('YYYY-MM-DD hh:mm'), ' StartDate')
  }

  EndDate(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
    this.endDateVal = moment(event.value).format('YYYY-MM-DD hh:mm');
    console.log(moment(event.value).format('YYYY-MM-DD hh:mm'), ' EndDate')
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
      .eventsApi(apiPayload)
      .subscribe(
        (data: any) => {
          this.loadingBar.complete();
          this.alertData = data.data.event;
          this.alertTotal = data.data.count;
          this.length = this.alertTotal;
          this.dataSource = this.alertData;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;


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

  selectMetrics(e) {

  }

}

export interface PeriodicElement {
  alertid: string;
  ci_name: string;
  component: string;
  event_created_time: string;
  status: string;
  eventid: string;
  description: string;
  notes: string;
  severity: string;
  source: string;
}
