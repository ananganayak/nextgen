import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ms-autoscale',
  templateUrl: './autoscale.component.html',
  styleUrls: ['./autoscale.component.scss']
})
export class AutoscaleComponent implements OnInit {

  dataList=[];
  searchText;
searchCheckVal;


  constructor() { }

  ngOnInit(): void {
    
  }


showSearch(){}
updateRow(){ }
deleteRow(){}
addNewButtonfn(){}
closeModalfn(){}
submitClick(){}


}
