import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from './api.service';


@Injectable({
  providedIn: 'root'
})

export class HddmService {

  readonly httpOptions = {
    headers: new HttpHeaders({})
  };

  constructor(
    private router: Router,
    private http: HttpClient,
    private apiService: ApiService,
  ) { }


  // Cred List get services
  // creddetgetserv() {
  //   return this.http.get(this.apiService.MasterServerURL + '/ui/api1.0/devicecred/credentials', this.httpOptions);
  // }

  // Cred List get services
  creddetgetserv() {
    return this.http.get(this.apiService.MasterServerURL + this.apiService.port8000 + '/ui/api1.0/devicecred/credentials', this.httpOptions);
  }

  // Cred Add Services  
  credAddService(data){
    return this.http.post(this.apiService.MasterServerURL + this.apiService.port8000 +  '/ui/api1.0/devicecred/credentials',data, this.httpOptions);
  }

  // Cred Update Service
  credUpdateService(name, data){
    return this.http.put(this.apiService.MasterServerURL + this.apiService.port8000 +"/ui/api1.0/devicecred/credentials/" + name, data, this.httpOptions)
  }

  // Cred Delete Service
  credDeletService(name){
    return this.http.delete(this.apiService.MasterServerURL + this.apiService.port8000 +"/ui/api1.0/devicecred/credentials/" + name, this.httpOptions)
  }

  // Machine List get services
  machineDetGetService() {
    return this.http.get(this.apiService.MasterServerURL + this.apiService.port8000 +'/admin/api/v2/cmdb/machine/getAllData', this.httpOptions);
  }

  // Machine Master Lov Services
  machineMasterGetService() {
    return this.http.get(this.apiService.MasterServerURL + this.apiService.port8000 +'/admin/api/v2/cmdb/masters', this.httpOptions);
  }

  // Machine Update Remediate
  machineUpRemediateService(param){
    return this.http.post(this.apiService.MasterServerURL + this.apiService.port8000 +'/admin/api/v2/cmdb/automationtype', param, this.httpOptions)
  }

  // Machine Update Cred
  machineUpCredService(param){
    return this.http.post(this.apiService.MasterServerURL + this.apiService.port8000 +'/admin/api/v2/cmdb/insert', param, this.httpOptions)
  }

  // Machine Delete 
  machineDeleteService(val){
    return this.http.delete(this.apiService.MasterServerURL + this.apiService.port8000 +"/ui/api1.0/devicecred/credentials/" + val, this.httpOptions)
  }

  // Machie Add Service
  machineAddService(param){
    return this.http.post(this.apiService.MasterServerURL + this.apiService.port8000 +"/ui/api1.0/admin/api/v2/cmdb/insert", param, this.httpOptions)
  }

  // Discovery Get List Service
  discoveryDetailsService(){
    return this.http.get(this.apiService.MasterServerURL + this.apiService.port8000 +'/ui/api1.0/devicediscoverylist', this.httpOptions);
  }

  // Discovery Master List Service
  discoveryCredMasterService(){
    return this.http.get(this.apiService.MasterServerURL + this.apiService.port8000 +'/ui/api1.0/devicecred/credentials', this.httpOptions);
  }

  // Discovery Cred Update Service
  discoveryCredUpdateService(param){
    return this.http.post(this.apiService.MasterServerURL + this.apiService.port8000 +'/ui/api1.0/devicecredentialmapper', param, this.httpOptions);
  }

  // Discovery Deattach Service
  discoveryDeattachService(param){
    return this.http.put(this.apiService.MasterServerURL + this.apiService.port8000 + '/ui/api1.0/deattachcredentials', param, this.httpOptions);
  }

  // Discovery Delete Service
  discoveryDeleteService(val){
    return this.http.delete(this.apiService.MasterServerURL + this.apiService.port8000 + '/ui/api1.0/devicediscovery/'+val, this.httpOptions);
  }

  // Application Get List Services
  applicationListGetserv() {
    return this.http.get(this.apiService.MasterServerURL + this.apiService.port8000 + '/ui/api1.0/hypervisor', this.httpOptions);
  }

  // Application Add Service
  appAddService(param){
    return this.http.post(this.apiService.MasterServerURL + this.apiService.port8000 + '/ui/api1.0/hypervisor', param, this.httpOptions);
  }

  // Application Update Service
  appUpdateService(param, val){
    return this.http.put(this.apiService.MasterServerURL + this.apiService.port8000 + '/ui/api1.0/hypervisor/' + val, param, this.httpOptions);
  }

  // Application Delete Service
  appDeleteService(val){
    return this.http.delete(this.apiService.MasterServerURL + this.apiService.port8000 + '/ui/api1.0/hypervisor/' + val, this.httpOptions);
  }

  // Application Get OnAppKvm Service
  appGetOnAppKvmService(){
    return this.http.get(this.apiService.MasterServerURL + this.apiService.port8000 + '/ui/api1.0/hypervisorkvm_totsumm', this.httpOptions);
  }

