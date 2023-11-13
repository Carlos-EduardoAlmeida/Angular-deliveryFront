import { Component, DoCheck } from '@angular/core';
import { AccountService } from '../shared/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent{
  login = {
    email: '', 
    password: ''
  };

  constructor(
    private accountService: AccountService
  ){ }

  async onSubmit(){
      this.accountService.login(this.login)
  }
}
