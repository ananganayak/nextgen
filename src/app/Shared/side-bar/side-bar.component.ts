import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { CoreService } from '../../service/core/core.service';
import { MenuItems } from '../../core/menu/menu-items/menu-items';

const ACCESS_CONTROL = 'auth-accesscontrol';
const USER_Role = 'auth_userrole';

@Component({
   selector: 'ms-side-bar',
   templateUrl: './side-bar.component.html',
   styleUrls: ['./side-bar.component.scss']
})

export class SideBarComponent implements OnInit {

   mainMenu = [];

   @Input() menuList: any;
   @Input() verticalMenuStatus: boolean;

   constructor(public translate: TranslateService,
      private router: Router,
      public coreService: CoreService,
      public menuItems: MenuItems) {this.getRole();}

   ngOnInit() {
      
   }
   
   // render to the crm page
   onClick() {
      const first = location.pathname.split('/')[1];
      if (first === 'horizontal') {
         this.router.navigate(['/monitoring/dashboard']);
      } else {
         this.router.navigate(['/monitoring/dashboard']);
      }
   }

   /**
     * addMenuItem is used to add a new menu into menu list.
     */
   addMenuItem(): void {
      this.menuItems.add({
         state: 'pages',
         name: 'GENE MENU',
         type: 'sub',
         icon: 'trending_flat',
         children: [
            { state: 'blank', name: 'SUB MENU1' },
            { state: 'blank', name: 'SUB MENU2' }
         ]
      });
   }

   getRole(){
      const access_control = JSON.parse(localStorage.getItem(ACCESS_CONTROL));
      const rolename = localStorage.getItem(USER_Role);
      const menu_permission = access_control[rolename];
      var dataset = this.menuItems.getAll()
      // console.log(dataset);
      for (let i = 0; i < dataset.length; i++) {
         if(dataset[i].name){
            for (let j = 0; j < menu_permission.length; j++) {
               var pername = menu_permission[j].tab_name;
               if(pername.split("_", 1) == dataset[i]['pname']){
                  dataset[i]['view'] = true;
               }
            } 
         }
         if(dataset[i].children){
            for (let k = 0; k < dataset[i].children.length; k++) {
               if(dataset[i].children[k].name){
                  for (let j = 0; j < menu_permission.length; j++) {
                     var pername = menu_permission[j].tab_name;
                     if(menu_permission[j].tab_name == dataset[i].children[k]['pname']){
                        dataset[i].children[k]['view'] = true;
                     }
                  }
               }
            } 
         }
      }
      // console.log(dataset);

      this.mainMenu = dataset;

   }
   

}
