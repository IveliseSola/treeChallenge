// MODULES
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {Component} from '@angular/core';

// COMPONENTS
import { AppComponent } from './app.component';
import { RootModalComponent } from './root-modal/root-modal.component';
import { TreeComponent } from './tree/tree.component';
import { NodeModalComponent } from './node-modal/node-modal.component';

// MATERIAL MODULES
import { MatDialogModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    RootModalComponent,
    TreeComponent,
    NodeModalComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule
  ],
  exports: [
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    RootModalComponent,
    NodeModalComponent
  ]
})
export class AppModule { }
