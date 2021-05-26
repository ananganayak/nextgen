import { Component, OnInit } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import { MonitroingServiceService } from '../../service/monitroing-service.service';
import { Router, NavigationEnd } from '@angular/router';
import { TokenStorageService } from '../../service/token-storage.service';
import { ToastrService } from 'ngx-toastr';
import { Observable,Subscription, interval  } from 'rxjs';
import { ApiService } from 'app/service/api.service';

@Component({
  selector: 'ms-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  // private updateSubscription: Subscription;

  cardhostgpData: any[];
  carhgdata: any[];
  innergird = [];
  hostgroupdiv = true;
  hostdiv = false;
  servicediv = false;
  hostservdiv = false;
  hostgroup: any;
  valtype: any;
  dataset: any;
  updateSubscription: any; 

  gridBVal;
  gridId;
  gridType;
  gridName;
  timer: any;
  constructor(private pageTitleService: PageTitleService,
    private toastr: ToastrService,
    private router: Router,
    public monitorService: MonitroingServiceService,
    private tokenStorage: TokenStorageService,
    private apiService: ApiService
    ) {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
      
      }
    });
  }

  ngOnInit(): void {
    this.pageTitleService.setTitle('Dashboard');
    this.dashHostDetailsGet();
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
    if(this.hostgroupdiv == true){
      this.dashHostDetailsGet();
      this.hostgroupdiv = true;
      this.hostservdiv = false;
    }else{
      this.getHostServiceDet();
      this.hostgroupdiv = false;
      this.hostservdiv = true;
    }
  }
  
  // Monitoring Dashboard Details Get Function
  dashHostDetailsGet(): void {
    const userid = this.tokenStorage.getUser().user_id;
    this.apiService.monitorDashHostGetServ(userid).subscribe(
      res => {
        // console.log(res);
        if (res['result'] === 'success') {
          this.cardhostgpData = res['data'];
          console.log(this.cardhostgpData);
          this.toastr.success(res['result']);
          this.autoRefreshSet();
        } else {
          this.toastr.error(res['data']);
        }
      },
      err => {
        console.log(err.message);
        // this.toastr.error(err.message);
      }
    );
  }

  getDashDetails(data, id, name, val, hostgroup, type): void {
    console.log(data, id, name, val, hostgroup, type);
    this.hostgroup = hostgroup;
    this.carhgdata = data;
    this.gridBVal = val;
    this.gridId = id;
    this.gridType = type;
    this.gridName = name;
    
    this.getHostServiceDet();
    
  }
  
  getBtnDashDetails(id, name, val, hostgroup, type): void {
    console.log(id, name, val, hostgroup, type);
    this.hostgroup = hostgroup;
    this.gridBVal = val;
    this.gridId = id;
    this.gridType = type;
    this.gridName = name;

    this.getHostServiceDet();
    
  }

  getHostServiceDet(){
    if (this.gridType === 0) {
      this.hostdiv = true;
      this.servicediv = false;
    } else {
      this.servicediv = true;
      this.hostdiv = false;
    }
    this.dataset = {
      'hostgroup': this.hostgroup,
      'type': this.gridType,
      'id': this.gridId
    };
    if (this.gridBVal > 0) {
      this.hostgroupdiv = false;
      this.hostservdiv = true;
      this.monitorService.monitorDashHostGetGirdServ(this.dataset).subscribe(
        res => {
          console.log(res);
          if (res['result'] === 'success') {
            this.toastr.success(res['result']);
            this.innergird = res['data'].slice(1);
          } else {
            this.toastr.error(res['data']);
          }
        },
        err => {
          console.log(err);
        }
      );
    } else {
      this.toastr.error('Selected Value Zero');
    }
  }


  backtoDashboard(): void {
    this.hostgroupdiv = true;
    this.hostservdiv = false;
    this.servicediv = false;
    this.hostdiv = false;
  }


}
