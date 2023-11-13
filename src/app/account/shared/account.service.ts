import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl: string = "https://deliveryapi-ewcv.onrender.com";

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
        response = JSON.parse(JSON.stringify(data)); // erro no retorno da API, precisava mudar para JSON
        console.log(response);
        /*window.localStorage.setItem('token', response.id); //VAI USAR AINDA
        console.log(`Login efetuado: ${response.id}`);*/
      },
      error(err) {
          console.error(err)
      },
    })
  }
}
