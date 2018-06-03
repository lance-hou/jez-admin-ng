import {NgModule} from '@angular/core';

import {DictListComponent} from './dict-list/dict-list.component';
import {SharedModule} from '../../shared/shared.module';
import {DictsRoutingModule} from './dicts-routing.module';
import { DictFormComponent } from './dict-form/dict-form.component';

@NgModule({
  imports: [
    SharedModule,
    DictsRoutingModule
  ],
  declarations: [DictListComponent, DictFormComponent]
})
export class DictsModule {
}
