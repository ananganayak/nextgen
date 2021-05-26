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
  selector: 'ms-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.scss']
})
export class ResourceComponent implements OnInit {

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

     closeResult;
     resourcelist;
     searchresource;
     resourceitem;

     resourceAddModalFn(modal):void{
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

  

  ngOnInit(): void {
  }

}
