import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, OnInit } from '@angular/core';
import { Data, NavigationEnd, Router } from '@angular/router';
import { ApiService } from 'app/service/api.service';
import { MonitroingServiceService } from 'app/service/monitroing-service.service';
import { TokenStorageService } from 'app/service/token-storage.service';
import { ToastrService } from 'ngx-toastr';
import { PageTitleService } from '../../core/page-title/page-title.service';
import { EChartsOption } from 'echarts';


@Component({
  selector: 'ms-event-analytics-dashboard',
  templateUrl: './event-analytics-dashboard.component.html',
  styleUrls: ['./event-analytics-dashboard.component.scss']
})
export class EventAnalyticsDashboardComponent implements OnInit {

  data: Data[]
  chartOption1: EChartsOption;
  chartOption2: EChartsOption;
  chartOption4: EChartsOption;




  smorefilter = 0;
  fileterval = "all";

  alertlist: any = [];

  dataArr = {
    "filter": this.fileterval,
    "more_filter": this.smorefilter
  };

  color_arr = ["#ef5350", "#e9ab2e", "#398bf7", "#01c0c8", "#00c292"];
  color_obj = {
    "critical": "#FF0000",
    "warning": "#FFA500",
    "completed": "#008000",
    "unknown": "#20B2AA",
    "Remediation": "#398bf7",
    "Diagnosis": "#01c0c8",
    "Aborted": "#ef5350",
    "Active": "#00c292",
    "Pending": "#01c0c8",
  };
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




  xData: string[] = [];
  yData: number[] = [];
  mData: string[] = [];
  nData: number[] = [];

  ngOnInit() {

    this.getAllData();

  }

  getAllData() {
    this.getAlertAnalysisListfn();
    this.getBotResolutionTypefn();
    this.getWorkflowAnalysisfn();
    this.getExecutiveHeadersfn();
    this.getTicketStatusfn();
    this.getAlertStatusfn();
    this.getBotStatusfn();
    this.getTop5Componentfn();
    this.getSupressionStatusfn();
    // this.getCloudServiceAnalyticsfn();



  }
  total_Alerts = 0;
  total_Automations = 0;
  total_Events = 0;
  total_Tickets = 0;

  total_Workflows = 0;
  getExecutiveHeadersfn() {
    const result = this.apiService.getExecutiveHeadersServ(this.dataArr).toPromise();

    result.then((result) => {
      let data = result['data'];
      let obj = [];
      obj = data[0];
      this.total_Alerts = data['Total_Alerts'];
      this.total_Automations = data['Total_Automations'];
      this.total_Events = data['Total_Events'];
      this.total_Tickets = data['Total_Tickets'];
      this.total_Workflows = data['Total_Tickets'];
    })
  };


