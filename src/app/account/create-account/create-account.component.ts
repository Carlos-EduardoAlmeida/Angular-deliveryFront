import { Component, OnInit } from '@angular/core';
import { AccountService } from '../shared/account.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {
  createAccountForm!: FormGroup
  register = {
    name: '',
    email: '', 
    password: ''
  };

  constructor(
    private accountService: AccountService,
    private router: Router
  ){ }
  ngOnInit(): void {
    this.createAccountForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    })
  }


  get name():any {
    return this.createAccountForm.get('name');
  }

  get email():any {
    return this.createAccountForm.get('email');
  }

  get password():any {
    return this.createAccountForm.get('password');
  }

  async onSubmit(){
    if(!this.createAccountForm.invalid)
      await this.accountService.createAccount(this.createAccountForm.value);
  }
}
