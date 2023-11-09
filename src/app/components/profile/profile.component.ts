import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  optionUser: boolean = false;


  modifeUser(): void{
    this.optionUser ? this.optionUser = false : this.optionUser = true;
 }
}
