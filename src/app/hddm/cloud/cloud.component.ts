import { Component, OnInit } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import { HddmService } from '../../service/hddm.service';
import { Router,NavigationEnd } from '@angular/router';
import { NgbModalConfig, NgbModal, ModalDismissReasons  } from '@ng-bootstrap/ng-bootstrap';
import { TokenStorageService } from '../../service/token-storage.service';
import { ToastrService } from 'ngx-toastr';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'ms-cloud',
  templateUrl: './cloud.component.html',
  styleUrls: ['./cloud.component.scss']
})
export class CloudComponent implements OnInit {

  public cloudupfrom : FormGroup;
  public cloupaddfrom : FormGroup;

  cloudlist: any[];
  cloudcredlist : any[];

  closeResult = "";

  cloudUpName;
  cloudUpIp;
  cloudUpType;
  cloudUpCredList;
  cloudUpId;

  cloudAddName;
  cloudAddIp;
  cloudAddType;
  cloudAddCredList;

  searchcloud;

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
    this.pageTitleService.setTitle("Cloud");
    this.getCloudCredListfn();
    this.getCloudList();

    //Validation Cloud add Form
    this.cloupaddfrom =  this.formBuilder.group({
      cloudAddformName : [null, Validators.required],
      cloudAddformIp : [null, Validators.required],
      cloudAddfromType : [null, Validators.required],
      cloudAddformCredList : [null, Validators.required],
    }) 

    //Validation Cloud update Form
    this.cloudupfrom =  this.formBuilder.group({
      cloudUpformName : [null, Validators.required],
      cloudUpformIp : [null, Validators.required],
      cloudUpformType : [null, Validators.required],
      cloudUpformCredList : [null, Validators.required],
    }) 
  }


  // Get Cloud Cred List Function
  getCloudCredListfn():void{
    this.hddmService.credListGetServ().subscribe( 
      res => {
        console.log(res);
        if(res['result'] == "success"){
          this.cloudcredlist = res['data'].slice(1);
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

  // Get Cloud List Function
  getCloudList():void{
    this.hddmService.cloudListGetserv().subscribe( 
      res => {
        console.log(res);
        if(res['result'] == "success"){
          this.cloudlist = res['data'].slice(1);
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

  // Update Modal Function
  updateModal(modal, data):void{
    this.cloudUpName = data[1];
    this.cloudUpIp = data[2];
    this.cloudUpType = data[3];
    this.cloudUpCredList = data[4];
    this.cloudUpId = data[0];
   
    this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  // cloud Add Modal Function
  cloudAddModalFn(modal):void{
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


  // Cloud Add Function
  submitCloudAdd():void{
    const dataset = {cloud_name:this.cloudAddName,cloud_ip_address:this.cloudAddIp,cloud_type:this.cloudAddType,cloud_cred:this.cloudAddCredList}
    this.hddmService.cloudAddService(dataset).subscribe( 
      res => {
        console.log(res);
        if(res['result'] == "success"){
          this.toastr.success(res['data']);
          this.getCloudList();
        }else{
          this.toastr.error(res['data']);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  // Cloud Update Function
  submitCloudUpdate():void{
    const dataset = {cloud_name:this.cloudUpName,cloud_ip_address:this.cloudUpIp,cloud_type:this.cloudUpType,cloud_cred:this.cloudUpCredList}
    this.hddmService.cloudUpdateService(dataset, this.cloudUpId).subscribe( 
      res => {
        console.log(res);
        if(res['result'] == "success"){
          this.toastr.success(res['data']);
          this.getCloudList();
        }else{
          this.toastr.error(res['data']);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  // Cloud Delete Function
  Deletefn(id):void{
    this.hddmService.cloudDeleteService(id).subscribe( 
      res => {
        console.log(res);
        if(res['result'] == "success"){
          this.toastr.success(res['data']);
          this.getCloudList();
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
