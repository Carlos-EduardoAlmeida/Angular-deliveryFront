import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl: string = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  login(user: any) {
    var response;
    return this.http.post(`${this.apiUrl}/login`, user).subscribe({
      next(data){
        response = JSON.parse(JSON.stringify(data));
        window.localStorage.setItem('token', response.id);
        console.log(`Login efetuado: ${response.id}`);
      },
      error(err) {
          console.error(err)
      },
    })
  }

  createAccount(newUser: any){
    var response;
    return this.http.post(this.apiUrl, newUser).subscribe({
      next(data){
        response = JSON.parse(JSON.stringify(data));
        console.log(response);
        window.localStorage.setItem('token', response.id);
        console.log(`Cadastro efetuado: ${response.id}`);
      },
      error(err) {
          console.error(err);
      },
    })
  }
}
