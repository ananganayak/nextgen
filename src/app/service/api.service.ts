import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BotRepoMaster } from '../models/BotRepoMaster';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // appBrand = "Autointelli";
  appBrand = "Nxtgen";

  port8080 = '8080';
  // port8000 = '8000';
  port8000 = '443';

  webSocketport = "3891";

  readonly MasterServerURL = localStorage.getItem("envirounment_ip");
  readonly baseUrl="http://172.16.1.10:8000"
  // eIp = localStorage.getItem("envirounment_ip")

  // readonly MasterServerURL = 'https://r2d2.nxtgen.com';
  readonly MasterSURL = 'https://r2d2.nxtgen.com';


  // readonly MasterServerURL = 'http://172.16.1.101';

  customer_id = 'all';
  tenant_id = 0;
  userId;
  // webSocketApi;
  
  webSocketApi = this.MasterServerURL + this.webSocketport  + "/autointelli_async";

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {

    this.userId = JSON.parse(localStorage.getItem('auth-id'));
    // console.log(this.MasterServerURL);
    // if(this.eIp == "https://r2d22.nxtgen.com:"){
    //   this.MasterServerURL = "https://r2d22.nxtgen.com:";
    // }else if(this.eIp == "https://r2d23.nxtgen.com:"){
    //   this.MasterServerURL = "https://r2d23.nxtgen.com:";
    // }else if(this.eIp == "https://r2d21.nxtgen.com:"){
    //   this.MasterServerURL = "https://r2d21.nxtgen.com:";
    // }else{
    //   // showLocationMenu = false;
    //   this.MasterServerURL = "https://r2d2.nxtgen.com:";
    // }

  }
  

  resetPassService(param){
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'sessionkey': localStorage.getItem('auth-token')
    });

    return this.http.post(this.MasterServerURL + this.port8000 + '/ui/api1.0/users/firstimeset', param, { headers: reqHeader })
  }

  runProcessApi(id) {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Anonymous': 'xxx'
    });
    return this.http.get(
      this.MasterServerURL + this.port8000 + '/orchapi/api/v3/formdesigner/' + this.customer_id + '/' + this.tenant_id + '/process/' + id,
      { headers: reqHeader });
  }


  runProcessConfirmApi(id, body_data) {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Anonymous': 'xxx'
    });
    const body = body_data;
    return this.http.post(
      this.MasterServerURL + this.port8000 + '/orchapi/api/v3/process/' + this.customer_id + '/' + this.tenant_id + '/start/' + this.userId + '/' + id,
      body, { headers: reqHeader });
  }


  monitorDashHostGetServ(id) {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'sessionkey': localStorage.getItem('auth-token')
    });
    return this.http.get(this.MasterServerURL + this.port8000 + '/ui/api1.0/mon_dashboard/overall/' + id, { headers: reqHeader });
  }


  CategoryApi() {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'sessionkey': localStorage.getItem('auth-token')
    });
    return this.http.get(this.MasterServerURL + this.port8000 + '/ui/api1.0/perfreport/main/items', { headers: reqHeader });
  }

  ObjectApi(info) {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'sessionkey': localStorage.getItem('auth-token')
    });
    const body = {
      category: info.category,
      item: info.item

    };
    return this.http.post(this.MasterServerURL + this.port8000 + '/ui/api1.0/perfreport/main/items/sidelist', body, { headers: reqHeader });
  }


  metriclistApi(category, ip) {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'sessionkey': localStorage.getItem('auth-token')
    });
    const body = {
      category: category,
      ip: ip
    };
    return this.http.post(
      this.MasterServerURL + this.port8000 + '/ui/api1.0/perfreport/main/items/metriclist', body, { headers: reqHeader });
  }


  // Analytics Excu alert get value service

  getAlertAnalysisListServ(param){
    console.log(param);
    const reqHeader = new HttpHeaders({
      // 'Content-Type': 'application/json',
      'sessionkey': localStorage.getItem('auth-token')
    });
    return this.http.get(
      this.MasterServerURL + this.port8000 + '/dashboard/api1.0/alertseveritybc/'+ param.filter + "/" +param.more_filter, { headers: reqHeader });
  }

  //Cloud Service analytics
  //analytics1
  getCloudServiceAnalyticsServ(param){
    console.log(param);
    const reqHeader = new HttpHeaders({
      // 'Content-Type': 'application/json',
      'sessionkey': localStorage.getItem('auth-token')
    });
    return this.http.get(
      this.MasterServerURL + this.port8000 + '/dashboard/api1.0/analytics1/'+ param  , { headers: reqHeader });
  }



  getBotResolutionTypeServ(param){
    console.log(param);
    const reqHeader = new HttpHeaders({
      // 'Content-Type': 'application/json',
      'sessionkey': localStorage.getItem('auth-token')
    });
    return this.http.get(
      this.MasterServerURL + this.port8000 + '/dashboard/api1.0/automationtypebc/'+ param.filter + "/" +param.more_filter, { headers: reqHeader });
  }
