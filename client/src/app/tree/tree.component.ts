import { Component, Injectable, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, } from '@angular/material';
import { RootModalComponent } from '../root-modal/root-modal.component';
import { NodeModalComponent } from '../node-modal/node-modal.component';
import { NodeDataService } from 'src/app/Service/node-data.service';

import { Root } from 'src/app/Models/Root';
import { NodeFactory } from 'src/app/Models/NodeFactory';
import { NodeLeaf } from 'src/app/Models/NodeLeaf';


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

  root = new Root();
  nodeFactory = new NodeFactory();

  constructor(public dialog: MatDialog, private service: NodeDataService) { }

  ngOnInit() {
    this.service.getRoot().subscribe(data => {
      this.root = {
        name: data[0].name,
        id: data[0]._id,
        children: data[0].children
      };
    });
  }
  openCreateRootDialog(): void {
    const dialogRef = this.dialog.open(RootModalComponent, {
      width: '400px',
      data: { name: '' }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.root = {
        name: result,
        children: [],
        id: ''
      };
      this.service.addNode(this.root).subscribe(
        filenode => {
        }, err => {
          console.log(err);
        }
      );
    });
  }
  openCreateNodeDialog(event) {
    const dialogNode = this.dialog.open(NodeModalComponent, {
      width: '600px',
      data: {name: ''}
    });
    dialogNode.afterClosed().subscribe(result => {
      const nodeFactory = this.modifyTree(result);
      this.root.children.push(nodeFactory);
      this.service.updateTree(this.root.id, nodeFactory).subscribe(
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
      const child = data[0].child;
      const dialogEditNode = this.dialog.open(NodeModalComponent, {
        width: '600px',
        data: {
          name: child.name,
          amount: child.leaves.length,
          min: child.minValue,
          max: child.maxValue,
        }
      });
      dialogEditNode.afterClosed().subscribe(result => {
        const newNodeFactory = this.modifyTree(result);
        this.service.updateChild(this.root.id, child._id, newNodeFactory).subscribe(
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

  modifyTree(node) {
    const max = +node.max;
    const min = +node.min;
    const nodeFactory = new NodeFactory(node.name, min, max);
    if (node.amount < 16) {
      for (let i = 0; i < node.amount; i++) {
        const value = Math.floor(Math.random() * (max - min) + min);
        const nodeLeaf = new NodeLeaf(i, value.toString());
        nodeFactory.children.push(nodeLeaf);
      }
    } else {
      throw new Error('Maximum amount allow is 15');
    }
    console.log(nodeFactory);
    return nodeFactory;
  }

}
