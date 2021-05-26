import { Component, OnInit } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import { HddmService } from '../../service/hddm.service';
import { Router,NavigationEnd } from '@angular/router';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TokenStorageService } from '../../service/token-storage.service';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'app/service/api.service';
import { ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, FormControl, Validators} from "@angular/forms";
import  {io} from 'socket.io-client';

@Component({
  selector: 'ms-discovery',
  templateUrl: './discovery.component.html',
  styleUrls: ['./discovery.component.scss']
})
export class DiscoveryComponent implements OnInit {

  disList;
  selDisUpCredName;
  disUpIP;
  disCredMasterList;
  closeResult = '';
  disIpRange;
  discoverIpInput = false;
  discoveryBtn = false;

  private socket: any;

  constructor(private pageTitleService: PageTitleService,
    private toastr : ToastrService,
    private formBuilder: FormBuilder,
    private router: Router, 
    public hddmService: HddmService, 
    private modalService: NgbModal,
    config: NgbModalConfig,
    private apiService: ApiService,
    private tokenStorage: TokenStorageService ) {
      this.socket = io(this.apiService.webSocketApi);
     }

  ngOnInit(): void {
    this.pageTitleService.setTitle("Discovery");
    this.getDiscoveryList();
    this.getCredMasterList();

    this.socket.on('connect', function () {
      console.log("Alert socket Connected");
    });

  }


  //cred list details get function
  getDiscoveryList():void{
    this.hddmService.discoveryDetailsService().subscribe( 
      res => {
        // console.log(res);
        if(res['result'] == "success"){
          // this.disList = res['data'];
          const final_arr = [];
          for (var i = 0; i < res['data'].length; i++) {
              var row_arr = res['data'][i];
              const temp_arr = {
                  cred_name: row_arr['cred_name'],
                  ip_address: row_arr['ip_address'],
                  operating_system: row_arr['operating_system']
              };
              final_arr.push(temp_arr);
          }
          this.disList = final_arr;
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


  // Get Cred Master Detail
  getCredMasterList():void{
    this.hddmService.discoveryCredMasterService().subscribe( 
      res => {
        // console.log(res);
        if(res['result'] == "success"){
          this.disCredMasterList = res['data'];
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

  // discover the list
  discoverFn(){
    if(!this.disIpRange){
      this.toastr.error('Enter The Ip Address');
    }else{
      this.discoverIpInput = true;
      this.discoveryBtn = true;
      
      const dataarr = {
        ip_range: this.disIpRange
      }
      this.socket.emit("initiateDiscovery", dataarr);
      
      this.socket.on('discovery_result', function (data) {
        console.log(data);
        var res_arr = data;
        if (res_arr.Action == "create" && res_arr.Module == "discovery") {
            var temp_arr = {
                cred_name: "",
                ip_address: res_arr.Data["ipaddress"],
                operating_system: res_arr.Data["OS"]
            };
            this.disList.push(temp_arr);
        }else if(res_arr.Module == "discovery" && res_arr.Action == "notify"){
            if(res_arr.Data == "Discovery Completed"){
                $(".x").hide();
                this.discoverIpInput = false;
                this.discoveryBtn = false;
                this.disIpRange = "";
                this.toastr.success("Discovery Completed!");
                // notie.alert(1, "Discovery Completed!", config.notify_delay);
            }
        }
      });
      // this.socket.emit("initiateDiscovery", dataarr)
    }

  }

  // this.socket.on('discovery_result', function(dataarr){

  // })

  changeCredName(modal, name, ip):void{
    console.log(modal, ip, name);
    this.selDisUpCredName = name;
    this.disUpIP = ip;
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


  // Discovery Cred Update Function
  submitDisCreateUpdate():void{
    const dataset = {
      "mappers": this.selDisUpCredName
    }
    this.hddmService.discoveryCredUpdateService(dataset).subscribe( 
      res => {
        // console.log(res);
        if(res['result'] == "success"){
          this.toastr.success(res['result']);
          this.getDiscoveryList();
          }else{
          this.toastr.error(res['data']);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  //Discovery DeAttach Function
  disDeattach(ip):void{
    const dataset = {
      "device_list": ip
    }
    this.hddmService.discoveryDeattachService(dataset).subscribe( 
      res => {
        // console.log(res);
        if(res['result'] == "success"){
          this.toastr.success(res['data']);
          this.getDiscoveryList();
          }else{
          this.toastr.error(res['data']);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  // Discovery DeAttach Function
  disDelete(ip):void{
    this.hddmService.discoveryDeleteService(ip).subscribe( 
      res => {
        // console.log(res);
        if(res['result'] == "success"){
          this.toastr.success(res['data']);
          this.getDiscoveryList();
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
