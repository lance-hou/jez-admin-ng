import {Component, OnInit} from '@angular/core';
import {DictService} from '../dict.service';
import {Dict} from '../dict';
import {tap} from 'rxjs/operators';
import {PageStore} from '../../../shared/data/page-store';

@Component({
  selector: 'app-dict-list',
  templateUrl: './dict-list.component.html',
  styleUrls: ['./dict-list.component.css']
})
export class DictListComponent implements OnInit {

  parameters = {type: null, value: null, label: null};
  store: PageStore<Dict>;

  constructor(dictService: DictService) {
    this.store = dictService.createPageStore();
  }

  ngOnInit() {
    this.query();
  }

  query() {
    this.store.query({...this.parameters}).pipe(tap(data => console.log(data))).subscribe();
  }

}
