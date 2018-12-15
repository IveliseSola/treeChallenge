import { Component, Injectable, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, } from '@angular/material';
import { RootModalComponent } from '../root-modal/root-modal.component';
import { NodeModalComponent } from '../node-modal/node-modal.component';
import { Node } from 'src/app/Models/Node';
import { Tree } from '../Models/Tree';
import { NodeDataService } from 'src/app/Service/node-data.service';


export interface DialogData {
  name: string;
  amount: number;
  min: number;
  max: number;
}

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit {

  tree: any = {};
  auxVar = false;

  constructor(public dialog: MatDialog, private service: NodeDataService) { }

  ngOnInit() {
  }

  openCreateRootDialog(): void {
    const dialogRef = this.dialog.open(RootModalComponent, {
      width: '400px',
      data: { name: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.tree = new Tree(result);
    });
  }
  openCreateNodeDialog(event) {
    const dialogNode = this.dialog.open(NodeModalComponent, {
      width: '600px'
    });

    dialogNode.afterClosed().subscribe(result => {
      console.log(result.amount);
      this.tree.add(result.name, result.amount, result.min, result.max);
      this.auxVar = true;
      this.service.postNode(this.tree.root);
    });
  }
  openEditNodeDialog(event) {
    const i = event.target.dataset.index;
    const dialogEditNode = this.dialog.open(NodeModalComponent, {
      width: '600px',
      data: {
        name: this.tree.root.children[i].name,
        amount: this.tree.root.children[i].children.length,
        min: this.tree.root.children[i].min,
        max: this.tree.root.children[i].max
      }
    });
    dialogEditNode.afterClosed().subscribe(result => {
    });
  }
}
