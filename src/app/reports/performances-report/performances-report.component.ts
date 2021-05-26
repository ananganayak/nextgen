import { Component, ViewEncapsulation, OnInit, ElementRef, ViewChild } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

import { ApiService } from '../../service/api.service';
import { from } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import moment from 'moment';
import * as moment from 'moment';
import { MatGridListModule } from '@angular/material/grid-list';

import { Chart } from 'chart.js';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';

import { ngxCsv } from 'ngx-csv/ngx-csv';
import jspdf from 'jspdf';  
import html2canvas from 'html2canvas'; 


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ms-performances-report',
  templateUrl: './performances-report.component.html',
  styleUrls: ['./performances-report.component.scss']
})

export class PerformancesReportComponent implements OnInit {

  // =============================== start
  lineChartLabels = [];
  lineChartOptions: any = {
    responsive: true
  };
  lineChartLegend = true;
  lineChartType = 'line';
  lineChartData = [];
  // ============================== end




  statusval;
  selcategrp;
  search_sorting;
  gridList: any[];
  events: string[] = [];

  SelectedCategory;
  SelectedSubCategory;

  serviceval = [
    {
      'id': 1,
      'name': 'Managed Service',
      'value': 'ms',
    }, {
      'id': 2,
      'name': 'Non-Managed Service',
      'value': 'nms',
    }, {
      'id': 3,
      'name': 'Management Devices',
      'value': 'mgmt',
    }, {
      'id': 4,
      'name': 'Anonymous',
      'value': 'anon',
    }
  ]
  myDatepicker: any;
  ListCategory: any;
  showSubCategory = false;
  SelectedObjectVals;
  subCategoryValues: any;
  ObjectVals = [];
  showObject: boolean;
  SelectedMetricsVals;
  MetricsVals;
  SetSelectedCategory: any;
  startDate;
  endDate;
  subCategoryVal: any;
  SetMetricsVal: any;
  setObjectVal: any;
  performaceMainData: any;
  performaceAverage: any;
  performaceSum = [];
  performaceLowHigh = [];
  performacePlots = [];
  Tableheader: any;
  Tablebody: any[];
  checkDataStatus;
  showChart: boolean;
  ChartDate = [];
  performacePlotters = [];
  ChartLagents: any;
  ChartVal;
  ChartAllData = [];
  responseResult: any;

  constructor(
    private http: HttpClient,
    private pageTitleService: PageTitleService,
    private apiService: ApiService,
    private elementRef: ElementRef
  ) { }

  ngOnInit() {
    this.pageTitleService.setTitle('Performances Report');
    this.getListCategory();

    setTimeout(() => {
      this.showChart = true;
    }, 0)

  }


  selectCategory(e) {
    this.ObjectVals = [];
    this.SetSelectedCategory = e;

    if (e === 'KVM' || e === 'vCenter') {
      this.showSubCategory = true;
      const subcategorySource = this.ListCategory;
      for (const val in subcategorySource) {
        if (val === e) {
          this.subCategoryValues = subcategorySource[val];
        }
      }

    } else {
      // this.subCategoryValues = null;
      this.showSubCategory = false;
    }

    if (e === 'Switch' || e === 'Firewall') {
      this.showObject = true;

      const info = {
        category: this.SetSelectedCategory,
        item: ''
      }

      this.apiService
        .ObjectApi(info)
        .subscribe(
          (data: any) => {
            const objs = data.data.items.slice(1);
            for (let index = 0; index < objs.length; index++) {
              const element = objs[index];
              this.ObjectVals.push(element[1]);
            }
          },
          (err: HttpErrorResponse) => {
            console.log(err, ' data Error');
          }
        );
    } else {
      this.showObject = false;
    }
  }


  selectSubCategory(e) {
    this.subCategoryVal = e;

    const info = {
      category: this.SetSelectedCategory,
      item: e
    }

    this.apiService
      .ObjectApi(info)
      .subscribe(
        (data: any) => {

          this.MetricsVals = data.data.metrics;
          const objs = data.data.items.slice(1);
          for (let index = 0; index < objs.length; index++) {
            const element = objs[index][1] + ' ' + objs[index][3];
            this.ObjectVals.push(element);
          }
        },
        (err: HttpErrorResponse) => {
          console.log(err, ' data Error');
        }
      );


  }


  selectObject(e) {

    this.setObjectVal = e;

    if (this.SetSelectedCategory === 'Switch' || this.SetSelectedCategory === 'Firewall') {
      this.apiService
        .metriclistApi(this.SetSelectedCategory, e)
        .subscribe(
          (data: any) => {
            this.MetricsVals = data.data.metrics;
          },
          (err: HttpErrorResponse) => {
            console.log(err, ' MetricsVals Error');
          }
        );
    }

  }


  test() {
    console.log(this.myDatepicker, ' myDatepicker');
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
    this.startDate = moment(event.value).format('YYYY-MM-DD hh:mm');
  }

