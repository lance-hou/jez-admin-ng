import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Menu} from './menu';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {

  @Input() root: Menu;

  @Output() menuClick = new EventEmitter<Menu>();

  constructor() {
  }

  ngOnInit() {
  }

}
