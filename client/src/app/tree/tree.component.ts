import { Component, Injectable, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, } from '@angular/material';
import { RootModalComponent } from '../root-modal/root-modal.component';
import { NodeModalComponent } from '../node-modal/node-modal.component';
import { NodeDataService } from 'src/app/Service/node-data.service';
import { Root } from 'src/app/Models/Root';
import { NodeFactory } from 'src/app/Models/NodeFactory';
import { NodeLeaf } from 'src/app/Models/NodeLeaf';
import io from 'socket.io-client';
import * as socketIo from 'socket.io-client';

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

  constructor(public dialog: MatDialog, private service: NodeDataService) { }

  ngOnInit() {
    this.service.initSocket();
    this.service.treeEmit();
    this.service.getTree()
      .subscribe((data) => {
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
      const root = {
        name: result,
        children: [],
        id: ''
      };
      this.service.modifyTree('addRoot', root);
      this.service.treeEmit();
      this.service.getTree()
        .subscribe((data) => {
          this.root = {
            name: data[0].name,
            id: data[0]._id,
            children: data[0].children
          };
        });
    });
  }

  openCreateNodeDialog(event) {
    const dialogNode = this.dialog.open(NodeModalComponent, {
      width: '600px',
      data: { name: '' }
    });
    dialogNode.afterClosed().subscribe(result => {
      const nodeFactory = this.generateNodeFactory(result);
      const auxObj = {
        id: this.root.id,
        nodeFactoryData: nodeFactory
      };
      this.service.modifyTree('addNode', auxObj);
      this.service.treeEmit();
      this.service.getTree()
        .subscribe((root) => {
          this.root = {
            name: root[0].name,
            id: root[0]._id,
            children: root[0].children
          };
        });
    });
  }

  openEditNodeDialog(event) {
    const position = event.target.dataset.index;
    const child = {
      _id: this.root.children[position]._id,
      name: this.root.children[position].name,
      amount: this.root.children[position].leaves.length,
      minValue: this.root.children[position].minValue,
      maxValue: this.root.children[position].maxValue
    };
    const dialogEditNode = this.dialog.open(NodeModalComponent, {
      width: '600px',
      data: {
        name: child.name,
        amount: child.amount,
        min: child.minValue,
        max: child.maxValue,
      }
    });
    dialogEditNode.afterClosed().subscribe(result => {
      const nodeFactory = this.generateNodeFactory(result);
      const auxObj = {
        id: child._id,
        nodeFactoryData: nodeFactory
      };
      this.service.modifyTree('updateNode', auxObj);
      this.service.treeEmit();
      this.service.getTree()
        .subscribe((root) => {
          this.root = {
            name: root[0].name,
            id: root[0]._id,
            children: root[0].children
          };
        });
    });
  }

  deleteNode(event) {
    const position = event.target.dataset.index;
    const identifier = this.root.children[position]._id;
    this.service.modifyTree('deleteNode', identifier);
    this.service.treeEmit();
    this.service.getTree()
      .subscribe((root) => {
        this.root = {
          name: root[0].name,
          id: root[0]._id,
          children: root[0].children
        };
      });
  }

  deleteTree(event) {
    this.service.modifyTree('deleteTree', this.root.id);
    this.root = new Root();
  }

  generateNodeFactory(node) {
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
    return nodeFactory;
  }
}
