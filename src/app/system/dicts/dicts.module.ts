import {NgModule} from '@angular/core';

import {DictListComponent} from './dict-list/dict-list.component';
import {SharedModule} from '../../shared/shared.module';
import {DictsRoutingModule} from './dicts-routing.module';

@NgModule({
  imports: [
    SharedModule,
    DictsRoutingModule
  ],
  declarations: [DictListComponent]
})
export class DictsModule {
}
