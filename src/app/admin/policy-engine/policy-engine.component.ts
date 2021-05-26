import { Component, OnInit } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import { HddmService } from '../../service/hddm.service';
import { Router,NavigationEnd } from '@angular/router';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { TokenStorageService } from '../../service/token-storage.service';
import { ToastrService } from 'ngx-toastr';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { MatSidenavModule } from '@angular/material/sidenav';




import { NgbModal,NgbModalConfig,ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'ms-policy-engine',
  templateUrl: './policy-engine.component.html',
  styleUrls: ['./policy-engine.component.scss']
})
export class PolicyEngineComponent implements OnInit {
  public policyaddform: FormGroup;
  public policyupdateform: FormGroup;

 

  policylist: any[];
  closeResult='';
  
 
  
  policyAddName;
  addHostName;
  policyAddType;

  searchpolicy;
  policyAddModal;
  policyForm: FormGroup;

  addedPolicies = [];
  selectedOption = 'email';
  visibleForm: string = 'email';

  constructor( private pageTitleService : PageTitleService, 
    private toastr : ToastrService,
    private formBuilder: FormBuilder,
    private router: Router, 
    public hddmService: HddmService, 
    private modalService: NgbModal,
    config: NgbModalConfig,
    private tokenStorage: TokenStorageService ) { }

  ngOnInit(): void {
    this.pageTitleService.setTitle("Policy Engine")
    this.policyForm = new FormGroup({
      hostName: new FormControl(),
      groupType: new FormControl(),
      selectKey: new FormControl(),
      conditions: new FormControl(),
      value: new FormControl(),
      descriptionformName: new FormControl()
    })
   
  }


 
// policy Add Modal Function  
policyAddModalFn(modal):void{
  this.modalService.open(modal, { size: 'xl' }).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}

// MODEL START
open(policyAddModal) {

  this.modalService.open(policyAddModal, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
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

submitPolicyAdd(addedValues){
  console.log(addedValues);
  this.addedPolicies.push(addedValues);
  console.log(this.addedPolicies);
}

onSelectionChanged(){
  console.log(this.selectedOption);
  this.visibleForm = this.selectedOption;
}

}