  addEvent2(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
    this.endDate = moment(event.value).format('YYYY-MM-DD hh:mm');
  }


  getListCategory() {
    this.apiService
      .CategoryApi()
      .subscribe(
        (data: any) => {
          console.log(data.data, ' data ok');
          this.ListCategory = data.data;
        },
        (err: HttpErrorResponse) => {
          console.log(err, ' data Error');
        }
      );
  }


  selectMetrics(e) {
    console.log(e, ' DDDDDDxXXX ');
    this.SetMetricsVal = e;
  }

  getDetails() {
    this.checkDataStatus = false;
    const getOnlyIPAddress = this.setObjectVal.split(' ');

    if (this.subCategoryVal === undefined) {
      this.subCategoryVal = '';
    }

    const info = {
      category: this.SetSelectedCategory,
      item: this.subCategoryVal,
      list: getOnlyIPAddress[0],
      metrics: this.SetMetricsVal,
      TimeZone: 'Asia/Kolkata',
      start_datetime: this.startDate,
      end_datetime: this.endDate
    }
    this.apiService
      .getDetailsApi(info)
      .subscribe(
        (res: any) => {

          this.responseResult = res.result;

          if (res.result === 'success') {
            this.checkDataStatus = true;
            this.performaceMainData = res;
            this.performaceAverage = res.data.Average;
            this.performaceSum = res.data.Sums;
            this.performaceLowHigh = res.data.LowHigh;
            this.performacePlots = res.data.plots;
            this.Tableheader = this.performacePlots[0];
            this.Tablebody = this.performacePlots.slice(1);

            this.performacePlotters = res.plotters;

            for (let p = 0; p < this.performacePlotters.length; p++) {
              const element = this.performacePlotters[p];

              for (let l = 0; l < this.Tableheader.length; l++) {
                const element2 = this.Tableheader[l];

                if (element === element2) {
                  this.ChartLagents = element;
                  this.ChartVal = this.Tablebody.map(function (item) { return item[l]; })

                  this.ChartAllData.push({
                    data: this.ChartVal,
                    label: this.ChartLagents
                  })

                }
              }
            }


            for (let d = 0; d < this.Tablebody.length; d++) {
              const element = this.Tablebody[d];
              this.ChartDate.push(element[0])
            }

            this.lineChartLabels = this.ChartDate;
            this.lineChartData = this.ChartAllData;


          } else if (res.result === 'failure') {
            this.checkDataStatus = false;
          }

        },
        (err: HttpErrorResponse) => {
          console.log(err, ' datagetDetails Error');
        }
      );
  }

    // Expert Table To CSV
    expertTableCsv(){
      new ngxCsv(this.performaceAverage, 'Performance Average Report');
      new ngxCsv(this.performaceSum, 'Performance Sum Report');
      new ngxCsv(this.performaceLowHigh, 'Performance LowHigh Plot Report');
      new ngxCsv(this.performacePlots, 'Performance Main Plot Report');
    }

    // Expert To Pdf Conversion
    expertToPdf(){
      // var data = document.getElementById('content-wrapper');  //Id of the table
      // html2canvas(data).then(canvas => {  
      // // Few necessary setting options  
      //   let imgWidth = 208;   
      //   let pageHeight = 295;    
      //   let imgHeight = canvas.height * imgWidth / canvas.width;  
      //   let heightLeft = imgHeight;  

      //   const contentDataURL = canvas.toDataURL('image/png')  
      //   let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      //   let position = 0;  
      //   pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
      //   pdf.save('MYPdf.pdf'); // Generated PDF   
      // });
      var PDF_Width;
      var PDF_Height;
      var HTML_Width = $("#content-wrapper").width();
      var HTML_Height = $("#content-wrapper").height();
      var top_left_margin = 15;
      PDF_Width = HTML_Width+(top_left_margin*2);
      PDF_Height = (PDF_Width*1.5)+(top_left_margin*2);
      var canvas_image_width = HTML_Width;
      var canvas_image_height = HTML_Height;
      var d = new Date().getTime();
      var totalPDFPages = Math.ceil(HTML_Height/PDF_Height)-1;
      html2canvas($("#content-wrapper")[0],{allowTaint:true}).then(function(canvas) {
          canvas.getContext('2d');
          var imgData = canvas.toDataURL("image/jpeg", 1.0);
          var pdf = new jspdf('p', 'mm',  [PDF_Width, PDF_Height]);
          pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin,canvas_image_width,canvas_image_height);
          for (var i = 1; i <= totalPDFPages; i++) { 
              pdf.addPage(PDF_Width, PDF_Height);
              pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height*i)+(top_left_margin*4),canvas_image_width,canvas_image_height);
          }
          pdf.save(+'Performance_Report__'+d+".pdf");
      });
    }



}
