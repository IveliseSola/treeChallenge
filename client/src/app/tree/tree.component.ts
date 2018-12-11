import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RootModalComponent } from '../root-modal/root-modal.component';
import { Node } from 'src/app/Models/Node';
import { Tree } from '../Models/Tree';
import { NodeModalComponent } from '../node-modal/node-modal.component';

export interface DialogData {
  name: string;
}

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit {

  // tree: any = {};
  tree = new Tree();

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openRootDialog(): void {
    const dialogRef = this.dialog.open(RootModalComponent, {
      width: '400px',
      data: { name: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`The dialog was closed ${result}`);
      // this.node = {
      //   name: result
      // };
      this.tree = new Tree(result);
    });
  }

  openNodeDialog(event) {
    const dialogNode = this.dialog.open(NodeModalComponent, {
      width: '600px'
    });

    dialogNode.afterClosed().subscribe(result => {
      this.tree.add(result.name, result.amount, result.min, result.max);
    });
  }
}
