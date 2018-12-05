import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RootModalComponent } from '../root-modal/root-modal.component';

export interface DialogData {
  name: string;
}

@Component({
  selector: 'app-btn-add-tree',
  templateUrl: './btn-add-tree.component.html',
  styleUrls: ['./btn-add-tree.component.css']
})

export class BtnAddTreeComponent {

  root: string

  constructor(public dialog: MatDialog) { }

  openRootDialog(): void {
    const dialogRef = this.dialog.open(RootModalComponent, {
      width: '400px',
      data: { name: this.root }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`The dialog was closed ${result}`);
      this.root = result;
    });
  }
}
