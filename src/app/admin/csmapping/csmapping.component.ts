import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { ApiService } from 'app/service/api.service';
import { ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
@Component({
  selector: 'ms-csmapping',
  templateUrl: './csmapping.component.html',
  styleUrls: ['./csmapping.component.scss']
})
export class CsmappingComponent implements OnInit {
  CSMappingData: any;

  closeResult = '';
  mailForm :FormGroup;
  vmCustId;
  vmCustName;
  vmCustTech;
  vmWareDet;

  
    
  
  constructor(
    private pageTitleService: PageTitleService,
    private http: HttpClient,
    private apiService: ApiService,
    private modalService: NgbModal,
    private loadingBar: LoadingBarService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    config: NgbModalConfig,
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.getCSMappingData();
    // this.setArrayInputs(this.arrayInputs)
    this.mailForm = this.fb.group({
      email: this.fb.array([])
    });
  }



  getCSMappingData() {
    this.apiService
      .CSMappingDataApi()
      .subscribe(
        (data: any) => {
          this.CSMappingData = data.data;
          // console.log(this.CSMappingData, ' getCSMappingData ok');
        },
        (err: HttpErrorResponse) => {
          console.log(err, ' getCSMappingData Error');
        }
      );
  }

  csMappingDataFun(e, custid, servid) {
    console.log(e, custid, servid);
    if (e.checked == true) {
      var dataset = {
        action: "add",
        customer_id: 1,
        service_id: 1
      }
    } else {
      dataset = {
        action: "del",
        customer_id: 1,
        service_id: 1
      }
    }

    this.apiService.CSMappingMSApi(dataset).subscribe(
      (data: any) => {
        if (data.result == "success") {
          this.toastr.success(data.data);
        } else {
          this.toastr.error(data.data);
        }
      },
      (err: HttpErrorResponse) => {
        this.toastr.error('Error...');
      }
    );

  }

  VMachinesFun(modal, custid, custname, tech) {
    console.log(custid, custname, tech);
    this.vmCustId = custid;
    this.vmCustName = custname;
    this.vmCustTech = tech;
    this.apiService.CSMappingVMApi(custid, tech).subscribe(
      (res: any) => {
        if (res.result == "success") {
          this.vmWareDet = res.data.splice(1);
          // this.toastr.success(data.data);
        } else {
          this.toastr.error(res.data);
        }
      },
      (err: HttpErrorResponse) => {
        this.toastr.error('Error...');
      }
    );

    this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title', size: 'xl' }).result.then((result) => {
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

  submitVmDet() {
    var checkboxesChecked = [];
    // loop over them all
    for (let i = 0; i < this.vmWareDet.length; i++) {
      const checkval = $("input:checkbox[name=vmCheckBox" + this.vmWareDet[i][0] + "]").is(':checked');
      if (checkval == true) {
        checkboxesChecked.push(this.vmWareDet[i][0]);
      }
    }
    console.log(checkboxesChecked);
    const vmdet = {
      "customer_id": this.vmCustId,
      "vms": checkboxesChecked,
      "technology": this.vmCustTech
    }
    this.apiService.CSMappingAddVMPApi(vmdet).subscribe(
      (res: any) => {
        if (res.result == "success") {
          this.toastr.success(res.data);
        } else {
          this.toastr.error(res.data);
        }
      },
      (err: HttpErrorResponse) => {
        this.toastr.error('Error...');
      }
    );
  }

  CSMappingMail(modal) {
    

    this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title', size: 'xl' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  addmail(){
    (<FormArray>this.mailForm.get('email')).push(this.fb.group({
     mail: [],    
   }));
 }
 get email() {
  return (<FormArray>this.mailForm.get('email')).controls;
}
removeEmail(i) {
  (<FormArray>this.mailForm.get('email')).removeAt(i);
}
}
