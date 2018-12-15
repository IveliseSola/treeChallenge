import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, Injectable, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { BehaviorSubject } from 'rxjs';
import { FileNode } from 'src/app/Models/FileNode';
import { NodeDataService } from 'src/app/Service/node-data.service';

@Component({
  selector: 'app-mat-tree',
  templateUrl: './mat-tree.component.html',
  styleUrls: ['./mat-tree.component.css']
})

export class MatTreeComponent {

//   nestedTreeControl: NestedTreeControl<FileNode>;
//   nestedDataSource: MatTreeNestedDataSource<FileNode>;

//   constructor(private service: NodeDataService) {
//     this.nestedTreeControl = new NestedTreeControl<FileNode>(this._getChildren);
//     this.nestedDataSource = new MatTreeNestedDataSource();
//     // service.dataChange.subscribe(data => this.nestedDataSource.data = data);

//     this.service.getNodes().subscribe(data => {
//       console.log(data);
//       this.nestedDataSource.data = data
//     });
//   }

//   hasNestedChild = (_: number, nodeData: FileNode) => !nodeData.type;

//   private _getChildren = (node: FileNode) => node.children;

}
