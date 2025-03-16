import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../../core/services/order/payment.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder)
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly paymentService = inject(PaymentService)
  checkOutForm!: FormGroup
  cartId: string = '';

  ngOnInit(): void {
    this.initForm();
    this.getCartId();

  }


  initForm(): void {
    this.checkOutForm = this.formBuilder.group({
      details: [null, [Validators.required]],
      phone: [null, [Validators.required], Validators.pattern(/^01[0123][0-9]$/)],
      city: [null, [Validators.required], Validators.minLength(2), Validators.maxLength(50), Validators.pattern(/^[A-Za-z\s]+$/)]
    })
  }

  getCartId(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (param) => {
        console.log(param)
        this.cartId = param.get('id')!
      }, error: (err) => {
        console.log(err)
      }
    })

  }

  submitForm(): void {
    console.log(this.checkOutForm.value)
    this.cartId
    this.paymentService.checkOutPayMent(this.cartId, this.checkOutForm.value).subscribe({
      next: (res) => {
        console.log(res)
        if (res.status === 'success') {
          open(res.session.url, '_self')
        }
      },
      error: (err) => { console.log(err) }
    })
  }

}
