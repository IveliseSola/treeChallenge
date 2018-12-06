import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from 'src/app/tree/tree.component';

@Component({
  selector: 'app-root-modal',
  templateUrl: './root-modal.component.html',
  styleUrls: ['./root-modal.component.css']
})
export class RootModalComponent {

  constructor(
    public dialogRef: MatDialogRef<RootModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
