import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'sys-dict-form',
  templateUrl: './dict-form.component.html',
  styleUrls: ['./dict-form.component.css']
})
export class DictFormComponent implements OnInit {

  constructor(public location: Location) {
  }

  ngOnInit() {
  }

}
