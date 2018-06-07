import {CommonModule} from '@angular/common';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatPaginatorModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {LayoutModule} from '@angular/cdk/layout';
import {MessageService} from './message/message.service';
import {MessageComponent} from './message/message.component';

const IMPORTS = [
  CommonModule,
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  FlexLayoutModule
];

const EXPORTS = [
  ...IMPORTS,
  FormsModule,
  ReactiveFormsModule,
  LayoutModule,
  MatListModule,
  MatGridListModule,
  MatInputModule,
  MatFormFieldModule,
  MatToolbarModule,
  MatSnackBarModule,
  MatExpansionModule,
  MatMenuModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule
];

@NgModule({
  imports: [...IMPORTS],
  declarations: [MessageComponent],
  entryComponents: [MessageComponent],
  exports: [...EXPORTS]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [MessageService]
    };
  }
}
