import { filter } from 'rxjs/operators';
import { Component, OnInit, OnDestroy, ViewChild, HostListener, ViewEncapsulation } from '@angular/core';
import { MenuItems } from '../core/menu/menu-items/menu-items';
import { BreadcrumbService } from 'ng5-breadcrumb';
import { PageTitleService } from '../core/page-title/page-title.service';
import { TranslateService } from '@ngx-translate/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import * as CryptoJS from 'crypto-js';
import {FormBuilder, FormGroup, FormControl, Validators} from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { CustomValidators } from 'ng2-validation';
// import { TourService } from 'ngx-tour-md-menu';
import { NgbModalConfig, NgbModal, ModalDismissReasons  } from '@ng-bootstrap/ng-bootstrap';
import PerfectScrollbar from 'perfect-scrollbar';
import { AuthService } from '../service/auth-service/auth.service';
import { CoreService } from '../service/core/core.service';
import { TokenStorageService } from '../service/token-storage.service';
import { ApiService } from 'app/service/api.service';

declare var require: any

const screenfull = require('screenfull');
const password        = new FormControl('', Validators.required);
const confirmPassword = new FormControl('', CustomValidators.equalTo(password));
@Component({
  selector: 'gene-layout',
  templateUrl: './main-material.html',
  styleUrls: ['./main-material.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '(window:resize)': 'onResize($event)'
  }
})

export class MainComponent implements OnInit, OnDestroy {

  currentUrl: any;
  root: any = 'ltr';
  layout: any = 'ltr';
  currentLang: any = 'en';
  customizerIn = false;
  showSettings = false;
  chatpanelOpen = false;
  sidenavOpen = true;
  isMobile = false;
  isFullscreen = false;
  collapseSidebarStatus: boolean;
  header: string;
  dark: boolean;
  compactSidebar: boolean;
  isMobileStatus: boolean;
  sidenavMode = 'side';
  popupDeleteResponse: any;
  sidebarColor: any;
  url: string;
  resetPassword = false;
  windowSize: number;
  username: string;
  public pwdresetform : FormGroup;
  private _routerEventsSubscription: Subscription;
  private _router: Subscription;
  @ViewChild('sidenav', { static: true }) sidenav;

  sideBarFilterClass: any = [
    {
      sideBarSelect: 'sidebar-color-1',
      colorSelect: 'sidebar-color-dark'
    },
    {
      sideBarSelect: 'sidebar-color-2',
      colorSelect: 'sidebar-color-primary',
    },
    {
      sideBarSelect: 'sidebar-color-3',
      colorSelect: 'sidebar-color-accent'
    },
    {
      sideBarSelect: 'sidebar-color-4',
      colorSelect: 'sidebar-color-warn'
    },
    {
      sideBarSelect: 'sidebar-color-5',
      colorSelect: 'sidebar-color-green'
    }
  ]

  headerFilterClass: any = [
    {
      headerSelect: 'header-color-1',
      colorSelect: 'header-color-dark'
    },
    {
      headerSelect: 'header-color-2',
      colorSelect: 'header-color-primary'
    },
    {
      headerSelect: 'header-color-3',
      colorSelect: 'header-color-accent'
    },
    {
      headerSelect: 'header-color-4',
      colorSelect: 'header-color-warning'
    },
    {
      headerSelect: 'header-color-5',
      colorSelect: 'header-color-green'
    }
  ]

  chatList: any[] = [
    {
      image: 'assets/img/user-1.jpg',
      name: 'John Smith',
      chat: 'Lorem ipsum simply dummy',
      mode: 'online'
    },
    {
      image: 'assets/img/user-2.jpg',
      name: 'Amanda Brown',
      chat: 'Lorem ipsum simply dummy',
      mode: 'online'
    },
    {
      image: 'assets/img/user-3.jpg',
      name: 'Justin Randolf',
      chat: 'Lorem ipsum simply dummy',
      mode: 'offline'
    },
    {
      image: 'assets/img/user-4.jpg',
      name: 'Randy SunSung',
      chat: 'Lorem ipsum simply dummy',
      mode: 'online'
    },
    {
      image: 'assets/img/user-5.jpg',
      name: 'Lisa Myth',
      chat: 'Lorem ipsum simply dummy',
      mode: 'online'
    },
  ]

