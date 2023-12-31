import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrdersService } from 'src/app/services/orders.service';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { Router } from '@angular/router';

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
    private router: Router,
    private dialog: MatDialog,
    private ordersService: OrdersService
  ){
    if(localStorage.getItem('shoppingCart') != null){
      const teste = localStorage.getItem('shoppingCart') ?? '[]'
      this.shoppingCart = JSON.parse(teste)
      console.log(this.shoppingCart)
    }
  }

  purchase(): void {
    if (window.localStorage.getItem('haveAddress') === 'true') {
      const requestData = {
        id: localStorage.getItem('token'),
        listRequestPostOrder: this.shoppingCart.map((item: any) => ({
          orders: item.orders,
          quantity: item.quantity,
          image: item.image,
          price: item.price,
        })),
      };
  
      console.log(requestData)
      this.ordersService.registerOrder(requestData).subscribe({
        next: (data) => {
          if (data != null) {
            this.shoppingCart = [];
            localStorage.removeItem('shoppingCart');
            console.log('Dialogo de aviso aberto');
            const dialogRef = this.dialog.open(MessageDialogComponent, {
              data: { text: 'Pedido(s) feito(s), você pode vê-lo(s) em "Pedidos feitos"' },
            });
            dialogRef.afterClosed().subscribe();
          }
        },
      });
    } else {
      console.log('Dialogo de aviso aberto');
      const dialogRef = this.dialog.open(MessageDialogComponent, {
        data: { text: 'Para fazer um pedido você precisa ter um Endereço cadastrado' },
      });
      dialogRef.afterClosed().subscribe({
        next: () => this.router.navigate(['/profile']),
      });
    }
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
        console.log("dialogo de aviso aberto")
        const dialogRef = this.dialog.open(MessageDialogComponent, {
          data: { text: 'Pedido sinalizado como entregue, agradecemos a preferência' },
        })
        dialogRef.afterClosed().subscribe()
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
