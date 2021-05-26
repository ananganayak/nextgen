
import { ApiService } from 'app/service/api.service';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';

import { Router, NavigationEnd, Data } from '@angular/router';
import { TokenStorageService } from '../../service/token-storage.service';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription, interval } from 'rxjs';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MonitroingServiceService } from './../../service/monitroing-service.service';

import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EChartsOption } from 'echarts';
import { data } from 'jquery';

@Component({
  selector: 'ms-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {




  chartOption1 : EChartsOption;


  constructor(private pageTitleService: PageTitleService,
    private toastr: ToastrService,
    private router: Router,
    public monitorService: MonitroingServiceService,
    private tokenStorage: TokenStorageService,
    private apiService: ApiService,
    private cdRef: ChangeDetectorRef,
    private elementRef: ElementRef,
    private http: HttpClient
  ) {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {

      }
    });
  }

  
row=[];
dataArr={};
xData:any=[];
yData:any=[];
//getloudServiceAnalyticsServ
getCloudServiceAnalyticsfn(): void {
   
  // const result=this.apiService.getCloudServiceAnalyticsServ("ECI-AutoScale").toPromise();
  // result.then( (result) => {
  //   console.log("this is result " + result)
  //   let data=result['data'];
  //   let obj=[];
  //   obj=data[0];
  
  // let obj=result["data"]
  // this.xData=obj["NxtGen-Autoscale-1-GNwH(192.168.2.2)"]
  
 
    this.chartOption1  = {
      title: {
          text: '动态数据',
          subtext: '纯属虚构'
      },
      tooltip: {
          trigger: 'axis',
          axisPointer: {
              type: 'cross',
              label: {
                  backgroundColor: '#283b56'
              }
          }
      },
      legend: {
          data:['最新成交价', '预购队列']
      },
      toolbox: {
          show: true,
          feature: {
              dataView: {readOnly: false},
              restore: {},
              saveAsImage: {}
          }
      },
      dataZoom: {
          show: false,
          start: 0,
          end: 100
      },
      xAxis: [
          {
              type: 'category',
              boundaryGap: true,
              data: [4,5,6,7,8]
          },
          {
              type: 'category',
              boundaryGap: true,
              data: [1,2,3,4,5,6]
          }
      ],
      yAxis: [
          {
              type: 'value',
              scale: true,
              name: '价格',
              max: 30,
              min: 0,
              boundaryGap: [0.2, 0.2]
          },
          {
              type: 'value',
              scale: true,
              name: '预购量',
              max: 1200,
              min: 0,
              boundaryGap: [0.2, 0.2]
          }
      ],
      series: [
          {
              name: '预购队列',
              type: 'bar',
              xAxisIndex: 1,
              yAxisIndex: 1,
              data: [7,8,9,6,5]
          },
          {
              name: '最新成交价',
              type: 'line',
              data: [3,4,5,8,9]
          }
      ]
  };
     

  // })
}





 

  ngOnInit(): void {
    this.getCloudServiceAnalyticsfn();

    

  } 
}
