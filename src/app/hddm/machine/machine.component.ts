import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PageTitleService } from '../../core/page-title/page-title.service';
import { HddmService } from '../../service/hddm.service';
import { Router,NavigationEnd } from '@angular/router';
import { ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { TokenStorageService } from '../../service/token-storage.service';
import { ToastrService } from 'ngx-toastr';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'ms-machine',
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.scss']
})
export class MachineComponent implements OnInit {

  
  public machineupform : FormGroup;
  public machineaddform : FormGroup;

  machinelist : any[];
  machinemasterlov : any;
  txtUphostname;
  closeResult = '';
  selUpRemediate;
  txtUpIP;
  txtUpOsName;
  selUpCredName;
  searchmachine;
  
  txtAddHostName;
  txtAddIP;
  selAddPlatform;
  txtAddOsName;
  txtAddOsversion;
  selAddCredName;
  selAddRemediate;

  constructor(private pageTitleService : PageTitleService, 
    private toastr : ToastrService,
    private formBuilder: FormBuilder,
    private router: Router, 
    public hddmService: HddmService, 
    config: NgbModalConfig, 
    private modalService: NgbModal,
    private tokenStorage: TokenStorageService ) {
      // config.backdrop = 'static';
      // config.keyboard = false;
      this.router.events.subscribe((e) => {
        if (e instanceof NavigationEnd) {
          
        }
      });
     }

  ngOnInit(): void {
    this.pageTitleService.setTitle("Machine")
    this.getMachineList();
          this.getMachineMasterLov();

    //Validation Machine add Form
    this.machineaddform =  this.formBuilder.group({
      txtAddformHostName : [null, Validators.required],
      txtformAddIP : [null, Validators.required],
      selAddformPlatform : [null, Validators.required],
      txtAddformOsName : [null, Validators.required],
      txtAddformOsversion : [null, Validators.required],
      seladdformcname : [null, Validators.required],
      seladdformreme : [null, Validators.required],
    }) 

    //Validation Machine update Form
    this.machineupform =  this.formBuilder.group({
      txtUpformIP : [null, Validators.required],
      txtUpOsformName : [null, Validators.required],
      selUpCredformName : [null, Validators.required],
    }) 
  }


  // Get Machine Master LOV function
  getMachineMasterLov():void{
    this.hddmService.machineMasterGetService().subscribe( 
      res => {
        console.log(res);
        if(res['Status'] == "Success"){
          this.machinemasterlov = res;
          console.log(this.machinemasterlov);
          this.toastr.success(res['Status']);
          }else{
          this.toastr.error(res['data']);
        }
      },
      err => {
        console.log(err);
      }
    );
  }


  // Get Machine List function 
  getMachineList():void{
    this.hddmService.machineDetGetService().subscribe( 
      res => {
        console.log(res);
        if(res['Status'] == "Completed"){
          this.machinelist = res['Data'];
          console.log(this.machinelist)
          this.toastr.success(res['Status']);
          }else{
          this.toastr.error(res['Data']);
        }
      },
      err => {
        console.log(err);
      }
    );
  }


  // Machine Remediate Modal 
  changeRemediate(modal, name, remediate):void{
    // console.log(data);
    this.txtUphostname = name;
    this.selUpRemediate = remediate;
    this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  } 

  changeCredential(modal, name, ip, cred):void{
    this.txtUpIP = ip;
    this.txtUpOsName = name;
    this.selUpCredName = cred;
    this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  addMachineModal(modal):void{
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


  // Submit Remediate function
  submitUpRemediate():void{
    const dataset = {
      hostname : this.txtUphostname,
      remediate : this.selUpRemediate,
    }
    this.hddmService.machineUpRemediateService(dataset).subscribe( 
      res => {
        console.log(res);
        if(res['Status'] == "Success"){
          this.toastr.success(res['Message']);
          this.getMachineList();
        }else{
          this.toastr.error(res['Message']);
        }
      },
      err => {
        console.log(err);
      }
    );
  }


  // Submit Cred Function 
  submitUpCred():void{

    const dataset = {
      cred_name: this.selUpCredName,
      ipaddress: this.txtUpIP,
      operating_system: this.txtUpOsName,
    }
    this.hddmService.machineUpCredService(dataset).subscribe( 
      res => {
        console.log(res);
        if(res['Status'] == "Success"){
          this.toastr.success(res['Message']);
          this.getMachineList();
        }else{
          this.toastr.error(res['Message']);
        }
      },
      err => {
        console.log(err);
      }
    );

  }

  // Delete Machine Function
  deleteMachine(id):void{
    this.hddmService.machineDeleteService(id).subscribe( 
      res => {
        console.log(res);
        if(res['Status'] == "Success"){
          this.toastr.success(res['Message']);
          this.getMachineList();
        }else{
          this.toastr.error(res['Message']);
        }
      },
      err => {
        console.log(err);
      }
    );
  }


  // Machine Add FUnction
  submitAddMachine():void{
    const dataset = {
      credentials: this.selAddCredName,
      ipaddress: this.txtAddIP,
      osname: this.txtAddOsName,
      osversion: this.txtAddOsversion,
      platform: this.selAddPlatform,
      remediate: this.selAddRemediate,
      hostname: this.txtAddHostName
    }
    this.hddmService.machineAddService(dataset).subscribe( 
      res => {
        console.log(res);
        if(res['Status'] == "Success"){
          this.toastr.success(res['Message']);
          this.getMachineList();
        }else{
          this.toastr.error(res['Message']);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

}
