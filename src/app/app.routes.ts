import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: '', component: AuthLayoutComponent, children: [
      { path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent), title: 'login' },
      { path: 'register', loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent), title: 'register' },
      { path: 'forgot', loadComponent: () => import('./components/forgotpassword/forgotpassword.component').then(m => m.ForgotpasswordComponent), title: 'Forget Password' },
     
 
        ]},

  { path: '',  canActivate:[authGuard] ,component: BlankLayoutComponent, children: [
      { path: 'home', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent), title: 'home' },
      { path: 'cart', loadComponent: () => import('./pages/cart/cart.component').then(m => m.CartComponent), title: 'cart' },
      { path: 'products', loadComponent: () => import('./pages/products/products.component').then(m => m.ProductsComponent), title: 'products' },
      { path: 'brands', loadComponent: () => import('./pages/brands/brands.component').then(m => m.BrandsComponent), title: 'brands' },
      { path: 'categories', loadComponent: () => import('./pages/categories/categories.component').then(m => m.CategoriesComponent), title: 'categories' },
      { path: 'checkout/:id', loadComponent: () => import('./pages/checkout/checkout.component').then(m => m.CheckoutComponent), title: 'checkout' },
      { path: 'allorders', loadComponent: () => import('./pages/allorders/allorders.component').then(m => m.AllordersComponent), title: 'checkout' },
      { path: 'details/:id', loadComponent: () => import('./pages/details/details.component').then(m => m.DetailsComponent), title: 'details' },
      { path: 'brands/:id', loadComponent: () => import('./pages/brand-details/brand-details/brand-details.component').then(m => m.BrandDetailsComponent) , title: 'Brand Details' },
      { path: 'wishlist', loadComponent: () => import('./pages/wishlist/wishlist/wishlist.component').then(m => m.WishlistComponent) , title: 'wishlist' },
  ]},
  { path: '**', component: NotfoundComponent, title: 'error' }


  



];