//alert ststus 
  getAlertStstusServ(param){
    console.log(param);
    const reqHeader = new HttpHeaders({
      // 'Content-Type': 'application/json',
      'sessionkey': localStorage.getItem('auth-token')
    });
    return this.http.get(
      this.MasterServerURL + this.port8000 + '/dashboard/api1.0/alertstatus/'+ param.filter + "/" +param.more_filter, { headers: reqHeader });
  }
  // supression data last
  getSupressionServ(param){
    console.log(param);
    const reqHeader = new HttpHeaders({
      // 'Content-Type': 'application/json',
      'sessionkey': localStorage.getItem('auth-token')
    });
    return this.http.get(
      this.MasterSURL +'/dashboard/api1.0/suppression30days/'+ param.filter + "/" +param.more_filter, { headers: reqHeader });
  }



//bot Status

getAutomationStstusServ(param){
  console.log(param);
  const reqHeader = new HttpHeaders({
    // 'Content-Type': 'application/json',
    'sessionkey': localStorage.getItem('auth-token')
  });
  return this.http.get(
    this.MasterServerURL + this.port8000 + '/dashboard/api1.0/automationstatus/'+ param.filter + "/" +param.more_filter, { headers: reqHeader });
}

//bot repo data....tree data
getBotRepoDataServ(){
 
  const reqHeader = new HttpHeaders({
    // 'Content-Type': 'application/json',
    'sessionkey': localStorage.getItem('auth-token')
  });
  return this.http.get(
    this.MasterServerURL + this.port8000 + '/bot/api1.0/bottree'  , { headers: reqHeader });
}

//bot repo data...
getBotRepoDataFileServ(param){

  const reqHeader = new HttpHeaders({
    // 'Content-Type': 'application/json',
  //  'api-key': localStorage.getItem('api-key'),
    'sessionkey': localStorage.getItem('auth-token')
  });
  return this.http.get(
    this.MasterSURL +  '/bot/api1.0/bottree/files/' + param   , {headers: reqHeader});
    
}
//bot repo  mastersdata....bot script sdata-----
getBotRepoMastersDataServ(){
 
  const reqHeader = new HttpHeaders({
    // 'Content-Type': 'application/json',
    'sessionkey': localStorage.getItem('auth-token')
  });
  return this.http.get<BotRepoMaster>(
    this.MasterServerURL + this.port8000 + '/bot/api1.0/bottree/masters'  , { headers: reqHeader });
}


//bot repo on load all data show service========
getBotRepoMastersAllDataServ(){
 
  const reqHeader = new HttpHeaders({
    // 'Content-Type': 'application/json',
    'sessionkey': localStorage.getItem('auth-token')
  });
  return this.http.get(
    this.MasterSURL  + '/bot/api1.0/bottree/files'  , { headers: reqHeader });
}
//bot Tree editor service
getBotEditorDataServ(param){
  const reqHeader = new HttpHeaders({
    // 'Content-Type': 'application/json',
    'sessionkey': localStorage.getItem('auth-token')
  });
  return this.http.get(
    this.MasterSURL  + '/bot/api1.0/bottree/filecontent/' + param  , { headers: reqHeader });
}

