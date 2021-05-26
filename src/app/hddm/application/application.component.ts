import { Component, OnInit } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import { HddmService } from '../../service/hddm.service';
import { Router,NavigationEnd } from '@angular/router';
import { NgbModalConfig, NgbModal, ModalDismissReasons  } from '@ng-bootstrap/ng-bootstrap';
import { TokenStorageService } from '../../service/token-storage.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { ngxCsv } from "ngx-csv/ngx-csv";

@Component({
  selector: 'ms-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit {

  public appaddform : FormGroup;
  public appupdateform : FormGroup;

  applicationlist: any[];
  applicationcredlist : any[];

  txtAddAppName;
  txtAddAppIP;
  selAddAppType;
  selAddAppCred;
 

  closeResult = '';

  txtUpAppName;
  txtUpID;
  txtUpAppIP;
  selUpAppType;
  selUpAppCred;
  appid;
  appOnAppKvm;
  appOngridVal;
  appIngridVal;

  appMainGrid = true;
  appOnAppKvmGrid = false;
  appOngridValGrid = false;
  appIngridValGrid = false;
  appOnGridMainVal;
  selVmGrpOptions;
  selVmGrpOptionsKey
  appKvmCusGrid;
  appKvmHostsGrid;
  appKvmVmsGrid;
  appKvmOptGridVal;
  appKvmNameVal;

  constructor( private pageTitleService : PageTitleService, 
    private toastr : ToastrService,
    private formBuilder: FormBuilder,
    private router: Router, 
    public hddmService: HddmService, 
    private modalService: NgbModal,
    config: NgbModalConfig,
    private tokenStorage: TokenStorageService ) {
      config.backdrop = 'static';
      config.keyboard = false;
      this.router.events.subscribe((e) => {
        if (e instanceof NavigationEnd) {
          
        }
      });
    }

  ngOnInit(): void {
    this.pageTitleService.setTitle("Application");
    this.getApplicationList();
    this.getApplicationCredListfn();

       //Validation Application add Form
       this.appaddform =  this.formBuilder.group({
        txtAddformAppName : [null, Validators.required],
        txtAddformAppIP : [null, Validators.required],
        selAddAppformType : [null, Validators.required],
        selAddAppformCred : [null, Validators.required],
      }) 
  
      //Validation Application update Form
      this.appupdateform =  this.formBuilder.group({
        txtUpAppformName : [null, Validators.required],
        txtUpAppformIP : [null, Validators.required],
        selUpAppformType : [null, Validators.required],
        selUpAppformCred : [null, Validators.required],
      }) 
  }

  // Get Application Cred List Function
  getApplicationCredListfn():void{
    this.hddmService.credListGetServ().subscribe( 
      res => {
        console.log(res);
        if(res['result'] == "success"){
          this.applicationcredlist = res['data'].slice(1);
          this.toastr.success(res['result']);
        }else{
          this.toastr.error(res['data']);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  // Get Application List Function
  getApplicationList():void{
    this.hddmService.applicationListGetserv().subscribe( 
      res => {
        console.log(res);
        if(res['result'] == "success"){
          this.applicationlist = res['data'].slice(1);
          this.toastr.success(res['result']);
          }else{
          this.toastr.error(res['data']);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  // Application Add Modal
  appAddModalFn(modal):void{
    this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  // Application Update Modal
  appUpModal(modal, data):void{
    this.txtUpAppName = data[1];
    this.txtUpAppIP = data[2];
    this.selUpAppCred = data[4];
    this.selUpAppType = data[3];
    this.txtUpID = data[0];
    this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  // Application Add function
  submitAppAdd():void{
    const dataset ={
      hypervisor_name: this.txtAddAppName, 
      hypervisor_ip_address: this.txtAddAppIP, 
      hypervisor_type: this.selAddAppType,
      hypervisor_cred: this.selAddAppCred
    }
    this.hddmService.appAddService(dataset).subscribe( 
      res => {
        console.log(res);
        if(res['result'] == "success"){
          this.toastr.success(res['data']);
          this.getApplicationList();
          }else{
          this.toastr.error(res['data']);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  // Application Update Modal
  submitAppUpdate():void{
    const dataset ={
      hypervisor_name: this.txtUpAppName, 
      hypervisor_ip_address: this.txtUpAppIP, 
      hypervisor_type: this.selUpAppType,
      hypervisor_cred: this.selUpAppCred
    }
    this.hddmService.appUpdateService(dataset, this.txtUpID).subscribe( 
      res => {
        console.log(res);
        if(res['result'] == "success"){
          this.toastr.success(res['data']);
          this.getApplicationList();
          }else{
          this.toastr.error(res['data']);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  // Application Delete Function
  appDeleteFn(id):void{
    this.hddmService.appDeleteService(id).subscribe( 
      res => {
        console.log(res);
        if(res['result'] == "success"){
          this.toastr.success(res['data']);
          this.getApplicationList();
          }else{
          this.toastr.error(res['data']);
        }
      },
      err => {
        console.log(err);
      }
    );
  }


  // Application Type Based launch Function
  appLaunchfn(id, apptype):void {
    this.selBtnVal = '';
    this.appOnGridMainVal = '';
  this.appid = id;
    if(apptype == 'OnApp KVM'){
      this.hddmService.appGetOnAppKvmService().subscribe( 
        res => {
          console.log(res);
          if(res['result'] == "success"){
            this.appOnAppKvm = res['data'];
            console.log(this.appOnAppKvm);
            this.toastr.success(res['result']);
            this.appMainGrid = false;
            this.appOnAppKvmGrid = true;
            this.appOngridValGrid = false;
            this.appIngridValGrid = false;
            }else{
            this.toastr.error(res['data']);
          }
        },
        err => {
          console.log(err);
        }
      );
    }else if(apptype == 'Firewall'){
      this.hddmService.appGetFirewallService(id).subscribe( 
        res => {
          console.log(res);
          if(res['result'] == "success"){
            this.appIngridVal = res['data'].splice(1);
            this.appMainGrid = false;
            this.appOnAppKvmGrid = false;
            this.appOngridValGrid = false;
            this.appIngridValGrid = true;
            console.log(this.appIngridVal);
            this.toastr.success(res['result']);
            }else{
            this.toastr.error(res['data']);
          }
        },
        err => {
          console.log(err);
        }
      );
    }else if(apptype == 'Switch'){
      this.hddmService.appGetSwitchService(id).subscribe( 
        res => {
          console.log(res);
          if(res['result'] == "success"){
            this.appIngridVal = res['data'].splice(1);
            this.appMainGrid = false;
            this.appOnAppKvmGrid = false;
            this.appOngridValGrid = false;
            this.appIngridValGrid = true;
            console.log(this.appIngridVal);
            this.toastr.success(res['result']);
            }else{
            this.toastr.error(res['data']);
          }
        },
        err => {
          console.log(err);
        }
      );
    }else if(apptype == 'Router'){
      this.hddmService.appGetRouterService(id).subscribe( 
        res => {
          console.log(res);
          if(res['result'] == "success"){
            this.appIngridVal = res['data'].splice(1);
            this.appMainGrid = false;
            this.appOnAppKvmGrid = false;
            this.appOngridValGrid = false;
            this.appIngridValGrid = true;
            console.log(this.appIngridVal);
            this.toastr.success(res['result']);
            }else{
            this.toastr.error(res['data']);
          }
        },
        err => {
          console.log(err);
        }
      );
    }else if(apptype == 'Load Balancer'){
      this.hddmService.appGetLoadBalancerService(id).subscribe( 
        res => {
          console.log(res);
          if(res['result'] == "success"){
            this.appIngridVal = res['data'].splice(1);
            this.appMainGrid = false;
            this.appOnAppKvmGrid = false;
            this.appOngridValGrid = false;
            this.appIngridValGrid = true;
            console.log(this.appIngridVal);
            this.toastr.success(res['result']);
            }else{
            this.toastr.error(res['data']);
          }
        },
        err => {
          console.log(err);
        }
      );
    }else{
      this.hddmService.appGetOtherService(id).subscribe( 
        res => {
          console.log(res);
          if(res['result'] == "success"){
            this.appOngridVal = res['data'];
            this.appMainGrid = false;
            this.appOnAppKvmGrid = false;
            this.appOngridValGrid = true;
            this.appIngridValGrid = false;
            console.log(this.appOngridVal);
            this.toastr.success(res['result']);
            }else{
            this.toastr.error(res['data']);
          }
        },
        err => {
          console.log(err);
        }
      );
    }
  }


  // Back to Main Function
  backTomain():void{
    this.appKvmCusGrid = false;
    this.appKvmHostsGrid = false;
    this.appKvmVmsGrid = false;
    this.appMainGrid = true;
    this.appOnAppKvmGrid = false;
    this.appOngridValGrid = false;
    this.appIngridValGrid = false;
  }

  // OnApp KVM grid details get function
  getAppKvmGrid(key):void{
    this.appKvmNameVal = key;
    this.appKvmCusGrid = false;
    this.appKvmHostsGrid = false;
    this.appKvmVmsGrid = false;
    this.hddmService.appGetkvmService(this.appKvmNameVal).subscribe( 
      res => {
        console.log(res);
        if(res['result'] == "success"){
          this.toastr.success(res['result']);
          if(this.appKvmNameVal =="customers"){
            this.appKvmCusGrid = true;
            this.appKvmHostsGrid = false;
            this.appKvmVmsGrid = false;
            this.appKvmOptGridVal = res['data'].slice(1);
          }else if(this.appKvmNameVal =="hosts"){
            this.appKvmCusGrid = false;
            this.appKvmHostsGrid = true;
            this.appKvmVmsGrid = false;
            this.appKvmOptGridVal = res['data'].slice(1);
          }else if(this.appKvmNameVal =="vms"){
            this.appKvmCusGrid = false;
            this.appKvmHostsGrid = false;
            this.appKvmVmsGrid = true;
            this.appKvmOptGridVal = res['data'].slice(1);
          }
        }else{
          this.toastr.error(res['data']);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  selBtnVal;
  // 
  appSelOnKeysFn(e):void {
    this.selVmGrpOptions = e;
    for (var key in this.appOngridVal) {
      if(e == key){
          console.log(this.appOngridVal[key]);
        this.selBtnVal = this.appOngridVal[key];
      }else if(e == ''){
        this.selBtnVal = '';
      }
    }
  }

  // vmware grid list get fn
  getAppKvmONGridFn(key):void{
    this.selVmGrpOptionsKey = key;
    const dataset = {
      hypervisor_id: this.appid, 
      dc_name: this.selVmGrpOptions,
      obj_type: key
    }

    this.hddmService.appGetVmwareGridService(dataset).subscribe( 
      res => {
        console.log(res);
        if(res['result'] == "success"){
          this.toastr.success(res['result']);
          this.appOnGridMainVal = res['data'].slice(1)
        }else{
          this.toastr.error(res['data']);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  // Data Split Function
  splitFn(data){
    const splitThis =  data.split(':');
    return splitThis
  }

  // Grid to Csv Expert function
  csvExpertCust(){
    new ngxCsv(this.appKvmOptGridVal, "Application Report");
  }
  csvExpertIngridVal(){
    new ngxCsv(this.appIngridVal, "Application Report");
  }
  csvExpertOngridVal(){
    new ngxCsv(this.appOnGridMainVal, "Application Report");
  }
}
