import { Component, DoCheck, OnInit } from '@angular/core';
import { AccountService } from '../shared/account.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup
  login = {
    email: '', 
    password: ''
  };

  constructor(
    private accountService: AccountService
  ){ }
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    })
  }

  get email():any {
    return this.loginForm.get('email');
  }

  get password():any {
    return this.loginForm.get('password');
  }

  async onSubmit(){
    if(!this.loginForm.invalid)
      this.accountService.login(this.loginForm.value)
  }
}