//ticket status
getTickeStatusServ(param){
  console.log(param);
  const reqHeader = new HttpHeaders({
    // 'Content-Type': 'application/json',
    'sessionkey': localStorage.getItem('auth-token')
  });
  return this.http.get(
    this.MasterServerURL + this.port8000 + '/dashboard/api1.0/ticketstatus/'+ param.filter + "/" +param.more_filter, { headers: reqHeader });
}
//top 5 kpis
getTop5ComponentServ(param){
  console.log(param);
  const reqHeader = new HttpHeaders({
    // 'Content-Type': 'application/json',
    'sessionkey': localStorage.getItem('auth-token')
  });
  return this.http.get(
    this.MasterServerURL + this.port8000 + '/dashboard/api1.0/top5component/'+ param.filter + "/" +param.more_filter, { headers: reqHeader });
}





  getWorkflowAnalysisServ(param){
    console.log(param);
    const reqHeader = new HttpHeaders({
      // 'Content-Type': 'application/json',
      'sessionkey': localStorage.getItem('auth-token')
    });
    return this.http.get(
      this.MasterServerURL + this.port8000 + '/dashboard/api1.0/workflowstatusbc/'+ param.filter + "/" +param.more_filter, { headers: reqHeader });
  }

  getExecutiveHeadersServ(param){
    console.log(param);
    const reqHeader = new HttpHeaders({
      // 'Content-Type': 'application/json',
      'sessionkey': localStorage.getItem('auth-token')
    });
    return this.http.get(
      this.MasterServerURL + this.port8000 + '/dashboard/api1.0/executiveheaders/'+ param.filter + "/" +param.more_filter, { headers: reqHeader });
  }





  getDetailsApi(info) {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'sessionkey': localStorage.getItem('auth-token')
    });

    const body = {
      category: info.category,
      item: info.item,
      list: info.list,
      metrics: info.metrics,
      TimeZone: 'Asia/Kolkata',
      start_datetime: info.start_datetime,
      end_datetime: info.end_datetime
    };
    return this.http.post(this.MasterServerURL + this.port8000 + '/ui/api1.0/perfreport/all', body, { headers: reqHeader });
  }


  vmwareCustomerApi(val) {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'sessionkey': localStorage.getItem('auth-token')
    });
    return this.http.get(this.MasterServerURL + this.port8000 + '/ui/api1.0/reports/vmsumm/getcustomers/' + val, { headers: reqHeader });
  }


  vmwareDownloadApi(info) {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'sessionkey': localStorage.getItem('auth-token')
    });
    const getUsrId = JSON.parse(localStorage.getItem('auth-user'));

    const body = {
      technology: info.technology,
      accountid: info.accountid,
      startdate: info.startdate,
      enddate: info.enddate,
      user_id: getUsrId.pk_user_details_id
    };
    return this.http.post(this.MasterServerURL + this.port8000 + '/ui/api1.0/reports/vmsumm/download', body, { headers: reqHeader });
  }


  reportgridgetApi() {
    const getUsrId = JSON.parse(localStorage.getItem('auth-user'));

    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'sessionkey': localStorage.getItem('auth-token')
    });

    return this.http.get(this.MasterServerURL + this.port8000 + '/ui/api1.0/reports/vmsumm/grid/' + getUsrId.pk_user_details_id, { headers: reqHeader });
  }



  AlertsDataApi(payload) {

    const url = '/evm/api1.0/alerts/' +
      payload.apiStatusType + '/' + payload.apiCountStartFrom + '/' +
      payload.apiResultPerPage + '/' +
      payload.searchFillterType + '/' +
      payload.searchFillterVal + '/' + payload.searchSortVal;

    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'sessionkey': localStorage.getItem('auth-token')
    });
    return this.http.get(this.MasterServerURL + this.port8000 + url, { headers: reqHeader });
  }

  // alert ticket form detail get function
  getTicketFormValService(status) {
    // const reqHeader = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'sessionkey': localStorage.getItem('auth-token')
    // });
    return this.http.get(this.MasterServerURL + this.port8000 + '/ui/api1.0/itsmform/nxtgen/' + status);
  }

  getCSVLinkservice(payload){
    const url = '/evm/api1.0/alerts_download/' +
    payload.apiStatusType + '/' + payload.apiCountStartFrom + '/' +
    payload.apiResultPerPage + '/' +
    payload.searchFillterType + '/' +
    payload.searchFillterVal + '/' + payload.searchSortVal;

    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'sessionkey': localStorage.getItem('auth-token')
    });
    return this.http.get(this.MasterServerURL + this.port8000 + url, { headers: reqHeader });

  }

  getBotInfoService(alertid){
    return this.http.get(this.MasterServerURL + this.port8000 + '/evm/api1.0/executionstage/' + alertid);
  }

  getTFMasterValService(){
    return this.http.get(this.MasterServerURL + this.port8000 + '/ui/api1.0/itsmform/masters' + status);
  }

  groupbyApi() {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'sessionkey': localStorage.getItem('auth-token')
    });
    return this.http.get(this.MasterServerURL + this.port8000 + '/evm/api1.0/alerts/status/groupby', { headers: reqHeader });
  }



  clientsNameApi() {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'sessionkey': localStorage.getItem('auth-token')
    });
    return this.http.get(this.MasterServerURL + this.port8000 + '/ui/api1.0/clients', { headers: reqHeader });
  }
