import { Component } from '@angular/core';
import { AccountService } from '../shared/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent {
  register = {
    name: '',
    email: '', 
    password: ''
  };

  constructor(
    private accountService: AccountService,
    private router: Router
  ){ }

  async onSubmit(){
    await this.accountService.createAccount(this.register);
  }
}
