import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private apiUrl: string = "https://deliveryapi-ewcv.onrender.com/address";

  constructor(private http: HttpClient) { }

  findAddressByUserId(): Observable<any>{ 
    return this.http.get(`${this.apiUrl}/${window.localStorage.getItem('token')}`)
  }

  searchCep(cep: string): Observable<any>{
    return this.http.get(`${this.apiUrl}/cep/${cep}`)
  }

  createAddress(address: object): Observable<any> {
    return this.http.post(this.apiUrl, address)
  }

  deleteAddress(): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${window.localStorage.getItem('token')}`)
  }
}
