import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  imports: [CarouselModule ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      
    },
    nav: false
  }



  private readonly _ActivatedRoute = inject(ActivatedRoute)
  private readonly _CategoriesService = inject(CategoriesService)
  private readonly cartService = inject(CartService)

  productID!: string |null;
  productDetails: Iproduct = {} as Iproduct

  constructor(private _ProductsService: ProductsService , private toastr: ToastrService) { }
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (param) => {
        this.productID = param.get('id')!;
      }

    })




    this._ProductsService.getSpecificProducts(this.productID).subscribe({
      next: (res) => {
        this.productDetails =res.data;
        console.log(res.productDetails)

      },
      error: (err) => {
        console.log(err)
      }
    })




  }



  // addToCart(id: string): void {
  //   this.cartService.addProductToCart(id).subscribe({
  //     next: (res) => {
  //       console.log(res)
  //       // this.cartService.cartNumber.next(res.numOfCartItems)
  //       this.toastr.success(res.message, 'freshCart',
  //         {
  //           closeButton: true,
  //           timeOut: 1500,
  //           progressAnimation: 'decreasing',
  //           progressBar: true

  //         }
         
  //       )
  //     }, error: (err) => {
  //       console.log(err)
  //     }
  //   })
  // }



  
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





