import { Injectable } from '@angular/core';


const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const USER_id = 'auth-id';
const ACCESS_CONTROL = 'auth-accesscontrol';
const USER_Role = 'auth_userrole';
const USER_Type = 'auth_user_type';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  signOut(): void {
    localStorage.clear();
  }

  public saveToken(token: string): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    // return sessionStorage.getItem(TOKEN_KEY);
    return localStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user): void {
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(USER_id);
    localStorage.removeItem(USER_Role);
    localStorage.removeItem(ACCESS_CONTROL);
    localStorage.removeItem(USER_Type);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    localStorage.setItem(USER_id, JSON.stringify(user.user_id));
    localStorage.setItem(ACCESS_CONTROL, JSON.stringify(user.mapper));
    localStorage.setItem(USER_Role, user.role_name);
    localStorage.setItem(USER_Type, user.user_type);
  }

  public getUser(): any {
    return JSON.parse(localStorage.getItem(USER_KEY));
  }

}
