import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GeralDialogComponent } from '../geral-dialog/geral-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

  constructor(
    public dialog: MatDialog,
    private router: Router
  ) { }

  openModal(text: string): void {
    console.log("dialogo de exclusão aberto")
    const dialogRef = this.dialog.open(GeralDialogComponent, {
      data: { text: text },
    })
    dialogRef.afterClosed().subscribe({
      next: data => {
        if(data){
          window.localStorage.removeItem('token');
          this.router.navigate(['/login']);
        }
         
      }
    })
  }
}
