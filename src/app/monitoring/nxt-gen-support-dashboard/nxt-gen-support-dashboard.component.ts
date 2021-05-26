import { Component, OnInit } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import { MonitroingServiceService } from '../../service/monitroing-service.service';
import { Router, NavigationEnd } from '@angular/router';
import { TokenStorageService } from '../../service/token-storage.service';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'app/service/api.service';
import { ngxCsv } from 'ngx-csv/ngx-csv';

@Component({
  selector: 'ms-nxt-gen-support-dashboard',
  templateUrl: './nxt-gen-support-dashboard.component.html',
  styleUrls: ['./nxt-gen-support-dashboard.component.scss']
})
export class NxtGenSupportDashboardComponent implements OnInit {

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

  statusval;
  selcategrp;
  search_sorting;
  gridList: any[];
  timer: any;
  constructor(private pageTitleService: PageTitleService,
    private toastr: ToastrService,
    private router: Router,
    public monitorService: MonitroingServiceService,
    private tokenStorage: TokenStorageService,
    private apiService: ApiService,
    ) { }

  ngOnInit(): void {
    this.pageTitleService.setTitle('NxtGen Support Dashboard');
    this.onLoadDashboardDetailGet();
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
    console.log("Auto ReFresh Stopped")
  }


  autoRefreshSet(){
    this.timer = setInterval(() => {
      this.autoRefreshFn();
    }, 120000);
  }

  autoRefreshFn(){
    const curl = this.apiService.MasterServerURL + this.apiService.port8000 +'/ui/api1.0/mon_services_sev/' +
      this.statusval + '/' + this.search_sorting + '/' + this.selcategrp;
      this.getDashboardGridListFn(curl);
  }

  // Onload Gird Get List Function
  onLoadDashboardDetailGet(): void {
    this.statusval = 'critical';
    this.selcategrp = 'mgmt';
    this.search_sorting = 'since_d';
    const curl = this.apiService.MasterServerURL + this.apiService.port8000 +'/ui/api1.0/mon_services_sev/' +
      this.statusval + '/' + this.search_sorting + '/' + this.selcategrp;
    console.log(curl)
    this.getDashboardGridListFn(curl);
    this.autoRefreshSet();
  }

  // Select Category Based Get Grid List Function
  selectCategory(obj): void {
    // console.log(obj);
    this.selcategrp = obj;
    const curl = this.apiService.MasterServerURL + this.apiService.port8000 +'/ui/api1.0/mon_services_sev/' +
      this.statusval + '/' + this.search_sorting + '/' + this.selcategrp;
    this.getDashboardGridListFn(curl);
  }

  // Status Based Grid List Get Function
  btnGetGridList(obj): void {
    if (obj === 1) {
      this.statusval = 'warning';
    } else {
      this.statusval = 'critical';
    }
    const curl = this.apiService.MasterServerURL + this.apiService.port8000 +'/ui/api1.0/mon_services_sev/' + 
    this.statusval + '/' + this.search_sorting + '/' + this.selcategrp;
    this.getDashboardGridListFn(curl);
  }

  // Grid List Get Main Function
  getDashboardGridListFn(curl): void {

    this.monitorService.DashboardGridListGetServ(curl).subscribe(
      res => {
        console.log(res);
        if (res['result'] === 'success') {
          this.gridList = res['data']['service'].slice(1);
          console.log(this.gridList);
          this.toastr.success(res['result']);
        } else {
          this.toastr.error(res['data']);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  onAction(){
    this.router.navigateByUrl("eventmanagement/alerts");
  }

  // Expert Table To CSV
  expertTableCsv(){
    new ngxCsv(this.gridList, 'Report');
  }

}
