import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DictListComponent} from './dict-list/dict-list.component';
import {DictFormComponent} from './dict-form/dict-form.component';

const routes: Routes = [
  {
    path: '',
    component: DictListComponent
  },
  {
    path: 'create',
    component: DictFormComponent,
    data: {
      guard: {
        type: 'permission',
        value: 'system:dicts:create'
      }
    }
  },
  {
    path: ':id',
    component: DictFormComponent,
    data: {
      guard: {
        type: 'permission',
        value: 'system:dicts:update'
      }
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DictsRoutingModule {
}
