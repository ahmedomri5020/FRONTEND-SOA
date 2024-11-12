import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 private helper = new JwtHelperService();

 apiURL: string = 'http://localhost:8081/users';
 token!: string;

 public loggedUser!: string;
 public isloggedIn: Boolean = false;
 public roles!: string[];
 public regitredUser : User = new User();

 constructor(private router: Router, private http: HttpClient) { }


 setRegistredUser(user : User){
  this.regitredUser=user;
  }
  registerUser(user :User){
    return this.http.post<User>(this.apiURL+'/register', user,
    {observe:'response'});
    }

    validateEmail(code : string){
      return this.http.get<User>(this.apiURL+'/verifyEmail/'+code);
      }
  getRegistredUser(){
    return this.regitredUser;
    }
    

 login(user: User) {
   return this.http.post<User>(this.apiURL + '/login', user, { observe: 'response' });
 }

 saveToken(jwt: string) {
   if (typeof window !== 'undefined' && window.localStorage) {
     localStorage.setItem('jwt', jwt);
   }
   this.token = jwt;
   this.isloggedIn = true;
   this.decodeJWT();
 }

 getToken(): string {
   return this.token;
 }

 decodeJWT() {
  if (this.token == undefined || this.token === '') {
    return;
  }
  try {
    const decodedToken = this.helper.decodeToken(this.token);
    this.roles = decodedToken.roles || [];
    this.loggedUser = decodedToken.sub;
    this.isloggedIn = true; // Ensure this flag is set after decoding
  } catch (error) {
    console.error('Failed to decode JWT:', error);
    this.logout();
  }
}

 isAdmin(): boolean {
  return this.roles && this.roles.includes('ADMIN');
}

 logout() {
   this.loggedUser = undefined!;
   this.roles = undefined!;
   this.token = undefined!;
   this.isloggedIn = false;
   localStorage.removeItem('jwt');
   this.router.navigate(['/login']);
 }

 setLoggedUserFromLocalStorage(login: string) {
   this.loggedUser = login;
   this.isloggedIn = true;
 }

 loadToken() {
  if (typeof window !== 'undefined' && window.localStorage) {
    this.token = localStorage.getItem('jwt')!;
    this.decodeJWT();
  }
}

 isTokenExpired(): Boolean {
   return this.helper.isTokenExpired(this.token);
 }
}
