import { Injectable } from '@angular/core';

export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  children?: ChildrenItems[];
}

const MENUITEMS = [
  {
    state: 'dashboard',
    name: 'Dashboard',
    type: 'sub',
    label: 'old',
    icon: 'laptop',
    children: [
      { state: 'exec-summary-dashboard', name: 'Executive Summary' },
      { state: 'event-analytics-dashboard', name: 'Event Analytics' },
      { state: 'service-visual-dashboard', name: 'Service Visualization' },
      { state: 'auto-classfication-dashboard', name: 'Auto Classification' }
    ]
  },
  {
    state: 'monitoring',
    name: 'Monitoring',
    type: 'sub',
    label: 'old',
    icon: 'dvr',
    pname: 'Monitoring',
    children: [
      { state: 'dashboard', name: 'Dashboard', pname: 'Monitoring_Dashboard'},
      { state: 'nxt-gen-support-dashboard', name: 'Nxtgen Support Dashboard', pname: 'Monitoring_CW Dashboard' },
      { state: 'monitoring', name: 'Monitoring', pname: 'Monitoring_Monitoring'},
      { state: 'reports', name: 'Reports', pname: 'Monitoring_Reports_Availability' },
      { state: 'unknowns', name: 'Unknowns', pname: 'Monitoring_Unknowns'}
    ]
  }, {
    state: 'eventmanagement',
    name: 'Event management',
    type: 'sub',
    label: 'old',
    icon: 'library_add',
    pname: 'Event Management',
    children: [
      { state: 'alerts', name: 'Alerts', pname: 'Event Management_Alerts' },
      { state: 'events', name: 'Events', pname: 'Event Management_Events' },
      { state: 'drop-events', name: 'Drop Events', pname: 'Event Management_Events' },
      // {state: 'saas', name: 'Auto Classification', pname: 'Event Management_Events'} 
    ]
  }, {
    state: 'hddm',
    name: 'Hddm',
    type: 'sub',
    label: 'old',
    icon: 'storage',
    pname: 'HDDM',
    children: [
      { state: 'cred-store', name: 'Cred Store', pname: 'HDDM_Cred Store' },
      { state: 'discovery', name: 'Discovery', pname: 'HDDM_Discovery' },
      { state: 'machine', name: 'Machine', pname: 'HDDM_Machine' },
      { state: 'group', name: 'Group', pname: 'HDDM_Group' },
      { state: 'application', name: 'Application', pname: 'HDDM_Application' },
      { state: 'cloud', name: 'Cloud', pname: 'HDDM_Cloud' },
      { state: 'software', name: 'Software', pname: 'HDDM_Software' },
      { state: 'resource', name: 'Resource', pname: 'HDDM_Resource' }


    ]
  }, {
    state: 'reports',
    name: 'Reports',
    type: 'sub',
    label: 'old',
    icon: 'assignment',
    pname: 'Reports',
    children: [
      { state: 'vm-summary-report', name: 'VM Summary Report', pname: 'Reports_VM Summary' },
      { state: 'performances-report', name: 'Performance Report', pname: 'Reports_Performance Report New' },
      // {state: 'crm', name: 'Performance Report old', pname: 'Reports_Performance Report New' },
      // {state: 'saas', name: 'Auto Classification', pname: 'Reports_Performance Report New' }
      { state: 'edgeuplink-report', name: 'Edge Uplink In/Out', pname: 'Reports_Edge Uplink In/Out' }

    ]
  }, {
    state: 'admin',
    name: 'Admin',
    type: 'sub',
    label: 'old',
    icon: 'supervisor_account',
    pname: 'Admin',
    children: [
      { state: 'users', name: 'Users', pname: 'Admin_Users' },
      { state: 'roles', name: 'Roles', pname: 'Admin_Roles' },
      { state: 'smtp', name: 'Smtp', pname: 'Admin_SMTP' },
      { state: 'ldap', name: 'Ldap', pname: 'Admin_LDAP' },
      { state: 'bots-repo', name: 'Bots Repo', pname:'Admin_BOT Repo' },
      { state: 'policy-engine', name: 'Policy Engine', pname:'Admin_Policy Engine' },
      { state: 'csmapping', name: 'CS Mapping', pname:'Admin_CS Mapping' },
      { state: 'license', name: 'License', pname: 'Admin_License' },
      { state: 'arcon', name: 'Arcon', pname: 'Admin_ARCON' },
      {state: 'intelli-dcm' , name:'Intelli-DCM' ,pname:'Admin_Intelli-DCM'}
    ]
  }, {
    state: 'automation',
    name: 'Automation',
    type: 'sub',
    label: 'old',
    icon: 'auto_graph',
    pname: 'Automation',
    children: [
      { state: 'catalog', name: 'Catalog', pname: 'Automation_Catalogue' },
      { state: 'designer', name: 'Designer', pname: 'Automation_Designer' },
      { state: 'review', name: 'Review', pname: 'Automation_Review' },
      { state: 'dashboard', name: 'Dashboard', pname: 'Automation_Dashboard' },
      { state: 'reports', name: 'Reports', pname: 'Automation_Reports' },

    ]
  },
  {
    state: 'cloudservice',
    name: 'Cloud',
    type: 'sub',
    label: 'old',
    icon: 'cloud',
    pname: 'Cloud',
    children: [
      { state: 'autoscale', name: 'Autoscale', pname: 'Cloud_Autoscale' },
      { state: 'analytics', name: 'Analytics', pname: 'Cloud_Analytics' },

      // { state: 'designer', name: 'Designer', pname: 'Automation_Designer' },
     
    ]
  },
  {
    state: 'machinelearning',
    name: 'Machinelearning',
    type: 'sub',
    label: 'old',
    icon: 'machine',
    pname: 'Machinelearning',
    children: [
      { state: 'anomaly', name: 'Anomaly', pname: 'Machinelearning_Anomaly' },
      
    ]
  },

  // {
  //   state: 'session',
  //   name: 'Session',
  //   type: 'sub',
  //   icon: 'face',
  //   label: 'New',
  //   children: [
  //     { state: 'login', name: 'LOGIN' },
  //     { state: 'loginV2', name: 'LOGIN V2', label: 'New' },
  //     { state: 'register', name: 'REGISTER' },
  //     { state: 'registerV2', name: 'REGISTER V2', label: 'New' },
  //     { state: 'forgot-password', name: 'FORGOT' },
  //     { state: 'forgot-passwordV2', name: 'FORGOT V2', label: 'New' },
  //     { state: 'lockscreen', name: 'LOCKSCREEN' },
  //     { state: 'lockscreenV2', name: 'LOCKSCREEN V2', label: 'New' }
  //   ]
  // }
  
];

@Injectable()
export class MenuItems {
  // mainDataMenu = [];  
  

  getAll(): Menu[] {
    return MENUITEMS;
  }

  add(menu: any) {
    MENUITEMS.push(menu);
  }
}