//evm alert api fun
  evmAlertApi(alertId) {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'sessionkey': localStorage.getItem('auth-token')
    });
    return this.http.get(this.MasterServerURL+this.port8000+ "/ui/api1.0/triage/"+alertId , { headers: reqHeader });
  }


  eventsApi(payload) {

    const url = '/evm/api1.0/events/' +
      payload.apiStatusType + '/' + payload.apiCountStartFrom + '/' +
      payload.apiResultPerPage + '/' +
      payload.searchFillterType + '/' +
      payload.searchFillterVal + '/' + payload.searchSortVal;

    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'sessionkey': localStorage.getItem('auth-token')
    });
    return this.http.get(this.MasterServerURL + this.port8000 + url);
  }

  createticketApi(info) {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'sessionkey': localStorage.getItem('auth-token')
    });
    const body = {
      Subject: info.Subject,
      Description: info.Description,
      Type: info.Type,
      Alert_id: info.Alert_id,
      action_cmd: info.action_cmd
    };
    return this.http.post(this.MasterServerURL + this.port8000 + '/ui/api1.0/itsm/sdp/createticket', body, { headers: reqHeader });
  }


  usersAPi() {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'sessionkey': localStorage.getItem('auth-token')
    });
    return this.http.get(this.MasterServerURL + this.port8000 + '/ui/api1.0/users/admin/admin', { headers: reqHeader });
  }


  userRolesApi() {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'sessionkey': localStorage.getItem('auth-token')
    });
    return this.http.get(this.MasterServerURL + this.port8000 + '/ui/api1.0/roles', { headers: reqHeader });
  }

  // Delete ROle Service
  roleDeleteService(val){
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'sessionkey': localStorage.getItem('auth-token')
    });
    return this.http.delete(this.MasterServerURL + '/ui/api1.0/roles/'+val,{ headers: reqHeader });
  }

  // Add Roles List
  postAddRolesService(param){
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'sessionkey': localStorage.getItem('auth-token')
    });
    return this.http.post(this.MasterServerURL + '/ui/api1.0/roles', param,{ headers: reqHeader });
  }


  putUpRolesService(rolename, param){
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'sessionkey': localStorage.getItem('auth-token')
    });
    return this.http.put(this.MasterServerURL + '/ui/api1.0/roles/'+rolename, param,{ headers: reqHeader });
  }

  TimeZonesApi() {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'sessionkey': localStorage.getItem('auth-token')
    });
    return this.http.get(this.MasterServerURL + this.port8000 + '/ui/api1.0/zones', { headers: reqHeader });
  }

  createUserApi(info) {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'sessionkey': localStorage.getItem('auth-token')
    });
    const body = {
      user_id: info.user_id,
      first_name: info.first_name,
      middle_name: info.middle_name,
      last_name: info.last_name,
      email_id: info.email_id,
      phone_number: info.phone_number,
      time_zone: info.time_zone,
      role: info.role,
      user_type: info.user_type
    };
    return this.http.post(this.MasterServerURL + this.port8000 + '/ui/api1.0/users', body, { headers: reqHeader });
  }

  deleteUserApi(info) {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'sessionkey': localStorage.getItem('auth-token')
    });
    return this.http.delete(this.MasterServerURL + this.port8000 + '/ui/api1.0/users/' + info, { headers: reqHeader });
  }

  updateUserDetailApi(info) {
    const body = {
      first_name: info.first_name,
      middle_name: info.middle_name,
      last_name: info.last_name,
      email_id: info.email_id,
      phone_number: info.phone_number,
      time_zone: info.time_zone,
      role: info.role,
      user_type: info.user_type,
    }
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'sessionkey': localStorage.getItem('auth-token')
    });
    return this.http.put(this.MasterServerURL + this.port8000 + '/ui/api1.0/users/' + info.user_id, body, { headers: reqHeader });
  }


  userCustMapApi(id) {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'sessionkey': localStorage.getItem('auth-token')
    });
    return this.http.get(this.MasterServerURL + this.port8000 + '/ui/api1.0/user_cust_map/' + id, { headers: reqHeader });
  }

  userCustMappingAPI(info) {
    const data = {
      user_id: info.user_id,
      customer_id: info.customer_id
    }
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'sessionkey': localStorage.getItem('auth-token')
    });
    return this.http.post(this.MasterServerURL + this.port8000 + '/ui/api1.0/user_cust_map', data, { headers: reqHeader });
  }

  licenseApi() {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'sessionkey': localStorage.getItem('auth-token')
    });
    return this.http.get(this.MasterServerURL + this.port8000 + '/ui/api1.0/license', { headers: reqHeader });
  }

  licenseUpdateApi(key) {
    const body = {
      key: key
    }
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'sessionkey': localStorage.getItem('auth-token')
    });
    return this.http.post(this.MasterServerURL + this.port8000 + '/ui/api1.0/license', body, { headers: reqHeader });
  }

  SMTPCommunicationType() {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'sessionkey': localStorage.getItem('auth-token')
    });
    return this.http.get(this.MasterServerURL + this.port8000 + '/admin/api/v2/smtp/masters', { headers: reqHeader });
  }

  SMTPCommunicationTypeUpdate(info) {
    const body = {
      communication_type: info.communication_type,
      smtpip: info.smtpip,
      smtpport: info.smtpport,
      smtpauth: info.smtpauth,
      smtpuser: info.smtpuser,
      smtppass: info.smtppass
    }
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'sessionkey': localStorage.getItem('auth-token')
    });
    return this.http.post(this.MasterServerURL + this.port8000 + '/admin/api/v2/smtp/masters', body, { headers: reqHeader });
  }

  ldapCommunicationTypeApi() {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'sessionkey': localStorage.getItem('auth-token')
    });
    return this.http.get(this.MasterServerURL + this.port8000 + '/admin/api/v2/ldap/masters', { headers: reqHeader });
  }

  LDAPDataApi() {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'sessionkey': localStorage.getItem('auth-token')
    });
    return this.http.get(this.MasterServerURL + this.port8000 + '/admin/api/v2/ldap', { headers: reqHeader });
  }

  LDAPDataSubmintApi(info) {
    const body = {
      communication_type: info.communication_type,
      ldapip: info.ldapip,
      ldapport: info.ldapport,
      sysacc: info.sysacc,
      syspwd: info.syspwd,
      basedn: info.basedn
    }
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'sessionkey': localStorage.getItem('auth-token')
    });
    return this.http.post(this.MasterServerURL + this.port8000 + '/admin/api/v2/ldap/add', body, { headers: reqHeader });
  }


  arconCommunicationTypeApi() {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'sessionkey': localStorage.getItem('auth-token')
    });
    return this.http.get(this.MasterServerURL + this.port8000 + '/admin/api/v2/arcon/masters', { headers: reqHeader });
  }

  arconDatapi() {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'sessionkey': localStorage.getItem('auth-token')
    });
    return this.http.get(this.MasterServerURL + this.port8000 + '/admin/api/v2/arcon', { headers: reqHeader });
  }


  arconSubmit(data) {
    const body = {
      communication_type: data.communication_type,
      arconip: data.arconip,
      arconport: data.arconport,
      arconuser: data.arconuser,
      arconpwd: data.arconpwd
    }
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'sessionkey': localStorage.getItem('auth-token')
    });
    return this.http.post(this.MasterServerURL + this.port8000 + '/admin/api/v2/arcon/add', body, { headers: reqHeader });
  }


  CSMappingDataApi() {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'sessionkey': localStorage.getItem('auth-token')
    });
    return this.http.get(this.MasterServerURL + this.port8000 + '/ui/api1.0/cust_service_map', { headers: reqHeader });
  }

  CSMappingMSApi(param){
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'sessionkey': localStorage.getItem('auth-token')
    });
    return this.http.post(this.MasterServerURL + this.port8000 + '/ui/api1.0/cust_service_map', param, { headers: reqHeader });
  }

  CSMappingVMApi(custid, tech){
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'sessionkey': localStorage.getItem('auth-token')
    });
    return this.http.get(this.MasterServerURL + this.port8000 + '/ui/api1.0/client_vms/'+custid+'/'+tech, { headers: reqHeader });
  }

  CSMappingAddVMPApi(param){
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'sessionkey': localStorage.getItem('auth-token')
    });
    return this.http.post(this.MasterServerURL + this.port8000 + '/ui/api1.0/client_vms', param,{ headers: reqHeader });
  }

  rolesTableApi() {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'sessionkey': localStorage.getItem('auth-token')
    });
    return this.http.get(this.MasterServerURL + this.port8000 + '/ui/api1.0/tabs', { headers: reqHeader });
  }

  roleNameApi() {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'sessionkey': localStorage.getItem('auth-token')
    });
    return this.http.get(this.MasterServerURL + this.port8000 + '/ui/api1.0/roles', { headers: reqHeader });
  }


  roleBasedMappersService(name) {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'sessionkey': localStorage.getItem('auth-token')
    });
    return this.http.get(this.MasterServerURL + this.port8000 + '/ui/api1.0/rolemappers/' + name, { headers: reqHeader });
  }


  reviewListofTaskApi(customer_id, tenant_id) {
    const userId = JSON.parse(decodeURIComponent(localStorage.getItem('auth-id')));
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Anonymous': 'xxx'
    });
    return this.http.get(
      this.MasterServerURL + this.port8000 + '/orchapi/api/v3/task/' + customer_id + '/' + tenant_id + '/' + userId,
      { headers: reqHeader });
  }



  designerListOfWorkflow() {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Anonymous': 'xxx'
    });
    return this.http.get(
      this.MasterServerURL + this.port8000 + '/orchapi/api/v3/workflow/autointelli/internal/list/admin',
      { headers: reqHeader });
  }



  categoriesApi() {
    
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'sessionkey': localStorage.getItem('auth-token')
    });
    return this.http.get(
      this.baseUrl + '/dashboard/api1.0/workflowstatusbc/' + this.customer_id + '/' + this.tenant_id ,
      { headers: reqHeader });
  }

  createNewWorkflowApi(data) {
    const body = {
      workflowId: data.workflowId,
      description: data.description,
      tower: data.tower,
      manual_effort: data.manual_effort,
      cost_per_hour: data.cost_per_hour,
      imgurl: data.imgurl,
    }
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Anonymous': 'xxx'
    });
    return this.http.post(
      this.MasterServerURL + this.port8000 + '/orchapi/api/v3/workflow/create/' + this.customer_id + '/' + this.tenant_id + '/' + this.userId,
      body, { headers: reqHeader });
  }

  categoryLoadApi() {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'sessionkey': localStorage.getItem('auth-token')
    });
    return this.http.get('assets/data/categery_img.json');
  }

  deployApi(data) {
    const body = {
      process: data
    }
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Anonymous': 'xxx'
    });
    return this.http.post(
      this.MasterServerURL + this.port8000 + '/orchapi/api/v3/workflow/' + this.customer_id + '/' + this.tenant_id + '/deploy/' + this.userId,
      body, { headers: reqHeader });
  }


  unDeployApi(data) {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Anonymous': 'xxx'
    });
    return this.http.post(
      this.MasterServerURL + this.port8000 + '/orchapi/api/v3/workflow/' + this.customer_id + '/' + this.tenant_id + '/delete/' + data
      , { headers: reqHeader });
  }


  createWorkflowFormApi(data) {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Anonymous': 'xxx'
    });
    return this.http.post(
      this.MasterServerURL + this.port8000 + '/orchapi/api/v3/formdesigner/' + this.customer_id + '/' + this.tenant_id + '/variables/' + data
      , { headers: reqHeader });
  }


  createTaskFormApi(data) {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Anonymous': 'xxx'
    });
    return this.http.post(
      this.MasterServerURL + this.port8000 + '/orchapi/api/v3/formdesigner/' + this.customer_id + '/' + this.tenant_id + '/variables/' + data
      , { headers: reqHeader });
  }

  WorkflowIdDeleteApi(data) {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Anonymous': 'xxx'
    });
    return this.http.delete(
      this.MasterServerURL + this.port8000 + '/orchapi/api/v3/formdesigner/' + this.customer_id + '/' + this.tenant_id + '/process/' + data
      , { headers: reqHeader });
  }


  categoryApi() {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Anonymous': 'xxx'
    });
    return this.http.get(
      this.MasterServerURL + this.port8000 + '/orchapi/api/v3/workflow/' + this.customer_id + '/' +
      this.tenant_id + '/categories/' + this.userId, { headers: reqHeader });
  }

  processApi() {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Anonymous': 'xxx'
    });
    return this.http.get(
      this.MasterServerURL + this.port8000 + '/orchapi/api/v3/process/' + this.customer_id + '/' +
      this.tenant_id + '/list/' + this.userId, { headers: reqHeader });
  }


  historyApi(id) {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Anonymous': 'xxx'
    });
    return this.http.get(
      this.MasterServerURL + this.port8000 + '/orchapi/api/v3/process/' + this.customer_id + '/' +
      this.tenant_id + '/instances/' + id, { headers: reqHeader });
  }




  roiApi() {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'sessionkey': localStorage.getItem('auth-token')
    });
    return this.http.get(this.MasterServerURL + this.port8000 + '/ui/api1.0/orches/roi', { headers: reqHeader });
  }


  workflowstatusApi() {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'sessionkey': localStorage.getItem('auth-token')
    });
    return this.http.get(this.MasterServerURL + this.port8000 + '/ui/api1.0/orches/workflowstatus', { headers: reqHeader });
  }


  processbyruntimeApi() {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'sessionkey': localStorage.getItem('auth-token')
    });
    return this.http.get(this.MasterServerURL + this.port8000 + '/ui/api1.0/orches/processbyruntime', { headers: reqHeader });
  }

  processcategoryApi() {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'sessionkey': localStorage.getItem('auth-token')
    });
    return this.http.get(this.MasterServerURL + this.port8000 + '/ui/api1.0/orches/processcategory', { headers: reqHeader });
  }



  processbysdApi() {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'sessionkey': localStorage.getItem('auth-token')
    });
    return this.http.get(this.MasterServerURL + this.port8000 + '/ui/api1.0/orches/processbysd', { headers: reqHeader });
  }


  processbyedApi() {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'sessionkey': localStorage.getItem('auth-token')
    });
    return this.http.get(this.MasterServerURL + this.port8000 + '/ui/api1.0/orches/processbyed', { headers: reqHeader });
  }


  ProcessVariablesApi(id) {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Anonymous': 'xxx'
    });
    return this.http.get(this.MasterServerURL + this.port8080 + '/orchapi/api/v3/formdesigner/' + this.customer_id + '/' + this.tenant_id + '/variables/' + id, { headers: reqHeader });
  }

  formcontentApi(processid, formcontent) {
    const data = {
      'formType': 'process',
      'processid': processid,
      'formcontent': formcontent
    };
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Anonymous': 'xxx'
    });
    return this.http.post(
      this.MasterServerURL + this.port8080 + '/orchapi/api/v3/formdesigner/' + this.customer_id + '/' + this.tenant_id + '/store/',
      data, { headers: reqHeader });
  }


  userApi() {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'sessionkey': localStorage.getItem('auth-token')
    });
    return this.http.get(this.MasterServerURL + this.port8000 + '/ui/api1.0/users', { headers: reqHeader });
  }

  sharedwithApi(id) {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Anonymous': 'xxx'
    });
    return this.http.get(this.MasterServerURL + this.port8000 + '/orchapi/api/v3/workflow/' + this.customer_id + '/' + this.tenant_id + '/sharedwith/list/' + id,
      { headers: reqHeader });
  }

  saveShareApi(procedata, user) {
    const data = {
      'imgUrl': procedata.imgurl,
      'processName': procedata['process-name'],
      'description': procedata.description,
      'category': procedata.category,
      'users': user
    };
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Anonymous': 'xxx'
    });
    return this.http.post(
      this.MasterServerURL + this.port8080 + '/orchapi/api/v3/workflow/share/' + this.customer_id + '/' + this.tenant_id + '/' + procedata['process-id'],
      data, { headers: reqHeader });
  }







  

}
