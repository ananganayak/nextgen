import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { ApiService } from 'app/service/api.service';
import { ToastrService } from 'ngx-toastr';
import { ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { fadeInAnimation } from '../../core/route-animation/route.animation';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { SingleDataSet, Label, Color, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';



@Component({
  selector: 'ms-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  roi_data;
  roi: any;
  Organization: any;
  Towers: any;
  Processes: any;
  Executions: any;
  HoursAutomated: any;
  ExecutionHoursAutomated: any;


  // Process Status Count start
  barChartOptions = {
    responsive: true,
  };
  barChartType = 'bar';
  barChartLegend = false;
  barChartPlugins = [];
  barChartLabels;
  barChartData;
  // Process Status Count end



  // Process By Running Time start
  ProcessByRunningTimeChart = false;
  bubbleChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{
        ticks: {
          min: 0,
          max: 30,
        }
      }],
      yAxes: [{
        ticks: {
          min: 0,
          max: 30,
        }
      }]
    }
  };
  bubbleChartType: ChartType = 'bubble';
  bubbleChartLegend = true;
  bubbleChartData: ChartDataSets[] = [];
  // Process By Running Time end


  workflowstatus_data: any;
  workflowstatus_dataset;
  showWorkflowstatusChart = false;
  ProcessbyRunTime: any;
  ProcessbyRunTime_dataSet: any;


  // Process By Type Chart Start

  processcategoryChart = false;
  pieChartOptions: ChartOptions = {
    responsive: true,
  };
  pieChartLabels: Label[];
  pieChartData: SingleDataSet;

  pieChartType: ChartType = 'pie';
  pieChartLegend = true;
  pieChartPlugins = [];
  processcategoryApi: any;
  processcategoryApi_dataSet: any;
  processcategoryApi_dataset: any;
  processcategoryApi_dataset_Title: any;
  processcategoryApi_dataset_Val: any;
  // Process By Type Chart End


  ProcessByStartDate_lineChartData;
  ProcessByStartDate_lineChartLabels;

  ProcessByStartDate_lineChartOptions: ChartOptions = {
    responsive: true
  };
  ProcessByStartDate_lineChartColors: Color[] = [
    {
      borderColor: '#014e70',
      backgroundColor: '#03a9f4'
    }
  ];
  ProcessByStartDate_lineChartLegend = true;
  ProcessByStartDate_lineChartType = 'line';
  ProcessByStartDate_lineChartPlugins = [];

  getProcessbysdChart = false;
  processbysd_dataSet: any;
  processbysd_dataSet_val: any;
  processbysd_dataSet_Title: any;
  getProcessbyed_dataSet: any;
  getProcessbyed_dataSet_val: any;
  getProcessbyed_dataSet_Title: any;
  getgetProcessbyedChart = false;
  // ProcessByStartDate Start

  // Process By End Date Start
  lineChartData;
  lineChartLabels;
  lineChartOptions: (ChartOptions) = {
    responsive: true,
  };
  lineChartColors: Color[] = [
    {
      borderColor: '#2d1657',
      backgroundColor: '#673ab7',
    },
  ];
  lineChartLegend = true;
  lineChartType = 'line';
  lineChartPlugins = [];
  processbyedChart = false;
  // Process By End Date End

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
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit(): void {
    this.getRoi();
    this.getWorkflowstatus();
    this.getProcessbyRunTime();
    this.getProcesscategory();
    this.getProcessbysdApi();
    this.getProcessbyed();
  }

  getRoi() {
    this.loadingBar.start();
    this.apiService
      .roiApi()
      .subscribe(
        (data: any) => {
          this.roi_data = data.data;
          this.roi = this.roi_data['ROI'];
          this.Organization = this.roi_data['Organization'];
          this.Towers = this.roi_data['Towers'];
          this.Processes = this.roi_data['Processes'];
          this.Executions = this.roi_data['Executions'];
          this.HoursAutomated = this.roi_data['Hours Automated'];
          this.ExecutionHoursAutomated = this.roi_data['Execution Hours Automated'];
          // console.log(this.roi_data, ' getRoi');
          this.loadingBar.complete();
        },
        (err: HttpErrorResponse) => {
          this.toastr.error('err: getRoi');
          console.log(err, ' getRoi Error');
        }
      );
  }

  getWorkflowstatus() {
    // this.loadingBar.start();
    this.apiService
      .workflowstatusApi()
      .subscribe(
        (data: any) => {
          this.workflowstatus_data = data.data.splice(1);

          const datasetname = [];
          const datasetvalue = [];
          for (let i = 0; i < this.workflowstatus_data.length; i++) {
            datasetname.push(this.workflowstatus_data[i][0]);
            datasetvalue.push(this.workflowstatus_data[i][1]);
          }
          this.barChartData = [
            { data: datasetvalue }
          ];
          this.barChartLabels = datasetname;
          this.showWorkflowstatusChart = true;
        },
        (err: HttpErrorResponse) => {
          this.toastr.error('err: workflowstatus_data');
          console.log(err, ' workflowstatus_data Error');
        }
      );
  }

  getProcessbyRunTime() {
    this.apiService
      .processbyruntimeApi()
      .subscribe(
        (data: any) => {
          this.ProcessbyRunTime = data.data.splice(1);
          this.ProcessbyRunTime_dataSet = this.ProcessbyRunTime.map(function (item) { return item[1]; });

          // this.bubbleChartData = [
          //   {
          //     data: [
          //       { x: 10, y: 10, r: 10 }
          //     ],
          //     label: 'Series A',
          //   },
          // ];

          console.log(this.ProcessbyRunTime, ' getProcessbyRunTime');

          this.bubbleChartData = [
            {
              data: [this.ProcessbyRunTime_dataSet],
              label: 'Series A',
            },
          ];
          this.ProcessByRunningTimeChart = true;
        },
        (err: HttpErrorResponse) => {
          this.toastr.error('err: getProcessbyRunTime');
          console.log(err, ' getProcessbyRunTime Error');
        }
      );
  }

  getProcesscategory() {
    this.apiService
      .processcategoryApi()
      .subscribe(
        (data: any) => {
          this.processcategoryApi = data.data.splice(1);
          this.processcategoryApi_dataset_Val = this.processcategoryApi.map(function (item) { return item[1]; });
          this.processcategoryApi_dataset_Title = this.processcategoryApi.map(function (item) { return item[0]; });
          this.pieChartLabels = this.processcategoryApi_dataset_Title;
          this.pieChartData = this.processcategoryApi_dataset_Val;
          // console.log(this.processcategoryApi_dataset_Title, ' getProcesscategory ', this.processcategoryApi_dataset_Val);
          this.processcategoryChart = true;
        },
        (err: HttpErrorResponse) => {
          this.toastr.error('err: getProcesscategory');
          console.log(err, ' getProcesscategory Error');
        }
      );
  }

  getProcessbysdApi() {
    this.apiService
      .processbysdApi()
      .subscribe(
        (data: any) => {
          this.processbysd_dataSet = data.data.splice(1);
          this.processbysd_dataSet_val = this.processbysd_dataSet.map(function (item) { return item[1]; });
          this.processbysd_dataSet_Title = this.processbysd_dataSet.map(function (item) { return item[0]; });
          this.ProcessByStartDate_lineChartData = [
            {
              data: this.processbysd_dataSet_val,
              label: 'Process By Start Date'
            }
          ];
          this.ProcessByStartDate_lineChartLabels = this.processbysd_dataSet_Title;
          console.log(this.processbysd_dataSet, ' getProcessbysdApi ');
          this.getProcessbysdChart = true;
        },
        (err: HttpErrorResponse) => {
          this.toastr.error('err: getProcesscategory');
          console.log(err, ' getProcesscategory Error');
        }
      );
  }


  getProcessbyed() {
    this.apiService
      .processbyedApi()
      .subscribe(
        (data: any) => {
          this.getProcessbyed_dataSet = data.data.splice(1);
          this.getProcessbyed_dataSet_val = this.getProcessbyed_dataSet.map(function (item) { return item[1]; });
          this.getProcessbyed_dataSet_Title = this.getProcessbyed_dataSet.map(function (item) { return item[0]; });
          this.lineChartData = [
            {
              data: this.getProcessbyed_dataSet_val,
              label: 'Process By End Date'
            },
          ];
          this.lineChartLabels = this.getProcessbyed_dataSet_Title;
          // console.log(this.getProcessbyed_dataSet_val, ' getProcessbyed ', this.getProcessbyed_dataSet_Title);
          this.processbyedChart = true;
        },
        (err: HttpErrorResponse) => {
          this.toastr.error('err: getProcessbyed');
          console.log(err, ' getProcessbyed Error');
        }
      );
  }



}
