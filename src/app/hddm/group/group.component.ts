import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import { HddmService } from '../../service/hddm.service';
import { Router,NavigationEnd } from '@angular/router';
import { NgbModalConfig, NgbModal, ModalDismissReasons  } from '@ng-bootstrap/ng-bootstrap';
import { TokenStorageService } from '../../service/token-storage.service';
import { ToastrService } from 'ngx-toastr';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'ms-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
  
  // @ViewChildren ('checkBox') checkBox:QueryList<any>;

  public groupaddform : FormGroup;
  public groupdateform : FormGroup;

  grouplist: any[];
  groupMachineList : any[];
  checkedItems = [];
  closeResult = '';

  txtAddGrpName;
  txtAddGrpDes;

  groupUpID
  groupUpDetails = [];
  groupUpMachineDetails = [];
  mycheckval;

  searchgroup;

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
    this.pageTitleService.setTitle("Group")
    this.getGroupListfn();

    //Validation group add Form
    this.groupaddform =  this.formBuilder.group({
      txtaddgrpname : [null, Validators.required],
      txtaddgrpdescription : [null, Validators.required],
    }) 

    //Validation group update Form
    this.groupdateform =  this.formBuilder.group({
      txtupgrpname : [null, Validators.required],
      txtupgrpdescription : [null, Validators.required],
    }) 
  }

   // Get Application Cred List Function
   getGroupListfn():void{
    this.hddmService.groupListGetServ().subscribe( 
      res => {
        console.log(res);
        if(res['result'] == "success"){
          this.grouplist = res['data'].slice(1);
          // this.toastr.success(res['result']);
        }else{
          this.toastr.error(res['data']);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  // Get Machine List Function
  getmachinedetlst():void{
    this.hddmService.groupMachineListServ().subscribe( 
      res => {
        console.log(res);
        if(res['result'] == "success"){
          this.groupMachineList = res['data'].slice(1);
          // this.toastr.success(res['result']);
        }else{
          this.toastr.error(res['data']);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  // Group Add Modal Function
  groupAddModalFn(modal):void{
    this.getmachinedetlst();
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


  // Group Add Function
  submitGroupAdd():void{
    this.mycheckval = [];
    for (let i = 0; i < this.groupMachineList.length; i++) {
      const checkval = $("input:checkbox[name=chkval"+i+"]").is(':checked'); 
      if(checkval == true){
        this.mycheckval.push(this.groupMachineList[i][0]);
      }
    }
    console.log("checked Value",  this.mycheckval);

    const dataset = {
      group_description: this.txtAddGrpDes,
      group_name: this.txtAddGrpName,
      machine_ids: this.mycheckval
    }
    if(this.mycheckval.length > 0){
      this.hddmService.groupAddPostServ(dataset).subscribe( 
        res => {
          console.log(res);
          if(res['result'] == "success"){
            this.toastr.success(res['data']);this.getGroupListfn();
          }else{
            this.toastr.error(res['data']);
          }
        },
        err => {
          console.log(err);
        }
      );
    }else{
      const msg = 'Please choose an option';
      this.toastr.error(msg);
    }
  }

  //group Update Function  
  btnUpdateGroupFn(modal, id):void{
    this.getmachinedetlst();
    this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

    this.groupUpID = id;
    this.hddmService.groupUpDetailGetServ(this.groupUpID).subscribe( 
      res => {
        console.log(res);
        if(res['result'] == "success"){
          this.groupUpDetails = res['data'];
          this.groupUpMachineDetails = res['data'].machines.slice(1);
        }else{
          this.toastr.error(res['data']);
        }
      },
      err => {
        console.log(err);
      }
    );
    
  }

  
  // Group Update FUnction
  submitGroupUpFn():void{
    this.mycheckval = [];
    for (let i = 0; i < this.groupUpMachineDetails.length; i++) {
      const checkval = $("input:checkbox[name=update_chkval"+i+"]").is(':checked'); 
      if(checkval == true){
        this.mycheckval.push(this.groupUpMachineDetails[i][0]);
      }
    }

    const dataset = {
      "group_id": this.groupUpID,
      "group_name": this.groupUpDetails['group_name'],
      "group_description": this.groupUpDetails['group_description'],
      "machine_ids" : this.mycheckval,
    }

    console.log(this.mycheckval, dataset);

    this.hddmService.groupUpDetailPutServ(dataset).subscribe( 
      res => {
        console.log(res);
        if(res['result'] == "success"){
          this.toastr.success(res['data']);this.getGroupListfn();
        }else{
          this.toastr.error(res['data']);
        }
      },
      err => {
        console.log(err);
      }
    );
  
  }

  // Group Delete Function
  btnDeleteGroupFn(id){
    this.hddmService.groupUpDetailDeleteServ(id).subscribe( 
      res => {
        console.log(res);
        if(res['result'] == "success"){
          this.toastr.success(res['data']);this.getGroupListfn();
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



