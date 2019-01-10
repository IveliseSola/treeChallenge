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
  caretEffect: Boolean = false;
  activeVal: Boolean = false;

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
      const newRoot = {
        name: result,
        children: [],
        id: ''
      };
      this.service.addNode(newRoot).subscribe(
        rootResp => {
          this.root  = {
            name: rootResp.name,
            children: [],
            id: rootResp._id
          };
        }, err => {
          console.log(err);
        }
      );
    });
  }

  openCreateNodeDialog(event) {
    const dialogNode = this.dialog.open(NodeModalComponent, {
      width: '600px',
      data: { name: '' }
    });
    dialogNode.afterClosed().subscribe(result => {
      const nodeFactory = this.modifyTree(result);
      this.service.updateTree(this.root.id, nodeFactory).subscribe(
        response => {
          this.root.children = response.children;
        },
        error => {
          console.log('PUT call in error', error);
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
        // this.root.children.splice(position, 1);
        this.root.children[position].leaves.length = 0;
        this.root.children[position] = {
          _id: child._id,
          name: newNodeFactory.name,
          minValue: newNodeFactory.minValue,
          maxValue: newNodeFactory.maxValue,
          leaves: newNodeFactory.leaves
        };
        // this.root.children.push(newNodeFactory);
        this.service.updateChild(this.root.id, child._id, newNodeFactory).subscribe(
          responde => {
            console.log('PUT call successful value returned in body', responde);
          },
          error => {
            console.log('PUT call in error', error);
          },
          () => {
            console.log('The PUT observable is now completed.');
          }
        );
      });
    });
  }

  deleteNode(event) {
    const position = event.target.dataset.index;
    const identifier = this.root.children[position]._id;
    this.root.children.splice(position, 1);
    this.service.deleteNode(identifier).subscribe( data => {
      console.log(data);
    });
  }

  deleteTree(event) {
    this.service.deleteNode(this.root.id);
    this.root = new Root();
    console.log(this.root);
  }

  modifyTree(node) {
    const max = +node.max;
    const min = +node.min;
    const nodeFactory = new NodeFactory(node.name, min, max);
    if (node.amount < 16) {
      for (let i = 0; i < node.amount; i++) {
        const value = Math.floor(Math.random() * (max - min) + min);
        const nodeLeaf = new NodeLeaf(i, value.toString());
        nodeFactory.leaves.push(nodeLeaf);
      }
    } else {
      throw new Error('Maximum amount allow is 15');
    }
    console.log(nodeFactory);
    return nodeFactory;
  }

  caretAnimation(event) {
    // this.caretEffect = this.caretEffect ? false : true;
    if (this.root.children.length) {
      // then apply caret-down
      this.caretEffect = true;
      this.activeVal = true;
    }
  }
}
