import { Component, OnInit } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import { HddmService } from '../../service/hddm.service';
import { Router,NavigationEnd } from '@angular/router';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { TokenStorageService } from '../../service/token-storage.service';
import { ToastrService } from 'ngx-toastr';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { NgbModal,NgbModalConfig,ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ms-intelli-dcm',
  templateUrl: './intelli-dcm.component.html',
  styleUrls: ['./intelli-dcm.component.scss']
})
export class IntelliDcmComponent implements OnInit {

         

          dcmlist: any[];
          closeResult='';
          
          dcmform:FormGroup;
          
          dcmAddName;
          addHostName;
          dcmAddType;

          searchdcm;
          dcmAddModal;
          dcmForm: FormGroup;

          addedDcm = [];
         

          constructor( private pageTitleService : PageTitleService, 
            private toastr : ToastrService,
            private formBuilder: FormBuilder,
            private router: Router, 
            public hddmService: HddmService, 
            private modalService: NgbModal,
            config: NgbModalConfig,
            private tokenStorage: TokenStorageService ) { }

          ngOnInit(): void {
            this.pageTitleService.setTitle("Intelli DCM")
            this.dcmForm = new FormGroup({
              hostName: new FormControl(),
              groupType: new FormControl(),
              selectKey: new FormControl(),
              conditions: new FormControl(),
              value: new FormControl(),
              descriptionformName: new FormControl()
            })
          }


        
        // policy Add Modal Function  
        dcmAddModalFn(modal):void{
          this.modalService.open(modal).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
          }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          });
        }

        // MODEL START
        open(dcmAddModal) {

          this.modalService.open(dcmAddModal, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
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

     
        closeModal():void{
          this.dcmAddModal.close();
        }


       

}