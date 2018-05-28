import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatSnackBarModule,
  MatToolbarModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {LayoutModule} from '@angular/cdk/layout';

const MAT_MODULES = [
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatGridListModule,
  MatCardModule,
  MatInputModule,
  MatFormFieldModule,
  MatToolbarModule,
  MatSnackBarModule,
  LayoutModule,
  FlexLayoutModule
];

@NgModule({
  imports: [CommonModule],
  declarations: [],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, ...MAT_MODULES]
})
export class SharedModule {
}
