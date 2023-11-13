import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements DoCheck{

  constructor(private router: Router){ }
  ngDoCheck(): void {
    if(localStorage.getItem('token') != null){
      this.router.navigate([''])
    }
  }

}
