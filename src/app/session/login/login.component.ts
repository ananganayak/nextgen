import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../service/auth-service/auth.service';
import { TokenStorageService } from '../../service/token-storage.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { from } from 'rxjs';

@Component({
  selector: 'ms-login-session',
  templateUrl: './login-component.html',
  styleUrls: ['./login-component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class LoginComponent {

  loginPage = true;
  loginFirstTimePage = false;
  loginLicensePage = false;

  email: string;
  password: string;

  txtNewPwd: string;
  txtConfNewPwd: string;
  txtLicense: string;

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  pagePermissionData;
  constructor(
    public authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    public translate: TranslateService,
    private tokenStorage: TokenStorageService) { }

  // when email and password is correct, user logged in.
  // login(value) {
  //    this.authService.loginUser(value);
  // }

  loginFn(){
    this.loginPage = true;
    this.loginFirstTimePage = false;
    this.loginLicensePage = false;
  }

  login(value): void {
    console.log(value);
    this.authService.loginUser(value).subscribe(
      data => {
        console.log(data);
        if (data.result === 'success') {
          if(data.result == "success" && data.license == "License Expired"){
            this.loginPage = false;
            this.loginFirstTimePage = false;
            this.loginLicensePage = true;
            this.tokenStorage.saveToken(data.session_id);
            this.toastr.error(data.result);
          }else if(data.result == "success" && data.first_time_login == "Y"){
            this.loginPage = false;
            this.loginFirstTimePage = true;
            this.loginLicensePage = false;
            this.tokenStorage.saveToken(data.session_id);
            this.tokenStorage.saveUser(data);
            this.toastr.success(data.result);
            
          }else{
            this.loginPage = true;
            this.loginFirstTimePage = false;
            this.loginLicensePage = false;
            this.pagePermissionData = data.mapper;
            this.tokenStorage.saveToken(data.session_id);
            this.tokenStorage.saveUser(data);
            this.isLoginFailed = false;
            this.isLoggedIn = true;
            this.loginFirstTimePage = false;
            this.loginLicensePage = false;
            this.roles = this.tokenStorage.getUser().roles;
            // this.reloadPage();
            this.router.navigate(['/monitoring/dashboard']);
            this.toastr.success(data.result);
          }
        } else {
          this.toastr.error(data.data);
        }
      },
      err => {
        console.log(err);
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  // Update License Function
  updateLicenseKeyFn(value){
    console.log(value);
    const dataset ={
      key : this.txtLicense
    } 
    if(dataset.key == ""){
      this.toastr.error("Enter The License key and Update");
    }else{
      this.authService.updateLicenseService(dataset).subscribe(
        data => {
          console.log(data);
          if (data.result === 'success') {
            this.loginPage = true;
            this.loginFirstTimePage = false;
            this.loginLicensePage = false;
            this.toastr.success(data.data);
          } else {
            this.toastr.error(data.data);
          }
        },
        err => {
          console.log(err);
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
        }
      );
    }
  }

  // Update Password Function
  pwdResetFn(value){
    console.log(value);
    if(!value.txtNewPwd){
      this.toastr.error("Enter Your Password");
    }else if(!value.txtConfNewPwd){
      this.toastr.error("Enter Your Confirm Password");
    }else if(value.txtConfNewPwd != value.txtNewPwd){
      this.toastr.error("Password Mismatch");
    }else if(value.txtConfNewPwd == value.txtNewPwd){
      this.authService.resetPasswordService(value).subscribe(
        res => {
          console.log(res);
          if (res['result'] === 'success') {
            this.toastr.success(res['data']);
            this.txtConfNewPwd = '';
            this.txtNewPwd = '';
            this.loginPage = true;
            this.loginFirstTimePage = false;
            this.loginLicensePage = false;
          } else {
            this.toastr.error(res['data']);
          }
        },
        err => {
          console.log(err);
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
        }
      );
    }
  }


  // Reload Page Service
  reloadPage(): void {
    window.location.reload();
  }
}



