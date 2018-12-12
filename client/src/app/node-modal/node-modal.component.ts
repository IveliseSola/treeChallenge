import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from '../tree/tree.component';
import { NodeFactory } from 'src/app/Models/NodeFactory';
import { Input } from '@angular/core';

@Component({
  selector: 'app-node-modal',
  templateUrl: './node-modal.component.html',
  styleUrls: ['./node-modal.component.css']
})
export class NodeModalComponent {
// creating a node
  node = new NodeFactory();
// editing a node
  // @Input() nodefactory = new NodeFactory();

  constructor(
    public dialogRef: MatDialogRef<NodeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
