import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatDialogModule } from '@angular/material';

import { AppComponent } from './app.component';
import { NodeComponent } from './node/node.component';
import { RootModalComponent } from './root-modal/root-modal.component';
import { BtnAddTreeComponent } from './btn-add-tree/btn-add-tree.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NodeComponent,
    RootModalComponent,
    BtnAddTreeComponent
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
