import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl: string = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  findUser(): Observable<any>{
    return this.http.get(`${this.apiUrl}/${window.localStorage.getItem('token')}`)
  }

  deleteUser(): Observable<any>{
    return this.http.delete(`${this.apiUrl}/${window.localStorage.getItem('token')}`)
  }

  updateUser(newUser: any): Observable<any>{
    return this.http.patch(this.apiUrl, newUser)
  }
}