  txtNewPassword;
  txtConfPassword;
  closeResult = '';
  customerLocation;
  location;
  showLocationMenu = false;
  constructor(
    // public tourService: TourService,
    public menuItems: MenuItems,
    private formBuilder: FormBuilder,
    private breadcrumbService: BreadcrumbService,
    private pageTitleService: PageTitleService,
    public translate: TranslateService,
    private router: Router,
    private authService: AuthService,
    public coreService: CoreService,
    private routes: Router,
    private modalService: NgbModal,
    config: NgbModalConfig,
    private toastr : ToastrService,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private tokenStorage: TokenStorageService) {

    const browserLang: string = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
    this.username = this.tokenStorage.getUser().user_id;

    // this.tourService.initialize([{
    // 	anchorId: 'start.tour',
    // 	content: 'Welcome to Gene admin panel!',
    // 	placement: 'below',
    // 	title: 'Welcome to Gene',
    // },
    // {
    // 	anchorId: 'tour-search',
    // 	content: 'Enjoying Search box with sugestion and many more things',
    // 	placement: 'below',
    // 	title: 'Search Box',
    // },
    // {
    // 	anchorId: 'tour-full-screen',
    // 	content: 'By pressing this button you can switch to fullscreen mode.',
    // 	placement: 'below',
    // 	title: 'Full Screen',
    // },
    // {
    // 	anchorId: 'tour-ui',
    // 	content: 'Show your site stats with unique designed cards',
    // 	placement: 'below',
    // 	title: 'Stats Cards',
    // }]);

    // if(window.innerWidth>1199){
    // 	this.tourService.start();
    // }

    breadcrumbService.addFriendlyNameForRoute('/dashboard', 'Dashboard');
    breadcrumbService.addFriendlyNameForRoute('/monitoring', 'Monitoring');
    breadcrumbService.addFriendlyNameForRoute('/eventmanagement', 'EVM');
    breadcrumbService.addFriendlyNameForRoute('/hddm', 'HDDM');
    breadcrumbService.addFriendlyNameForRoute('/reports', 'Reports');
    breadcrumbService.addFriendlyNameForRoute('/dashboard/exec-summary-dashboard', 'Execute Summary');
    breadcrumbService.addFriendlyNameForRoute('/dashboard/event-analytics-dashboard', 'Event Analytics');
    breadcrumbService.addFriendlyNameForRoute('/dashboard/service-visual-dashboard', 'Service Visual');
    breadcrumbService.addFriendlyNameForRoute('/dashboard/auto-classfication-dashboard', 'Auto Classfication');
    breadcrumbService.addFriendlyNameForRoute('/monitoring/dashboard', 'Dashboard');
    breadcrumbService.addFriendlyNameForRoute('/monitoring/nxt-gen-support-dashboard', 'Nxtgen Support Dashboard');
    breadcrumbService.addFriendlyNameForRoute('/monitoring/monitoring', 'Monitoring');
    breadcrumbService.addFriendlyNameForRoute('/monitoring/reports', 'Reports');
    breadcrumbService.addFriendlyNameForRoute('/monitoring/unknowns', 'Unknowns');
    breadcrumbService.addFriendlyNameForRoute('/eventmanagement/alerts', 'Alerts');
    breadcrumbService.addFriendlyNameForRoute('/eventmanagement/events', 'Events');
    breadcrumbService.addFriendlyNameForRoute('/eventmanagement/drop-events', 'Drop Events');
    breadcrumbService.addFriendlyNameForRoute('/hddm/cred-store', 'CRED Store');
    breadcrumbService.addFriendlyNameForRoute('/hddm/discovery', 'Discovery');
    breadcrumbService.addFriendlyNameForRoute('/hddm/machine', 'Machine');
    breadcrumbService.addFriendlyNameForRoute('/hddm/group', 'Group');
    breadcrumbService.addFriendlyNameForRoute('/hddm/application', 'Application');
    breadcrumbService.addFriendlyNameForRoute('/hddm/cloud', 'Cloud');
    breadcrumbService.addFriendlyNameForRoute('/reports/vm-summary-report', 'Vm Summary Report');
    breadcrumbService.addFriendlyNameForRoute('/reports/performances-report', 'Performance Report');
    breadcrumbService.addFriendlyNameForRoute('/cloudservice', 'Cloudservice');
    breadcrumbService.addFriendlyNameForRoute('/cloudservice/autoscale', 'Autoscale');
    breadcrumbService.addFriendlyNameForRoute('/cloudservice/analytics', 'Analytics');



  }

