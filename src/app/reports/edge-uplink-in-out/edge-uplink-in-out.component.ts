import { Component, ViewEncapsulation, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';

import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatGridListModule } from '@angular/material/grid-list';


import { ApiService } from '../../service/api.service';
import { from } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import * as moment from 'moment';

@Component({
  selector: 'ms-edge-uplink-in-out',
  templateUrl: './edge-uplink-in-out.component.html',
  styleUrls: ['./edge-uplink-in-out.component.scss']
})
export class EdgeUplinkInOutComponent implements OnInit, OnDestroy {
  SelectedTechnology;
  Selected_Customer;
  TechnologyVal = [];
  events: string[] = [];
  startDate: string;
  endDate: string;
  setCustomer: any;
  getTechnologys: any;
  reportGridget;
  triggerReport;

  constructor(
    private pageTitleService: PageTitleService,
    private http: HttpClient,
    private apiService: ApiService,
    private elementRef: ElementRef
  ) { }




  ngOnInit(): void {
    this.pageTitleService.setTitle('VM Summary Report');
    this.reportrepocustgridget();

  }


  selectTechnology(e) {

    this.getTechnologys = e;

    this.apiService
      .vmwareCustomerApi(e)
      .subscribe(
        (res: any) => {
          this.TechnologyVal = res.data.slice(1);
        },
        (err: HttpErrorResponse) => {
          console.log(err, ' data Error');
        }
      );
  }

  select_Customer(e) {
    this.setCustomer = e;
  }


  StartDate(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
    this.startDate = moment(event.value).format('YYYY-MM-DD hh:mm');
  }


  EndDate(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
    this.endDate = moment(event.value).format('YYYY-MM-DD hh:mm');
  }

  getDetails() {
    const clearCstId = this.setCustomer[0].split('::');

    const info = {
      technology: this.getTechnologys,
      accountid: clearCstId[1],
      startdate: this.startDate,
      enddate: this.endDate,
    }
    this.apiService
      .vmwareDownloadApi(info)
      .subscribe(
        (res: any) => {
          const objs = res;

          this.triggerReport = setInterval(() => {
            this.reportrepocustgridget();
          }, 8000);

        },
        (err: HttpErrorResponse) => {
          console.log(err, ' data Error');
        }
      );
  }

  ngOnDestroy() {
    if (this.triggerReport) {
      clearInterval(this.triggerReport);
    }
  }


  reportrepocustgridget() {
    this.apiService
      .reportgridgetApi()
      .subscribe(
        (res: any) => {
          const objs = res;
          this.reportGridget = res.data.slice(1);
        },
        (err: HttpErrorResponse) => {
          console.log(err, ' data Error');
        }
      );
  }

}
