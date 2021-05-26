import { Component, OnInit } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import { HddmService } from '../../service/hddm.service';
import { Router,NavigationEnd } from '@angular/router';
import { NgbModalConfig, NgbModal, ModalDismissReasons  } from '@ng-bootstrap/ng-bootstrap';
import { TokenStorageService } from '../../service/token-storage.service';
import { ToastrService } from 'ngx-toastr';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'ms-software',
  templateUrl: './software.component.html',
  styleUrls: ['./software.component.scss']
})
export class SoftwareComponent implements OnInit {
  public softwareupfrom : FormGroup;
  public swupaddfrom : FormGroup;

  searchsoftware;
  closeResult = "";

  softwarelist: any[];
  softwarecredlist : any[];

  softwareUpName;
  softwareUpIp;
  softwareUpType;
  softwareUpCredList;
  softwareUpId;

  softwareAddName;
  softwareAddIp;
  softwareAddType;
  softwareAddCredList;
  softwareSubClasslist;

  

  constructor( private pageTitleService : PageTitleService, 
    private toastr : ToastrService,
    private formBuilder: FormBuilder,
    private router: Router, 
    public hddmService: HddmService, 
    private modalService: NgbModal,
    private http:HttpClient,
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

    this.http.get("https://oikotechno.autointelli.com/ui/api1.0/objectmaster/software_subclass").subscribe( 
      res => {
        console.log(res);})
    this.pageTitleService.setTitle("Software");
    
    this.getSoftwareList();

    //Validation Software add Form
    this.swupaddfrom =  this.formBuilder.group({
      softwareAddformName : [null, Validators.required],
      softwareAddformIp : [null, Validators.required],
      softwareAddfromType : [null, Validators.required],
      softwareAddformCredList : [null, Validators.required],
    }) 

    //Validation Cloud update Form
    this.softwareupfrom =  this.formBuilder.group({
      softwareUpformName : [null, Validators.required],
      softwareUpformIp : [null, Validators.required],
      softwareUpformType : [null, Validators.required],
      softwareUpformCredList : [null, Validators.required],
    }) 
  }


  // Get Cloud Cred List Function
  getCloudCredListfn():void{
    this.hddmService.credListGetServ().subscribe( 
      res => {
        console.log(res);
        if(res['result'] == "success"){
          this.softwarecredlist = res['data'].slice(1);
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
    this.softwareUpName = data[1];
    this.softwareUpIp = data[2];
    this.softwareUpType = data[3];
    this.softwareUpCredList = data[4];
    this.softwareUpId = data[0];
    this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  // software Add Modal Function
  softwareAddModalFn(modal):void{
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
 
   // Get Cloud List Function
   getSoftwareList():void{
    this.hddmService.softwareAddService().subscribe( 
      res => {
        console.log(res);
        if(res['result'] == "success"){
          this.softwareSubClasslist = res['data'].slice(1);
          // this.toastr.success(res['result']);
          // }else{
          // this.toastr.error(res['data']);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  

  

}
