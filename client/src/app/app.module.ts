import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatDialogModule } from '@angular/material';

import { AppComponent } from './app.component';
import { NodeComponent } from './node/node.component';
import { RootModalComponent } from './root-modal/root-modal.component';
import { FormsModule } from '@angular/forms';
import { TreeComponent } from './tree/tree.component';
import { NodeModalComponent } from './node-modal/node-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    NodeComponent,
    RootModalComponent,
    TreeComponent,
    NodeModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatDialogModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    RootModalComponent,
    NodeModalComponent
  ]
})
export class AppModule { }
