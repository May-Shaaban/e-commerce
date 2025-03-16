import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { console } from 'node:inspector';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  imports: [ReactiveFormsModule],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.scss'
})
export class ForgotpasswordComponent {
  
  private readonly _AuthService = inject(AuthService)
  private readonly _Router = inject(Router)
  step:number = 1;




verifyEmail:FormGroup = new FormGroup({
  email: new FormControl(null  , [Validators.required , Validators.email])
}) 
verifyCode:FormGroup = new FormGroup({
  resetCode: new FormControl(null  , [Validators.required , Validators.pattern(/^ [0-9](6)$/)])
}) 
resetPassword:FormGroup = new FormGroup({
  email: new FormControl(null  , [Validators.required , Validators.email]),
  newPassword:new FormControl(null , [Validators.required , Validators.pattern(/^[A-Z]\w{7,}$/) ])
}) 






vervifyEmailSubmit():void{
 let emailValue = this.verifyEmail.get('email')?.value
 this.resetPassword.get('email')?.patchValue(emailValue)

 this._AuthService.setEmailverify(this.verifyEmail.value).subscribe({
  next:(res)=>{
    console.log(res)
    if(res.statusMsg==='success'){
      this.step=2;
    }
  },
  error:(err)=>{
    console.log(err)
  },
 })
}

vervifyCodeSubmit():void{

 this._AuthService.setCodeverify(this.verifyCode.value).subscribe({
  next:(res)=>{
    console.log(res)
    if(res.status==='Success'){
      this.step = 3;
      console.log(this.step)
    }
  },
  error:(err)=>{
    console.log(err)
  },
 })
}
resetPaasworSubmit():void{
 this._AuthService.setResetPassword(this.resetPassword.value).subscribe({
  next:(res)=>{
    console.log(res)
    localStorage.setItem('userToken',  res.token)
    this._AuthService.saveUserData()
    this._Router.navigate(['/home'])
  },
  error:(err)=>{
    console.log(err)
  },
 })
}
}

