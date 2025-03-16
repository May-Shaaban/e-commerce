import { Component, inject, OnInit } from '@angular/core';

import { RouterLink } from '@angular/router';
import { BrandsService } from '../../core/services/core/services/brands/brands.service';

@Component({
  selector: 'app-brands',
  imports: [RouterLink],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit {
  
  private readonly _BrandsService = inject(BrandsService);
  brands: any[] = [];

  ngOnInit(): void {
    this.getBrandsData();
  }

  getBrandsData(): void {
    this._BrandsService.getAllBrands().subscribe({
      next: (res) => {
        console.log(res.data);
        this.brands = res.data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }






 
}