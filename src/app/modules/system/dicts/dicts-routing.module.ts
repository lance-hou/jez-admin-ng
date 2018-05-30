import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DictListComponent} from './dict-list/dict-list.component';

const routes: Routes = [
  {
    path: '',
    component: DictListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DictsRoutingModule {
}
