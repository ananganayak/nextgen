import { Component, OnInit } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import { MonitroingServiceService } from '../../service/monitroing-service.service';
import { Router, NavigationEnd } from '@angular/router';
import { TokenStorageService } from '../../service/token-storage.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ms-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.scss']
})
export class MonitoringComponent implements OnInit {

  selhostgrp;
  selhost;
  hostGroupList: any[];
  hostGridList: any[];
  hostList: any[];
  hostIsActive = false;
  showTable = false;
  showNodata = false;

  constructor(private pageTitleService: PageTitleService,
    private toastr: ToastrService,
    private router: Router,
    public monitorService: MonitroingServiceService,
    private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.pageTitleService.setTitle('Monitoring');
    this.getHostGrouplist();
  }

  // Onload Get Host Group List Function
  getHostGrouplist(): void {
    const userid = this.tokenStorage.getUser().user_id;
    this.monitorService.monitorDashHostGroupServ(userid).subscribe(
      res => {
        console.log(res);
        if (res['result'] === 'success') {
          this.hostGroupList = res['data'].hostgroup_name;
          console.log(this.hostGroupList);
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

  // get Host List Function
  getHostName(e) {

    if (e === undefined) {
      this.hostIsActive = false;
      this.showNodata = false;
      this.hostIsActive = false;
      this.showTable = false;
    } else {
      this.hostIsActive = true;
    }

    const dataset = {
      'HostGroup': e
    }

    this.monitorService.monitorDashHostServ(dataset).subscribe(
      res => {
        console.log(res);
        if (res['result'] === 'success') {
          if (res['multisearch'] === 'no') {
            this.hostList = res['data'].host_display_name;
          } else {
            this.hostList = res['data'].slice(1);
          }
          console.log(this.hostList);
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

  // Get Grid Details Function
  getHostGirdDetail(e) {

    const dataset = {
      'filter': 'status_a',
      'host_object_id': e
    }
    this.monitorService.monitorDashGridListServ(dataset).subscribe(
      res => {
        if (res['result'] === 'success') {
          this.showTable = true;
          this.hostGridList = res['data'].service.slice(1);
          console.log(this.hostGridList);
          this.toastr.success(res['result']);
          this.showNodata = false;

        } else {
          this.toastr.error(res['data']);
          this.showNodata = true;
        }
      },
      err => {
        console.log(err);
      }
    );
  }

}
