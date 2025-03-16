import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ICategory } from '../../shared/interfaces/icategory';
import { LowerCasePipe, UpperCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../search/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { WishlistService } from '../../core/services/whishList/wish-list.service';
@Component({
  selector: 'app-home',
  imports: [CarouselModule, UpperCasePipe, RouterLink, SearchPipe, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly categoriesServicece = inject(CategoriesService);
  private readonly cartService = inject(CartService);
  private readonly ngxSpinnerService = inject(NgxSpinnerService);
  private readonly wishlistService = inject(WishlistService)
  searchValue: string = ""
  products:WritableSignal<Iproduct[]> = signal([]);
  categories:WritableSignal<ICategory[]> =signal([]);
  wishlistItems: WritableSignal<string[]> = signal([]); 
  constructor(private toastr: ToastrService) { }




  customMainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    autoplay: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: false
  }




  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    navSpeed: 700,
    navText: ['<i class="fa-solid fa-backward"></i>', '<i class="fa-solid fa-forward"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: true
  }


  ngOnInit(): void {
    this.getProductaData();
    this.getCategoryData();
    this.loadWishlist(); 


  }
  getProductaData(): void {

    this.productsService.getAllProducts().subscribe({
      next: (res) => {
        console.log(res.data)

        this.products.set(res.data)
      },
      error: (err) => {
        console.log(err);
      }
    });
  }




  getCategoryData(): void {
    this.ngxSpinnerService.show(`loading-3`)
    this.categoriesServicece.getAllCategories().subscribe({

      next: (res) => {
        console.log(res.data)
        this.categories.set(res.data)
        this.ngxSpinnerService.hide(`loading-3`)

      },
      error: (err) => {
        console.log(err);
  this.ngxSpinnerService.show(`loading-3`)

      }
    });
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

// whitlist
  loadWishlist(): void {
    this.wishlistService.getWishlist().subscribe({
      next: (res) => {
        this.wishlistItems.set(res.data.map((item: any) => item.id));
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



}
