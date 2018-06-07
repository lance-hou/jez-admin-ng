import {Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren} from '@angular/core';
import {Menu} from './menu';
import {MatExpansionPanel} from '@angular/material';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css'],
  styles: [`
    :host ::ng-deep .mat-list {
      padding-top: 0;
    }

    :host ::ng-deep .mat-list .mat-list-item-content {
      padding: 0 !important;
    }

    :host ::ng-deep .mat-list .mat-list-item-content > button {
      width: 100%;
      text-align: left;
      line-height: 48px;
      font-size: 16px;
    }

    :host ::ng-deep .mat-list .mat-list-item-content > .mat-button.active {
      border-right: 4px solid #3f51b5;
      color: #3f51b5;
    }

    :host ::ng-deep .mat-expansion-panel {
      margin: 0;
      box-shadow: none !important;
    }

    :host ::ng-deep .mat-expansion-panel .mat-expansion-panel-body {
      padding: 0;
    }
  `]
})
export class NavMenuComponent implements OnInit {

  @ViewChildren(MatExpansionPanel) expansionPanels: QueryList<MatExpansionPanel>;

  @ViewChildren(NavMenuComponent) navMenus: QueryList<NavMenuComponent>;

  @Input() menus: Menu[];

  @Output() menuClick = new EventEmitter<Menu>();

  constructor() {
  }

  ngOnInit() {
  }

  open(menu: Menu): boolean {
    const menus = this.menus.filter(m => !m.leaf);
    for (let i = 0; i < menus.length; i++) {
      if (menus[i] === menu) {
        this.expansionPanels.toArray()[i].open();
        return true;
      }
      if (this.navMenus.toArray()[i].open(menu)) {
        return true;
      }
    }
    return false;
  }

}
