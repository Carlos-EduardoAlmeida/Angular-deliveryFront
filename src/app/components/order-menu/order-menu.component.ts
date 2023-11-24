import { Component } from '@angular/core';
import { ordersData } from '../../data/ordersData'
import { MatDialog } from '@angular/material/dialog';
import { OrderDialogComponent } from '../order-dialog/order-dialog.component';
@Component({
  selector: 'app-order-menu',
  templateUrl: './order-menu.component.html',
  styleUrls: ['./order-menu.component.scss']
})
export class OrderMenuComponent {
  ordersMenu: any = ordersData

  constructor(
    public dialog: MatDialog
    ) { }

  openModal(id: number): void {
    console.log("dialogo aberto")
    const dialogRef = this.dialog.open(OrderDialogComponent, {
      data: { id: id },
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log('closed')
    })
  }
  
}
