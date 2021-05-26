import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { ApiService } from 'app/service/api.service';
import { ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { FlatTreeControl } from '@angular/cdk/tree';

import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { data } from 'jquery';
import { FormGroup, FormControl } from '@angular/forms';

interface FoodNode {
  name: string;
  children?: FoodNode[];
}


/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}



@Component({
  selector: 'ms-bots-repo',
  templateUrl: './bots-repo.component.html',
  styleUrls: ['./bots-repo.component.scss']
})
export class BotsRepoComponent implements OnInit {

  treedata: any = []
  maindata = []
  diagram: FoodNode[] = [];
  data: any=[];
  closeResult: string;
  botControlForm : FormGroup;
  allMenuOsType:any=[];
  bot_type;
  bot_lang:any[]=[];
  platform_type=[];
  os_type=[];
  Network;
  Security;
  Storage;
  Database;
  Application;
  editor:any;




  getDiagramData(): any {
    this.getParents();
    for (let i = 0; i < this.maindata.length; i++) {
      this.diagram.push({ "name": this.treedata[this.maindata[i]][1], "children": this.getChild(this.maindata[i]) })
    }
    return this.diagram;
  }

  getParents() {
    for (let i = 1; i < this.treedata.length; i++) {
      if (this.treedata[i][3] == "")
        this.maindata.push(this.treedata[i][0])
    }
  }

  getChild(num) {
    let children: any = [];
    for (let i = 1; i < this.treedata.length; i++) {
      if (this.treedata[i][3] == parseInt(num))
        children.push({ "name": this.treedata[i][1], "children": this.getChild(this.treedata[i][0]) })
    }
    return children;
  }
  getId(name): any {

    for (let i = 1; i < this.treedata.length; i++) {
      if (this.treedata[i][1] == name)
        return this.treedata[i][0]
    }
  }

  searchpolicy;
  allMenuBotLang;
  allMenuBotPType;
  allMenuBotOsType;
  // row:any=[9, "Windows Service Remediate", "To Remediate Windows Service Issue", "26/12/2018 17:35:00"];
  selectedBot;

  constructor(
    private pageTitleService: PageTitleService,
    private http: HttpClient,
    private apiService: ApiService,
    private modalService: NgbModal,
    private loadingBar: LoadingBarService,
    private toastr: ToastrService,
    config: NgbModalConfig,

  ) {
    // this.dataSource.data = TREE_DATA;
  }

  ngOnInit(): void {
    this.getBotRepofn();
    this.getBotRepoMastersfn();
    // this.getBotRepoDataFilefn(0);
    this.getBotRepoMastersAllDatafn();
    
    this.botControlForm=new FormGroup({
      botFormName : new FormControl(),
      botLangName : new FormControl(),
      botPlatformName : new FormControl(),
      botOsName : new FormControl()

      
    })
   
  

  }


  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  // dataSource =[];


  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;


  onBotSelected(selection) {
    this.selectedBot = selection.name;
    this.getBotRepoDataFilefn(this.getId(selection.name))
    this.getBotEditorDataFn(this.getId(selection.name))
    //  api request here 
    
  }

  getBotRepofn(): void {
    const result = this.apiService.getBotRepoDataServ().toPromise();
    result.then((res) => {
      let obj = res["data"];
      this.treedata = obj;
      this.dataSource.data = this.getDiagramData();
    
    })

  }

 
  //bot script data
  getBotRepoMastersfn(): void {
    const result = this.apiService.getBotRepoMastersDataServ().toPromise();
    result.then((res) => {
      console.log(res)
      // this.bot_lang=res.data.bot_lang;
      this.allMenuBotLang = res.data.bot_lang;
      this.allMenuBotPType=res.data.platform_type;
      this.allMenuOsType=res.data.os_type;
      // this.editor=res.data.
    })
  }
  getOsDatafn(platformType): void {

      this.allMenuBotOsType=this.allMenuOsType[platformType]
  }
  getBotRepoDataFilefn(param): void {
    const result = this.apiService.getBotRepoDataFileServ(param).toPromise();
    result.then((res) => {
     
      this.data = res["data"]
      this.data.shift();
      // this.row=res["data"][1]
      
    }

    )
  }

  getBotRepoMastersAllDatafn(){
    const result = this.apiService.getBotRepoMastersAllDataServ().toPromise();
    result.then((res) => {
      
      
       this.data=res['data'];
       this.data.shift()
  }


    )}
  
    botsAddModalFn(modal ):void{
    
      event.preventDefault();
      
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
    // OnPlatFormChange($event){
     
    //   let param='';
    //   if($event){
    //     param=$event;
    //     this.getBotEditorDataFn(param);
    //   }
    // }
    getBotEditorDataFn(param){
     
      const result=this.apiService.getBotEditorDataServ(param).toPromise()
     result.then((res)=>{
       console.log(res);
       let obj=res["data"];
       this.editor=obj["bot_script"];
       console.log("scripted data-----------------------");
       console.log(obj["bot_script"]);
     }
     )
      
    }








}
