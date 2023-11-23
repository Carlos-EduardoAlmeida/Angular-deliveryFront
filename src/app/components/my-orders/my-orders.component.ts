import { Component } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent {
  optionToOrders: boolean = true;

  shoppingCart: any = []
  dataOrderPlaced: any = []

  constructor(
    private ordersService: OrdersService
  ){
    if(localStorage.getItem('shoppingCart') != null){
      const teste = localStorage.getItem('shoppingCart') ?? '[]'
      this.shoppingCart = JSON.parse(teste)
      console.log(this.shoppingCart)
    }
  }

  purchase(): void {
    this.shoppingCart.forEach( (item: any) => {
      this.ordersService.registerOrder({
        orders: item.orders,
        quantity: item.quantity,
        price: item.price,
        image: item.image,
        id: localStorage.getItem('token')
      }).subscribe({
        next: data => {
          console.log(data);
        }
      })
    })
  }

  remove(order: string): void {
    const indexOrder = this.shoppingCart.indexOf(order)
    this.shoppingCart[indexOrder].quantity > 1 ? 
      this.shoppingCart[indexOrder].quantity-- : 
      this.shoppingCart.splice(indexOrder, 1)

    window.localStorage.setItem('shoppingCart', JSON.stringify(this.shoppingCart));
    console.log(localStorage.getItem('shoppingCart'));
  }

  removeFromApi(id: string) {
    this.ordersService.removeFromApi(id).subscribe({
      next: () => {
        this.searchOrders();
        console.log('deletado');
      }
    });
  }

  searchOrders(): void {
    this.ordersService.searchOrders().subscribe({
      next: data => {
        this.dataOrderPlaced = data
        console.log(this.dataOrderPlaced)
      }
    })
  }

  modifeTypeToOrder(): void {
    this.optionToOrders = true;
  }

  modifeTypeOrder(): void {
    this.searchOrders();
    this.optionToOrders = false;
  }
}
