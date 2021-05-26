import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from './api.service';


const httpOptions = {
  headers: new HttpHeaders({})
};


@Injectable({
  providedIn: 'root'
})
export class MonitroingServiceService {

  constructor(private router: Router,
    private toastr: ToastrService,
    private http: HttpClient,
    private apiService: ApiService,
  ) { }



  // monitor dashboard hostgroup details get service
  monitorDashHostGetServ(id) {
    return this.http.get(this.apiService.MasterServerURL + this.apiService.port8000 +'/ui/api1.0/mon_dashboard/overall/' + id, httpOptions);
  }

  // monitor dashboard host and service grid get details
  monitorDashHostGetGirdServ(data) {
    return this.http.post(this.apiService.MasterServerURL + this.apiService.port8000 +'/ui/api1.0/mon_dashboard/typegrid', data, httpOptions);
  }

  // Dashboard List Get Services
  DashboardGridListGetServ(curl) {
    return this.http.get(curl, httpOptions);
  }

  // Onload Get Host Group List Service
  monitorDashHostGroupServ(userid) {
    return this.http.get(this.apiService.MasterServerURL + this.apiService.port8000 +'/ui/api1.0/mon_services/dp/hostgroups/' + userid, httpOptions);
  }

  // get Host List Service Function
  monitorDashHostServ(data) {
    return this.http.post(this.apiService.MasterServerURL + this.apiService.port8000 +'/ui/api1.0/mon_services/dp/hosts_new', data, httpOptions);
  }

  // Get Dahboard Grid List Sevice
  monitorDashGridListServ(data) {
    return this.http.post(this.apiService.MasterServerURL + this.apiService.port8000 +'/ui/api1.0/mon_services', data, httpOptions);
  }

  // Get Unkown data service
  getUnkownDataServ(){
    return this.http.get(this.apiService.MasterServerURL + this.apiService.port8000 +'/ui/api1.0/mon_hostservice/unknows', httpOptions);
  }

}
