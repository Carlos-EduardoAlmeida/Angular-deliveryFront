import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ordersData } from 'src/app/data/ordersData';

@Component({
  selector: 'app-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.scss']
})
export class OrderDialogComponent {
  order: any = ordersData
  orders: any[] = []

  constructor(
    public dialogRef: MatDialogRef<OrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ){ 
      if(localStorage.getItem('shoppingCart') != null){
        const teste = localStorage.getItem('shoppingCart') ?? '[]'
        this.orders = JSON.parse(teste)
      }
    }

  add(){
    var alreadExist = false;
    this.orders.forEach(item => {
      if(this.order[this.data.id-1].order == item.orders){
        item.quantity++;
        alreadExist = true;
      }
    })
    if(!alreadExist){
      this.orders.push({
        orders: this.order[this.data.id-1].order,
        quantity: 1,
        price: this.order[this.data.id-1].price,
        image: this.order[this.data.id-1].image
      });
    }
    window.localStorage.setItem('shoppingCart', JSON.stringify(this.orders));
    console.log(localStorage.getItem('shoppingCart'));
  }
}
