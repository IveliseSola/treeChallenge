// MODULES
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
// import { RouterModule, Routes } from '@angular/router';

// COMPONENTS
import { AppComponent } from './app.component';
import { NodeComponent } from './node/node.component';
import { RootModalComponent } from './root-modal/root-modal.component';
import { TreeComponent } from './tree/tree.component';
import { NodeModalComponent } from './node-modal/node-modal.component';

// MATERIAL MODULES
import { MatDialogModule } from '@angular/material';

// import { DragDropModule } from '@angular/cdk/drag-drop';
// import { ScrollingModule } from '@angular/cdk/scrolling';
// import { CdkTableModule } from '@angular/cdk/table';
// import { CdkTreeModule } from '@angular/cdk/tree';
// import {
//   MatAutocompleteModule,
//   MatBadgeModule,
//   MatBottomSheetModule,
//   MatButtonModule,
//   MatButtonToggleModule,
//   MatCardModule,
//   MatCheckboxModule,
//   MatChipsModule,
//   MatDatepickerModule,
//   MatDialogModule,
//   MatDividerModule,
//   MatExpansionModule,
//   MatGridListModule,
//   MatIconModule,
//   MatInputModule,
//   MatListModule,
//   MatMenuModule,
//   MatNativeDateModule,
//   MatPaginatorModule,
//   MatProgressBarModule,
//   MatProgressSpinnerModule,
//   MatRadioModule,
//   MatRippleModule,
//   MatSelectModule,
//   MatSidenavModule,
//   MatSliderModule,
//   MatSlideToggleModule,
//   MatSnackBarModule,
//   MatSortModule,
//   MatStepperModule,
//   MatTableModule,
//   MatTabsModule,
//   MatToolbarModule,
//   MatTooltipModule,
//   MatTreeModule,
//   MatFormFieldModule
// } from '@angular/material';
// import { MatTreeComponent } from './Components/mat-tree/mat-tree.component';
// import { MatTreeNestedDataSource } from '@angular/material/tree';
// import { NestedTreeControl } from '@angular/cdk/tree';

@NgModule({
  declarations: [
    AppComponent,
    NodeComponent,
    RootModalComponent,
    TreeComponent,
    NodeModalComponent,
    // MatTreeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    // MatButtonModule,
    // MatCheckboxModule,
    HttpClientModule,
    // MatFormFieldModule,
    // MatDialogModule,
    FormsModule,
    // MatTreeNestedDataSource,
    // NestedTreeControl,
    // CdkTableModule,
    // CdkTreeModule,
    // DragDropModule,
    // MatAutocompleteModule,
    // MatBadgeModule,
    // MatBottomSheetModule,
    // MatButtonModule,
    // MatButtonToggleModule,
    // MatCardModule,
    // MatCheckboxModule,
    // MatChipsModule,
    // MatStepperModule,
    // MatDatepickerModule,
    MatDialogModule,
    // MatDividerModule,
    // MatExpansionModule,
    // MatGridListModule,
    // MatIconModule,
    // MatInputModule,
    // MatListModule,
    // MatMenuModule,
    // MatNativeDateModule,
    // MatPaginatorModule,
    // MatProgressBarModule,
    // MatProgressSpinnerModule,
    // MatRadioModule,
    // MatRippleModule,
    // MatSelectModule,
    // MatSidenavModule,
    // MatSliderModule,
    // MatSlideToggleModule,
    // MatSnackBarModule,
    // MatSortModule,
    // MatTableModule,
    // MatTabsModule,
    // MatToolbarModule,
    // MatTooltipModule,
    // MatTreeModule,
    // ScrollingModule
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
