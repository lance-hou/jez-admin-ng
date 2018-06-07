import {Component, OnInit} from '@angular/core';
import {DictService} from '../dict.service';
import {Dict} from '../dict';
import {PageStore} from '../../../shared/data/page-store';

@Component({
  selector: 'sys-dict-list',
  templateUrl: './dict-list.component.html',
  styleUrls: ['./dict-list.component.css']
})
export class DictListComponent implements OnInit {

  parameters = {type: null, value: null, label: null};
  store: PageStore<Dict>;
  columns = ['type', 'value', 'label', 'remarks', 'sort', 'actions'];
  headers = ['类型', '数据值', '标签', '备注', '排序值', '操作'];

  constructor(dictService: DictService) {
    this.store = dictService.createPageStore();
  }

  ngOnInit() {
    this.query();
  }

  query() {
    this.store.query({...this.parameters}).subscribe();
  }

}