  ngOnInit() {
    let that = this;
    setTimeout(() => {
      that.collapseSidebar();
    }, 1000);

    

    if(this.apiService.appBrand == "Nxtgen"){

      this.showLocationMenu = true;

      // if(localStorage.getItem("envirounment_ip") == "https://r2d23.nxtgen.com:"){
      //   localStorage.setItem("envirounment_ip", "https://r2d23.nxtgen.com:");
      //   localStorage.setItem("location", "Faridabad");
      // }else if (localStorage.getItem("envirounment_ip") == "https://r2d22.nxtgen.com:"){
      //   localStorage.setItem("envirounment_ip", "https://r2d22.nxtgen.com:");
      //   localStorage.setItem("location", "Ahmedabad");
      // }else if (localStorage.getItem("envirounment_ip") == "https://r2d21.nxtgen.com:"){
      //   localStorage.setItem("envirounment_ip", "https://r2d21.nxtgen.com:");
      //   localStorage.setItem("location", "Mumbai");
      // }else{
      //   localStorage.setItem("envirounment_ip", "https://r2d2.nxtgen.com:");
      //   localStorage.setItem("location", "Bangalore");
      // }

      this.location = localStorage.getItem('location');

      console.log(this.location);

      this.customerLocation = [
        {
          "ip" : "https://r2d2.nxtgen.com:",
          "name" : "Bangalore"
        },{
          "ip" : "https://r2d22.nxtgen.com:",
          "name" : "Ahmedabad"
        },{
          "ip" : "https://r2d23.nxtgen.com:",
          "name" : "Faridabad"
        },{
          "ip" : "https://r2d21.nxtgen.com:",
          "name" : "Mumbai"
        }
      ] 
      this.pwdresetform =  this.formBuilder.group({
        txtNewPassword : password,
        txtConfPassword : confirmPassword,
      }) 
    }

    const userType = localStorage.getItem('auth_user_type');
    console.log(userType);

    if (userType == 'Non LDAP'){
      this.resetPassword = true;
    }else if(userType == 'LDAP'){
      this.resetPassword = false;
    }

    this.coreService.collapseSidebarStatus = this.coreService.collapseSidebar;
    this.pageTitleService.title.subscribe((val: string) => {
      this.header = val;
    });

    this._router = this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      this.coreService.collapseSidebarStatus = this.coreService.collapseSidebar;
      this.url = event.url;
      this.customizeSidebar();
    });
    this.url = this.router.url;
    this.customizeSidebar();

    setTimeout(() => {
      this.windowSize = window.innerWidth;
      this.resizeSideBar();
    }, 0)


    this._routerEventsSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && this.isMobile) {
        this.sidenav.close();
      }
    });


  }

  ngOnDestroy() {
    this._router.unsubscribe();
  }

  /**
    *As router outlet will emit an activate event any time a new component is being instantiated.
    */
  onActivate(e, scrollContainer) {
    scrollContainer.scrollTop = 0;
  }

  resetPwdfn(modal){
    this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  submitResetFn(){
      const pwd = CryptoJS.AES.encrypt("@ut0!ntell!", this.txtNewPassword.trim()).toString();
      const dataset = {
        "pk_user_details_id" : localStorage.getItem('auth-id'),
        "user_password" : pwd,
      }
      console.log(dataset);
      this.apiService.resetPassService(dataset).subscribe( 
        res => {
          console.log(res);
          if(res['result'] == "success"){
            this.toastr.success(res['data']);
          }else{
            this.toastr.error(res['data']);
          }
        },
        err => {
          console.log(err);
        }
      );
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

  changeLocationFn(locat){
    if(locat == "https://r2d2.nxtgen.com:"){
      localStorage.setItem("envirounment_ip", "https://r2d2.nxtgen.com:");
      location.reload(); 
    }else if(locat == "https://r2d22.nxtgen.com:"){
      localStorage.setItem("envirounment_ip", "https://r2d22.nxtgen.com:");
      location.reload(); 
    }else if(locat == "https://r2d23.nxtgen.com:"){
      localStorage.setItem("envirounment_ip", "https://r2d23.nxtgen.com:");
      location.reload(); 
    }else if(locat == "https://r2d21.nxtgen.com:"){
      localStorage.setItem("envirounment_ip", "https://r2d21.nxtgen.com:");
      location.reload(); 
    }
    this.location = location;
  }
  /**
    * toggleFullscreen method is used to show a template in fullscreen.
    */
  toggleFullscreen() {
    if (screenfull.isEnabled) {
      screenfull.toggle();
      this.isFullscreen = !this.isFullscreen;
    }
  }

  /**
    * customizerFunction is used to open and close the customizer.
    */
  customizerFunction() {
    this.customizerIn = !this.customizerIn;
  }

  /**
    * addClassOnBody method is used to add a add or remove class on body.
    */
  addClassOnBody(event) {
    const body = document.body;
    if (event.checked) {
      body.classList.add('dark-theme-active');
    } else {
      body.classList.remove('dark-theme-active');
    }
  }

  /**
    * changeRTL method is used to change the layout of template.
    */
  changeRTL(isChecked) {
    if (isChecked) {
      this.layout = 'rtl'
    } else {
      this.layout = 'ltr'
    }
  }

  /**
    * toggleSidebar method is used a toggle a side nav bar.
    */
  toggleSidebar() {
    this.coreService.sidenavOpen = !this.coreService.sidenavOpen;
  }

  /**
    * logOut method is used to log out the  template.
    */
  logOut() {
    this.authService.logOut();
  }

  /**
    * sidebarFilter function filter the color for sidebar section.
    */
  sidebarFilter(selectedFilter) {
    for (let i = 0; i < this.sideBarFilterClass.length; i++) {
      document.getElementById('main-app').classList.remove(this.sideBarFilterClass[i].colorSelect);
      if (this.sideBarFilterClass[i].colorSelect === selectedFilter.colorSelect) {
        document.getElementById('main-app').classList.add(this.sideBarFilterClass[i].colorSelect);
      }
    }
    document.querySelector('.radius-circle').classList.remove('radius-circle');
    document.getElementById(selectedFilter.sideBarSelect).classList.add('radius-circle');
  }

  /**
    * headerFilter function filter the color for header section.
    */
  headerFilter(selectedFilter) {
    for (let i = 0; i < this.headerFilterClass.length; i++) {
      document.getElementById('main-app').classList.remove(this.headerFilterClass[i].colorSelect);
      if (this.headerFilterClass[i].colorSelect === selectedFilter.colorSelect) {
        document.getElementById('main-app').classList.add(this.headerFilterClass[i].colorSelect);
      }
    }
    document.querySelector('.radius-active').classList.remove('radius-active');
    document.getElementById(selectedFilter.headerSelect).classList.add('radius-active');
  }

  /**
    *chatMenu method is used to toggle a chat menu list.
    */
  chatMenu() {
    document.getElementById('gene-chat').classList.toggle('show-chat-list');
  }

  /**
    * onChatOpen method is used to open a chat window.
    */
  onChatOpen() {
    document.getElementById('chat-open').classList.toggle('show-chat-window');
  }

  /**
    * onChatWindowClose method is used to close the chat window.
    */
  chatWindowClose() {
    document.getElementById('chat-open').classList.remove('show-chat-window');
  }

  collapseSidebar() {
    console.log('collapseSidebar');
    document.getElementById('main-app').classList.add('collapsed-sidebar');
  }

  // onResize method is used to set the side bar according to window width.
  onResize(event) {
    this.windowSize = event.target.innerWidth;
    this.resizeSideBar();
  }

  // customizeSidebar method is used to change the side bar behaviour.
  customizeSidebar() {
    if ((this.url === '/dashboard/courses' || this.url === '/courses/courses-list' || this.url === '/courses/course-detail' || this.url === '/ecommerce/shop' || this.url === '/ecommerce/checkout' || this.url === '/ecommerce/invoice') && this.windowSize < 1920) {
      this.coreService.sidenavMode = 'over';
      this.coreService.sidenavOpen = false;
      if (!(document.getElementById('main-app').classList.contains('sidebar-overlay'))) {
        document.getElementById('main-app').className += ' sidebar-overlay';
      }

    } else if ((window.innerWidth > 1200) && (this.url === '/dashboard/crypto' || this.url === '/crypto/marketcap' || this.url === '/crypto/wallet' || this.url === '/crypto/trade')) {
      this.collapseSidebarStatus = this.coreService.collapseSidebar;
      if ((this.collapseSidebarStatus === false) && (window.innerWidth > 1200)) {
        document.getElementById('main-app').className += ' collapsed-sidebar';
        this.coreService.collapseSidebar = true;
        this.coreService.sidenavOpen = true;
        this.coreService.sidenavMode = 'side';
        document.getElementById('main-app').classList.remove('sidebar-overlay');
      }
    } else if ((window.innerWidth > 1200) && !(this.url === '/dashboard/courses' || this.url === '/courses/courses-list' || this.url === '/courses/course-detail' || this.url === '/ecommerce/shop' || this.url === '/ecommerce/checkout' || this.url === '/ecommerce/invoice')) {
      this.coreService.sidenavMode = 'side';
      this.coreService.sidenavOpen = true;
      // for responsive
      const main_div = document.getElementsByClassName('app');
      for (let i = 0; i < main_div.length; i++) {
        if (main_div[i].classList.contains('sidebar-overlay')) {
          document.getElementById('main-app').classList.remove('sidebar-overlay');
        }
      }
    } else if (window.innerWidth < 1200) {
      this.coreService.sidenavMode = 'over';
      this.coreService.sidenavOpen = false;
      const main_div = document.getElementsByClassName('app');
      for (let i = 0; i < main_div.length; i++) {
        if (!(main_div[i].classList.contains('sidebar-overlay'))) {
          document.getElementById('main-app').className += ' sidebar-overlay';
        }
      }
    }
  }

  // To resize the side bar according to window width.
  resizeSideBar() {
    if (this.windowSize < 1200) {
      this.isMobileStatus = true;
      this.isMobile = this.isMobileStatus;
      this.coreService.sidenavMode = 'over';
      this.coreService.sidenavOpen = false;
      // for responsive
      const main_div = document.getElementsByClassName('app');
      for (let i = 0; i < main_div.length; i++) {
        if (!(main_div[i].classList.contains('sidebar-overlay'))) {
          if (document.getElementById('main-app')) {
            document.getElementById('main-app').className += ' sidebar-overlay';
          }
        }
      }
    } else if ((this.url === '/dashboard/courses' || this.url === '/courses/courses-list' || this.url === '/courses/course-detail' || this.url === '/ecommerce/shop' || this.url === '/ecommerce/checkout' || this.url === '/ecommerce/invoice') && this.windowSize < 1920) {
      this.customizeSidebar();
    } else {
      this.isMobileStatus = false;
      this.isMobile = this.isMobileStatus;
      this.coreService.sidenavMode = 'side';
      this.coreService.sidenavOpen = true;
      // for responsive
      const main_div = document.getElementsByClassName('app');
      for (let i = 0; i < main_div.length; i++) {
        if (main_div[i].classList.contains('sidebar-overlay')) {
          document.getElementById('main-app').classList.remove('sidebar-overlay');
        }
      }
    }
  }
}


