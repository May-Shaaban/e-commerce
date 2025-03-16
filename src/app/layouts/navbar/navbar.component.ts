import { Component, computed, inject, input, InputSignal, OnDestroy, OnInit, Signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { CartService } from '../../core/services/cart/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [ RouterLink , RouterLinkActive  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit  {
  private readonly cartService = inject(CartService)
  private readonly authService =inject(AuthService)

  isLogin:InputSignal<boolean> =input<boolean>(true)
  navCountCart:Signal<number>= computed( ()=>this.cartService.cartNumber())
  ngOnInit(): void {
this.cartService.getLoggedUserCart().subscribe({
  next:(res)=>{
    this.cartService.cartNumber.set(res.numOfCartItems)
  },
  
})


 
  }



  logout(){
    this.authService.logOut()
  }


}
