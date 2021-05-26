import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import * as CryptoJS from 'crypto-js';
import { ApiService } from '../api.service';



@Injectable({
   providedIn: 'root'
})
export class AuthService {

   user: Observable<firebase.User>;
   userData: any;
   isLoggedIn = false;

   httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
   };

   constructor(private firebaseAuth: AngularFireAuth,
      private router: Router,
      private toastr: ToastrService,
      private http: HttpClient,
      private apiService: ApiService
   ) {
      this.user = firebaseAuth.authState;
   }

   /*
    *  getLocalStorageUser function is used to get local user profile data.
    */

   getLocalStorageUser() {
      this.userData = JSON.parse(localStorage.getItem('auth-user'));
      if (this.userData) {
         this.isLoggedIn = true;
         return true;
      } else {
         this.isLoggedIn = false;
         return false;
      }
   }

   /*
* signupUserProfile method save email and password into firabse &
* signupUserProfile method save the user sign in data into local storage.
*/

   signupUserProfile(value) {
      this.firebaseAuth
         .createUserWithEmailAndPassword(value.email, value.password)
         .then(value => {
            this.toastr.success('Successfully Signed Up!');
            this.setLocalUserProfile(value);
            this.router.navigate(['/']);
         })
         .catch(err => {
            this.toastr.error(err.message);
         });
   }

   /*
    * loginUser fuction used to login
   */

   // loginUser(value) {
   //    this.firebaseAuth
   //    .signInWithEmailAndPassword(value.email,value.password)
   //    .then(value => {
   //       // this.setLocalUserProfile(value);
   //       this.toastr.success('Successfully Logged In!');
   //       this.router.navigate(['/dashboard/auto-classfication-dashboard']);
   //    })
   //    .catch(err => {
   //       this.toastr.error(err.message);
   //    });
   // }

   loginUser(credentials): Observable<any> {
      const text = credentials.password;
      const secret = '@ut0!ntell!';
      const encrypass = CryptoJS.AES.encrypt(text.trim(), secret.trim()).toString();
console.log(this.apiService.MasterServerURL, this.apiService.port8000);
      // var passStr = encrypass.toString();
      return this.http.post(this.apiService.MasterServerURL + this.apiService.port8000 +'/ui/api1.0/login', {
         username: credentials.email,
         password: encrypass
      }, this.httpOptions);
   }

   // Password Reset Service
   resetPasswordService(value){
      const pwd = CryptoJS.AES.encrypt("@ut0!ntell!", value.txtNewPwd.trim()).toString();
      const dataset = {
         "pk_user_details_id" : localStorage.getItem('auth-id'),
         "user_password" : pwd,
       }
      return this.http.post(this.apiService.MasterServerURL + this.apiService.port8000 +'/ui/api1.0/login', dataset, this.httpOptions);
   }

   // Update License Service
   updateLicenseService(value): Observable<any> {
      return this.http.post(this.apiService.MasterServerURL + this.apiService.port8000 +'/ui/api1.0/license', value, this.httpOptions);
   }

   /*
    * resetPassword is used to reset your password
   */

   resetPassword(value) {
      this.firebaseAuth.sendPasswordResetEmail(value.email)
         .then(value => {
            this.toastr.success('A password reset link has been sent to this email.');
            this.router.navigate(['/session/login']);
         })
         .catch(err => {
            this.toastr.error(err.message);
         });
   }


   /*
    * resetPasswordV2 is used to reset your password
   */

   resetPasswordV2(value) {
      this.firebaseAuth.sendPasswordResetEmail(value.email)
         .then(value => {
            this.toastr.success('A password reset link has been sent to this email.');
            this.router.navigate(['/session/login']);
         })
         .catch(err => {
            this.toastr.error(err.message);
         });
   }

   /*
    * logOut function is used to sign out
   */

   logOut() {
      this.firebaseAuth
         .signOut();
      localStorage.removeItem('auth-user');
      localStorage.removeItem('auth-token');
      localStorage.clear();
      if(this.apiService.appBrand =="Nxtgen"){
         localStorage.removeItem('envirounment_ip');
         localStorage.removeItem('location');
         localStorage.setItem("envirounment_ip", "https://r2d2.nxtgen.com:");
         localStorage.setItem("location", "Bangalore");
      }
      this.isLoggedIn = false;
      this.toastr.success('Successfully logged out!');
      this.router.navigate(['/session/login']);
   }

   /*
    * setLocalUserProfile function is used to set local user profile data.
    */

   setLocalUserProfile(value) {
      localStorage.setItem('auth-user', JSON.stringify(value));
      this.getLocalStorageUser();
      this.isLoggedIn = true;
   }
}
