import { Component, Injectable, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, } from '@angular/material';
import { RootModalComponent } from '../root-modal/root-modal.component';
import { NodeModalComponent } from '../node-modal/node-modal.component';
// import { Node } from 'src/app/Models/Node';
// import { Tree } from '../Models/Tree';
import { NodeDataService } from 'src/app/Service/node-data.service';
import { FileNode } from 'src/app/Models/FileNode';


export interface DialogData {
  name: string;
  amount: number;
  min: number;
  max: number;
 // i: number;
}

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit {

  filenode = new FileNode();
  child = new FileNode();

  constructor(public dialog: MatDialog, private service: NodeDataService) { }

  ngOnInit() {
    this.service.getRoot().subscribe(data => this.filenode = data[0]);
  }

  openCreateRootDialog(): void {
    const dialogRef = this.dialog.open(RootModalComponent, {
      width: '400px',
      data: { name: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.filenode = {
        filename: result,
        type: 'root',
        children: [],
        minValue: 0,
        maxValue: 0
      };
      this.service.postNode(this.filenode).subscribe(
        filenode => {
        }, err => {
          console.log(err);
        }
      );
    });
  }
  openCreateNodeDialog(event) {
    const dialogNode = this.dialog.open(NodeModalComponent, {
      width: '600px'
    });
    dialogNode.afterClosed().subscribe(result => {
      // this.auxVar = true;
      const max = +result.max;
      const min = +result.min;
      const nodeFactory = new FileNode(result.name, 'factory', min, max);
      if (result.amount < 16) {
        for (let i = 0; i < result.amount; i++) {
          const value = Math.floor(Math.random() * (max - min) + min);
          const child = new FileNode(value.toString(), 'leaf');
          nodeFactory.children.push(child);
        }
      } else {
        throw new Error('Maximum amount of children nodes allow is 15');
      }
      this.filenode.children.push(nodeFactory);
      this.service.updateTree(this.filenode).subscribe(
        val => {
          console.log('PUT call successful value returned in body', val);
        },
        response => {
          console.log('PUT call in error', response);
        },
        () => {
          console.log('The PUT observable is now completed.');
        }
      );
    });
  }
  openEditNodeDialog(event) {
    const position = event.target.dataset.index;
    this.service.getChild(position).subscribe(data => {
      this.child = data[0].child;
      const dialogEditNode = this.dialog.open(NodeModalComponent, {
        width: '600px',
        data: {
          name: this.child.filename,
          amount: this.child.children.length,
          min: this.child.minValue,
          max: this.child.maxValue,
          i: position
        }
      });
      dialogEditNode.afterClosed().subscribe(result => {
        this.service.updateChild(data).subscribe(
          val => {
            console.log('PUT call successful value returned in body', val);
          },
          response => {
            console.log('PUT call in error', response);
          },
          () => {
            console.log('The PUT observable is now completed.');
          }
        );
      });
    });
  }
}
