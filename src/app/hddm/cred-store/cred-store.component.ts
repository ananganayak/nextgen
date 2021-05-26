import { Component, OnInit } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import { HddmService } from '../../service/hddm.service';
import { Router,NavigationEnd } from '@angular/router';
import { NgbModalConfig, NgbModal, ModalDismissReasons  } from '@ng-bootstrap/ng-bootstrap';
import { TokenStorageService } from '../../service/token-storage.service';
import { ToastrService } from 'ngx-toastr';
import * as CryptoJS from 'crypto-js';
import {FormBuilder, FormGroup, FormControl, Validators} from "@angular/forms";
import { CustomValidators } from 'ng2-validation';

const password        = new FormControl('', Validators.required);
const confirmPassword = new FormControl('', CustomValidators.equalTo(password));
@Component({
  selector: 'ms-cred-store',
  templateUrl: './cred-store.component.html',
  styleUrls: ['./cred-store.component.scss'],
})
export class CredStoreComponent implements OnInit {
  public credaddform : FormGroup;
  public credupdateform : FormGroup;
  credlist: any[];
  hide = true;
  submitted = false;
  credencrypwd : string;

  credAddName;
  credAddType;
  credAddPort;
  credAddRDPort;
  credAddUsername;
  credAddpwd;
  credAddcpwd;
  closeResult = '';
  credUpUsername;
  credUpName;
  credUppwd;
  credUpcpwd;
  credenupcrypwd;
  searchcredstore;

  // Cred Type List of value
  credtypelov = [
    {
      "id" : 1,
      "value" : "WINRM",
    },{
      "id" : 2,
      "value" : "SSH",
    },{
      "id" : 3,
      "value" : "TELNET",
    },{
      "id" : 4,
      "value" : "SSH-Key",
    },{
      "id" : 5,
      "value" : "ARCON",
    },{
      "id" : 6,
      "value" : "HTTP",
    },{
      "id" : 7,
      "value" : "HTTPS",
    },{
      "id" : 8,
      "value" : "SNMP v2c",
    }
  ]  

  constructor( private pageTitleService : PageTitleService, 
    private toastr : ToastrService,
    private formBuilder: FormBuilder,
    private router: Router, 
    public hddmService: HddmService, 
    private modalService: NgbModal,
    config: NgbModalConfig,
    private tokenStorage: TokenStorageService ) {
      this.router.events.subscribe((e) => {
        if (e instanceof NavigationEnd) {
          
        }
      });
    }

  ngOnInit(): void {
    this.pageTitleService.setTitle("Cred Store");
    this.getCredList();

    // Validation Cred Add Form
    this.credaddform = this.formBuilder.group({
      txtCredName : [null, Validators.required],
      selCredType : [null, Validators.required],
      // txtPort :  [null, Validators.compose([Validators.required])],
      txtPort :  [null, Validators.required],
      txtRDPPort : [null, Validators.required],
      txtUsername : [null, Validators.required],
      txtPassword : password,
      txtCPassword : confirmPassword,
    })

    //Validation Cred Update Form
    this.credupdateform =  this.formBuilder.group({
      txtupcredname : [null, Validators.required],
      txtupusername : [null, Validators.required],
      txtupPassword : password,
      txtupCPassword : confirmPassword
    }) 

  }



  // cred list details get function
  getCredList():void{
    this.hddmService.creddetgetserv().subscribe( 
      res => {
        // console.log(res);
        if(res['result'] == "success"){
          this.credlist = res['data'].slice(1);
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
  
  // add cred modal open
  addCredDialog(add):void{
    this.modalService.open(add, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  // Update Cred Modal Open
  updateCredDialog(up, data):void{
    // console.log(data);
    this.credUpUsername = data[3];
    this.credUpName = data[1];
    this.modalService.open(up, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
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

  // Add Cred Detail Function
  submitCredAdd():void{
    this.credencrypwd = CryptoJS.AES.encrypt("@ut0!ntell!", this.credAddpwd.trim()).toString();
    const datav = {
      cred_name: this.credAddName,
      username: this.credAddUsername,
      port: this.credAddPort,
      terminal_port: this.credAddRDPort,
      password: this.credencrypwd,
      cred_type: this.credAddType,
      sudo: '',
    }
    this.hddmService.credAddService(datav).subscribe(res => {
      // console.log(res);
      if(res['result'] == "success"){
        this.toastr.success(res['data']);
        this.getCredList();
      }else{
        this.toastr.error(res['data']);
      }
    },
    err => {
      console.log(err);
    });
  }

  // Update Cred details Function
  submitCredUpdate():void{
    this.credenupcrypwd = CryptoJS.AES.encrypt("@ut0!ntell!", this.credUppwd.trim()).toString();
    const data = {
      username : this.credUpUsername,
      password : this.credenupcrypwd
    }

    this.hddmService.credUpdateService(this.credUpName, data).subscribe(res => {
      // console.log(res);
      if(res['result'] == "success"){
        this.toastr.success(res['data']);
        this.getCredList();
      }else{
        this.toastr.error(res['data']);
      }
    },
    err => {
      console.log(err);
    });
  }

// Cred Detail Delete Function
  deleteCred(name):void{
    this.hddmService.credDeletService(name).subscribe(res =>{
      if(res['result'] == "success"){
        this.toastr.success(res['data']);
        this.getCredList();
      }else{
        this.toastr.error(res['data']);
      }
    },
    err => {
      console.log(err);
    })
  }
}
