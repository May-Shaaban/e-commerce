import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../search/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/whishList/wish-list.service';

@Component({
  selector: 'app-products',
  imports: [RouterLink, SearchPipe, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  private readonly wishlistService = inject(WishlistService);
  private readonly toastr = inject(ToastrService);
  searchValue: string = "";
 
  products:WritableSignal<Iproduct[]> = signal([])
  wishlistItems: WritableSignal<string[]> = signal([]);


  constructor(private ttoastr: ToastrService) {}

ngOnInit(): void {
  this.getProductsData();
  this.wishlistService.updateWishlist();
}

getProductsData(): void {
  this.productsService.getAllProducts().subscribe({
    next: (res) => {
      this.products.set(res.data);
    },
    error: (err) => {
      console.log(err);
    }
  });
}

toggleWishlist(id: string): void {
  if (this.isInWishlist(id)) {
    this.wishlistService.removeFromWishlist(id).subscribe({
      next: () => {
        this.wishlistService.updateWishlist();
        this.toastr.error('it has been successefully added', 'Wishlist');
      },
      error: (err) => {
        console.log(err);
      }
    });
  } else {
    this.wishlistService.addToWishlist(id).subscribe({
      next: () => {
        this.wishlistService.updateWishlist();
        this.toastr.success('it has been successefully added', 'Wishlist');
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}

isInWishlist(id: string): boolean {
  return this.wishlistService.wishlistItems().includes(id);
}




addToCart(id: string): void {
  this.cartService.addProductToCart(id).subscribe({
    next: (res) => {
      console.log(res)
      // this.cartService.cartNumber.next(res.numOfCartItems)
      
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


}

