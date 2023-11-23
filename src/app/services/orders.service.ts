import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private apiUrl: string = "http://localhost:8080/orders";

  constructor(
    private http: HttpClient
  ) { }

  registerOrder(order: object): Observable<any>{
    return this.http.post(this.apiUrl, order);
  }

  searchOrders(): Observable<any> {
    return this.http.get(`${this.apiUrl}/${window.localStorage.getItem('token')}`);
  }

  removeFromApi(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  /*searchOrders(order: object): void {
    this.http.post(this.apiUrl, {
      orders: order.orders,
      quantity: order.quantity,
      id: window.localStorage.getItem('token')
    })
  }*/
}