  getAlertAnalysisListfn() {

    const result = this.apiService.getAlertAnalysisListServ(this.dataArr).toPromise();

    result.then((result) => {
      let data = result['data'];
      let obj = [];
      obj = data[0];

      this.xData.push(obj[0]);
      this.yData.push(obj[1]);
      obj = []; obj = data[1];

      this.xData.push(obj[0]);
      this.yData.push(obj[1]);
      obj = []; obj = data[2];

      this.xData.push(obj[0]);
      this.yData.push(obj[1]);

      this.chartOption1 = {
        xAxis: {
          type: 'category',
          data: ["critical", "unknown", "warning"],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            type: 'bar',
            data: [
              {
                value: this.yData[0],

                itemStyle: { normal: { color: this.color_obj["warning"] } },
              },
              {
                value: this.yData[1],
                itemStyle: { normal: { color: this.color_obj["critical"] } },
              },
              {
                value: this.yData[2],
                itemStyle: { normal: { color: this.color_obj["unknown"] } },
              }
            ]

          },
        ],
      };

    });
  }



  dataChange(filter) {

    this.dataArr.filter = filter;
    this.xData = [];
    this.yData = [];
    this.mData = [];
    this.alertStatusData = [];
    this.ticketStatusData = [];
    this.botStatusData = [];
    this.kpiStatusData = [];
    this.supressionStatusData = [];
    this.nData = [];
    this.aData = [];
    this.bData = [];
    this.getAllData();


  }
  //workflow analysis
  getWorkflowAnalysisfn(): void {


    const result = this.apiService.getWorkflowAnalysisServ(this.dataArr).toPromise();
    this.mData = [];
    this.nData = [];
    result.then((result) => {
      let data = result['data'];
      let obj = [];
      obj = data[0];

      this.mData.push(obj[0]);
      this.nData.push(obj[1]);
      obj = []; obj = data[1];

      this.mData.push(obj[0]);
      this.nData.push(obj[1]);


      this.chartOption2 = {
        xAxis: {
          type: 'category',
          data: this.mData,
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            type: 'bar',
            data: [
              {
                value: this.nData[0],

                itemStyle: { normal: { color: 'blue' } },
              },
              {
                value: this.nData[1],
                itemStyle: { normal: { color: 'red' } },
              },

            ]

          },
        ],
      };

    });

  }

  aData: string[] = [];
  bData: number[] = [];

  //Bot Resolution
  getBotResolutionTypefn(): void {

    const result = this.apiService.getBotResolutionTypeServ(this.dataArr).toPromise();
    this.aData = [];
    this.bData = [];
    result.then((result) => {
      let data = result['data'];
      let obj = [];
      obj = data[0];

      this.aData.push(obj[0]);
      this.bData.push(obj[1]);
      obj = []; obj = data[1];

      this.aData.push(obj[0]);
      this.bData.push(obj[1]);


      this.chartOption2 = {
        xAxis: {
          type: 'category',
          data: this.aData,
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            type: 'bar',
            data: [
              {
                value: this.bData[0],

                itemStyle: { normal: { color: 'blue' } },
              },
              {
                value: this.bData[1],
                itemStyle: { normal: { color: 'red' } },
              },

            ]

          },
        ],
      };

    });


  }

  //Alert Status Doughnut Chart-1

  alertStatusData: any = [];
  getAlertStatusfn() {
    const result = this.apiService.getAlertStstusServ(this.dataArr).toPromise();

    result.then((result) => {
      let data = result['data'];
      let obj = [];
      obj = data[0];
      let value = { "name": obj[0], "value": obj[1] }
      this.alertStatusData.push(value)
      obj = data[1];
      value = { "name": obj[0], "value": obj[1] }
      this.alertStatusData.push(value)
      obj = data[2];
      value = { "name": obj[0], "value": obj[1] }
      this.alertStatusData.push(value)
      obj = data[3];
      value = { "name": obj[0], "value": obj[1] }
      this.alertStatusData.push(value)
      obj = data[4];
      value = { "name": obj[0], "value": obj[1] }
      this.alertStatusData.push(value)


      this.chartOption4 = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: 'Alert Status',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data:
              this.alertStatusData

          }
        ]
      };
    }
    )
  }
  //ends here---------
  //ticket function
  chartOption5;
  ticketStatusData: any = [];
  getTicketStatusfn() {
    const result = this.apiService.getTickeStatusServ(this.dataArr).toPromise();

    result.then((result) => {
      let data = result['data'];
      let obj = [];
      obj = data[0];
      let value = { "name": obj[0], "value": obj[1] }
      this.ticketStatusData.push(value)
      obj = data[1];
      value = { "name": obj[0], "value": obj[1] }
      this.ticketStatusData.push(value)
      obj = data[2];
      value = { "name": obj[0], "value": obj[1] }
      this.ticketStatusData.push(value)

      this.chartOption5 = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: 'Alert Status',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data:
              this.ticketStatusData

          }
        ]
      };
    }
    )
  }

  // Bot Status Doughnut Chart-3
  chartOption6;
  botStatusData: any = [];
  getBotStatusfn() {
    const result = this.apiService.getAutomationStstusServ(this.dataArr).toPromise();


    result.then((result) => {
      let data = result['data'];
      let obj = [];
      obj = data[0];
      let value = { "name": obj[0], "value": obj[1] }
      this.botStatusData.push(value)
      obj = data[1];
      value = { "name": obj[0], "value": obj[1] }
      this.botStatusData.push(value)
      obj = data[2];
      value = { "name": obj[0], "value": obj[1] }
      this.botStatusData.push(value)
      obj = data[3];
      value = { "name": obj[0], "value": obj[1] }
      this.botStatusData.push(value)

      this.chartOption6 = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: 'Alert Status',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data:
              this.botStatusData

          }
        ]
      };
    }
    )
  }

  //top5 kpis  getTop5ComponentServ
  chartOption7;
  kpiStatusData: any = [];
  getTop5Componentfn() {
    const result = this.apiService.getTop5ComponentServ(this.dataArr).toPromise();


    result.then((result) => {
      let data = result['data'];
      let obj = [];
      obj = data[0];
      let value = { "name": obj[0], "value": obj[1] }
      this.kpiStatusData.push(value)
      obj = data[1];
      value = { "name": obj[0], "value": obj[1] }
      this.kpiStatusData.push(value)
      obj = data[2];
      value = { "name": obj[0], "value": obj[1] }
      this.kpiStatusData.push(value)
      obj = data[3];
      value = { "name": obj[0], "value": obj[1] }
      this.kpiStatusData.push(value)
      obj = data[4];
      value = { "name": obj[0], "value": obj[1] }
      this.kpiStatusData.push(value)

      this.chartOption7 = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: 'Top 5 KPIs',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data:
              this.kpiStatusData

          }
        ]
      };
    }
    )
  }










  //last

  chartOption8;
  supressionStatusData: any = [];
  x_data: any = [];
  event: any = [];
  alert: any = [];

  getSupressionStatusfn() {
    const result = this.apiService.getSupressionServ(this.dataArr).toPromise();


    result.then((result) => {
      let data = result['data'];

      this.x_data = data['x-axis'];
      this.alert = data['alert'];
      console.log("alert" + this.alert)

      this.event = data['event'];
      console.log("event" + this.event)

      console.log("x Data========" + this.x_data)


      this.chartOption8 = {
        title: {
          text: 'SupressionStatus'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: ['Event', 'Alert']
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: this.x_data
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'Alert',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: this.alert
          },
          {
            name: 'Event',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: this.event
          },


        ]
      };
    }
    )
  }



}