  // Application Get Firewall Service
  appGetFirewallService(id){
    return this.http.get(this.apiService.MasterServerURL + this.apiService.port8000 + '/ui/api1.0/hypervisorfirewall/' + id, this.httpOptions);
  }

  // Application Get Switch Service
  appGetSwitchService(id){
    return this.http.get(this.apiService.MasterServerURL + this.apiService.port8000 + '/ui/api1.0/hypervisorswitch/' + id, this.httpOptions);
  }

  // Application Get Router Service
  appGetRouterService(id){
    return this.http.get(this.apiService.MasterServerURL + this.apiService.port8000 + '/ui/api1.0/hypervisorrouter/' + id, this.httpOptions);
  }

  // Application Get Router Service
  appGetLoadBalancerService(id){
    return this.http.get(this.apiService.MasterServerURL + this.apiService.port8000 + '/ui/api1.0/hypervisorlb/' + id, this.httpOptions);
  }

  // Application Get Router Service
  appGetOtherService(id){
    return this.http.get(this.apiService.MasterServerURL + this.apiService.port8000 + '/ui/api1.0/hypervisor_tot/' + id, this.httpOptions);
  }

  // Application Get Router Service
  appGetkvmService(key){
    return this.http.get(this.apiService.MasterServerURL + this.apiService.port8000 + '/ui/api1.0/hypervisorkvm_singleobject/' + key, this.httpOptions);
  }

  // Application Get Router Service
  appGetVmwareGridService(param){
    return this.http.post(this.apiService.MasterServerURL + this.apiService.port8000 + '/ui/api1.0/hypervisor_singleobject', param, this.httpOptions);
  }

  // Group Get List Services
  groupListGetServ() {
    return this.http.get(this.apiService.MasterServerURL + this.apiService.port8000 + '/ui/api1.0/mgroup/mgroups', this.httpOptions);
  }

  // Group Get Machine List Service
  groupMachineListServ(){
    return this.http.get(this.apiService.MasterServerURL + this.apiService.port8000 + '/ui/api1.0/mgroup/machines', this.httpOptions);
  }

  // add Group Machine List 
  groupAddPostServ(param){
    return this.http.post(this.apiService.MasterServerURL + this.apiService.port8000 + '/ui/api1.0/mgroup/mgroups', param,this.httpOptions);
  }

  // Group Update Service list
  groupUpDetailGetServ(id){
    return this.http.get(this.apiService.MasterServerURL + this.apiService.port8000 + '/ui/api1.0/mgroup/mgroups/'+ id,this.httpOptions);
  }

  groupUpDetailPutServ(param){
    return this.http.put(this.apiService.MasterServerURL + this.apiService.port8000 + '/ui/api1.0/mgroup/mgroups', param,this.httpOptions);
  }
  
  // Group Delete Service
  groupUpDetailDeleteServ(id){
    return this.http.delete(this.apiService.MasterServerURL + this.apiService.port8000 + '/ui/api1.0/mgroup/mgroups/'+ id, this.httpOptions);
  }
   
  // Application Get List Services
  cloudListGetserv() {
    return this.http.get(this.apiService.MasterServerURL + this.apiService.port8000 + '/ui/api1.0/vmware/cloud/registry', this.httpOptions);
  }

  // Application Cred Get List Services
  credListGetServ() {
    return this.http.get(this.apiService.MasterServerURL + this.apiService.port8000 + '/ui/api1.0/devicecred/credentials', this.httpOptions);
  }

  // Cloud Update Service
  cloudUpdateService(param, id){
    return this.http.put(this.apiService.MasterServerURL + this.apiService.port8000 + '/ui/api1.0/vmware/cloud/registry/' + id, param, this.httpOptions);
  }
  
  // Cloud Add Service
  cloudAddService(param){
    return this.http.post(this.apiService.MasterServerURL + this.apiService.port8000 + '/ui/api1.0/vmware/cloud/registry', param, this.httpOptions);
  }

  // Cloud Delete Service
  cloudDeleteService(val){
    return this.http.delete(this.apiService.MasterServerURL + this.apiService.port8000 + '/ui/api1.0/vmware/cloud/registry/' + val, this.httpOptions)
  }
  
  
  // Software Add Service
  softwareAddService(){
    return this.http.post(this.apiService.MasterServerURL + this.apiService.port8000 + '/ui/api1.0/objectmaster/software_subclass',  this.httpOptions);
  }
  // Software Delete Service
  softwareDeleteService(val){
    return this.http.delete(this.apiService.MasterServerURL + this.apiService.port8000 + '' + val, this.httpOptions)
  }
   // Application Get List Services
   getSoftwareList() {
    return this.http.get(this.apiService.MasterServerURL + this.apiService.port8000 + '', this.httpOptions);
  }

}