

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private myToken: string | null = localStorage.getItem('userToken');
  wishlistItems: WritableSignal<string[]> = signal([]); 

  constructor(private httpClient: HttpClient) {}

  getWishlist(): Observable<any> {
    return this.httpClient.get('https://ecommerce.routemisr.com/api/v1/wishlist', {
      headers: { token: this.myToken! }
    });
  }

  addToWishlist(id: string): Observable<any> {
    return this.httpClient.post('https://ecommerce.routemisr.com/api/v1/wishlist', { productId: id }, {
      headers: { token: this.myToken! }
    });
  }

  removeFromWishlist(id: string): Observable<any> {
    return this.httpClient.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
      headers: { token: this.myToken! }
    });
  }

  clearWishlist(): Observable<any> {
    return this.httpClient.delete('https://ecommerce.routemisr.com/api/v1/wishlist', {
      headers: { token: this.myToken! }
    });
  }

  
  updateWishlist(): void {
    this.getWishlist().subscribe({
      next: (res) => {
        this.wishlistItems.set(res.data.map((item: any) => item.id)); 
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}