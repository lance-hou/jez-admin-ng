import {CommonModule} from '@angular/common';
import {ModuleWithProviders, NgModule} from '@angular/core';
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
import {MessageContainerComponent} from './message/message-container/message-container.component';
import {MessageService} from './message/message.service';

const IMPORTS = [
  CommonModule,
  MatCardModule,
  MatIconModule,
  FlexLayoutModule
];

const EXPORTS = [
  ...IMPORTS,
  FormsModule,
  ReactiveFormsModule,
  MatButtonModule,
  MatListModule,
  MatGridListModule,
  MatInputModule,
  MatFormFieldModule,
  MatToolbarModule,
  MatSnackBarModule,
  LayoutModule
];

@NgModule({
  imports: [...IMPORTS],
  declarations: [MessageContainerComponent],
  entryComponents: [MessageContainerComponent],
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
