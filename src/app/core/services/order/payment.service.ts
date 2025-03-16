import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  myToken:any = localStorage.getItem('userToken')

  constructor(private _HttpClient:HttpClient) { }

  checkOutPayMent(id:string , data:object):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:4200` ,
    {
      'shippingAddress':data

    
    },
    {
      headers:{
        token:this.myToken
      }
    }

    )
  }
}
