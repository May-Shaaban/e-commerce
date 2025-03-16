
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Iproduct } from '../../../shared/interfaces/iproduct';
import { CartService } from '../../../core/services/cart/cart.service';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { WishlistService } from '../../../core/services/whishList/wish-list.service';

@Component({
  selector: 'app-wishlist',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit {
  private readonly wishlistService = inject(WishlistService);
  private readonly cartService = inject(CartService);
  private readonly toastr = inject(ToastrService);
  wishlistItems: WritableSignal<Iproduct[]> = signal([]);

  ngOnInit(): void {
    this.loadWishlist();
  }

  loadWishlist(): void {
    this.wishlistService.getWishlist().subscribe({
      next: (res) => {
        this.wishlistItems.set(res.data);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  removeFromWishlist(productId: string): void {
    this.wishlistService.removeFromWishlist(productId).subscribe({
      next: () => {
        this.wishlistItems.set(this.wishlistItems().filter(prod => prod.id !== productId));
        this.toastr.error('removing products from favorites', 'Wishlist');
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  
  addToCart(product: Iproduct): void {
    this.cartService.addProductToCart(product.id).subscribe({
      next: (res) => {
        console.log(res)
        
        this.toastr.success(res.message, 'freshCart',
          {
            closeButton: true,
            timeOut: 1500,
            progressAnimation: 'decreasing',
            progressBar: true

          }
         
        )
        this.cartService.cartNumber.set(res.numOfCartItems);
        console.log(this.cartService.cartNumber)
      }, error: (err) => {
        console.log(err)
      }
    })
  }

  clearWishlist(): void {
    this.wishlistService.clearWishlist().subscribe({
      next: () => {
        this.wishlistItems.set([]);
        this.toastr.warning('removing all products from favorites', 'Wishlist');
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}