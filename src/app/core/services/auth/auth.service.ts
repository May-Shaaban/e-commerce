import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';

// import { environment } from '../../environments/environment';KNKNKn@gmail.com  MNNNNNNNNNNNN  

@Injectable({
  providedIn: 'root'
})
export class AuthService {
   userData:any =null ;
  constructor( private httpClient:HttpClient) { }




  sendRegisterForm(data:object):Observable<any>{
  return  this.httpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signup'  , data)
  }

  sendLoginForm(data:object):Observable<any>{
  return  this.httpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signin'  , data)
  }

  saveUserData():void{
    if(    localStorage.getItem('userToken')  !==null){
     this.userData= jwtDecode(localStorage.getItem('userToken') !)
     console.log('userData' , this.userData)
    }
  
  }
private readonly _router= inject(Router)
// private readonly _AuthService= Inject(AuthService)

logOut():void{
  localStorage.removeItem('userToken');
  this.userData = null;
  this._router.navigate(['/login']) ;

}



setEmailverify(data:object):Observable<any>{
  return this.httpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords` , data)
}


setCodeverify(data:object):Observable<any>{
  return this.httpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode` , data)
}

setResetPassword(data:object):Observable<any>{
  return this.httpClient.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword` , data)
}
 
}
