import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RootModalComponent } from '../root-modal/root-modal.component';

export interface DialogData {
  name: string;
}

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent {

  root: string
  
    constructor(public dialog: MatDialog) { }
  
    createNode = () =>{
      
          }

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
