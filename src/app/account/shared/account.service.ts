import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent } from 'src/app/components/message-dialog/message-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl: string = "https://deliveryapi-ewcv.onrender.com";

  constructor(private http: HttpClient, private dialog: MatDialog) { }

  login(user: any) {
    var response;
    return this.http.post(`${this.apiUrl}/login`, user).subscribe({
      next: (data) => {
        response = JSON.parse(JSON.stringify(data));
        window.localStorage.setItem('token', response.id);
        response.address != null ? window.localStorage.setItem('haveAddress', 'true') : window.localStorage.setItem('haveAddress', 'false');
        console.log(`Login efetuado: ${response.id}`);
      },
      error: (err) => {
        console.error(err);
        if(err.status == 404){
          console.log("dialogo de aviso aberto")
          const dialogRef = this.dialog.open(MessageDialogComponent, {
            data: { text: 'Email ou usuário incorreto, verifique novamente' },
          })
          dialogRef.afterClosed().subscribe()
        }
      },
    })
  }

  createAccount(newUser: any){
    var response;
    return this.http.post(this.apiUrl, newUser).subscribe({
      next: (data)=> {
        response = JSON.parse(JSON.stringify(data));
        response.address != null ? window.localStorage.setItem('haveAddress', 'true') : window.localStorage.setItem('haveAddress', 'false');
        window.localStorage.setItem('token', response.id);
        console.log(`Cadastro efetuado: ${response.id}`);
        window.localStorage.setItem('haveAddress', 'false');
      },
      error: (err) => {
          console.error(err);
          if(err.status == 400){
            console.log("dialogo de aviso aberto")
            const dialogRef = this.dialog.open(MessageDialogComponent, {
              data: { text: 'Esse email já está cadastrado' },
            })
            dialogRef.afterClosed().subscribe()
          }
      },
    })
  }
}
