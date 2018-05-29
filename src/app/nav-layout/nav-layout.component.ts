import {Component, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {SecurityService} from '../system/security/security.service';
import {Subject} from '../system/security/subject';
import {User} from '../system/users/user';
import {Menu} from './menu';
import {Resource} from '../system/resources/resource';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav-layout',
  templateUrl: './nav-layout.component.html',
  styleUrls: ['./nav-layout.component.css']
})
export class NavLayoutComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  initialized = false;

  user: User;
  menus: Menu[];

  constructor(private breakpointObserver: BreakpointObserver,
              private securityService: SecurityService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.securityService.authorize().then((subject: Subject) => {
      this.user = subject.user;
      this.generateMenus(subject.resources);
      this.initialized = true;
    }).catch(() => {
    });
  }

  active(menu: Menu) {
    this.router.navigate([menu.path]);
  }

  private generateMenus(resources: Resource[]) {
    const menus = [], idRefs = {}, convert2Menu = (resource: Resource): Menu => {
      return {
        id: resource.id,
        parentId: resource.parentId,
        icon: resource.icon,
        label: resource.name,
        path: resource.pathExp,
        level: resource.level - 1,
        leaf: true,
        items: undefined
      };
    };
    let parent = null, menu = null, items = null;
    resources.forEach(resource => {
      if (resource.level === 1 || resource.type !== 0) {
        return;
      }
      menu = convert2Menu(resource);
      idRefs[resource.id] = menu;
      if (menu.level === 1) {
        menus.push(menu);
        return;
      }
      parent = idRefs[menu.parentId];
      if (parent === undefined) {
        return;
      }
      items = parent.items;
      if (items === undefined) {
        items = parent.items = [];
        parent.leaf = false;
      }
      items.push(menu);
    });
    this.menus = menus;
  }
}
