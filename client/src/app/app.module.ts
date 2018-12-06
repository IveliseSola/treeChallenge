import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatDialogModule } from '@angular/material';

import { AppComponent } from './app.component';
import { NodeComponent } from './node/node.component';
import { RootModalComponent } from './root-modal/root-modal.component';
import { FormsModule } from '@angular/forms';
import { TreeComponent } from './tree/tree.component';

@NgModule({
  declarations: [
    AppComponent,
    NodeComponent,
    RootModalComponent,
    TreeComponent
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
  entryComponents: [RootModalComponent]
})
export class AppModule { }
