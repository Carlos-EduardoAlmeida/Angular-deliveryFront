import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-geral-dialog',
  templateUrl: './geral-dialog.component.html',
  styleUrls: ['./geral-dialog.component.scss']
})
export class GeralDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<GeralDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) {

    }
}
