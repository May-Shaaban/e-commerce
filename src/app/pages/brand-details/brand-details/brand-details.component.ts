import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BrandsService } from '../../../core/services/core/services/brands/brands.service';


@Component({
  selector: 'app-brand-details',
  templateUrl: './brand-details.component.html',
  styleUrl: './brand-details.component.scss'
})
export class BrandDetailsComponent implements OnInit {
  private readonly _BrandsService = inject(BrandsService);
  private readonly route = inject(ActivatedRoute);
  brandDetails: any = {};

  ngOnInit(): void {
    const brandID = this.route.snapshot.paramMap.get('id');
    if (brandID) {
      this._BrandsService.getSpecificBrand(brandID).subscribe({
        next: (res) => {
          this.brandDetails = res.data;
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }
}