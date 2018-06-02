import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {SecurityService} from '../../modules/system/security/security.service';
import {User} from '../../modules/system/users/user';
import {Menu} from '../nav-menu/menu';
import {Resource} from '../../modules/system/resources/resource';
import {Router} from '@angular/router';
import {SECURITY_OPTIONS, SecurityOptions} from '../../services/security-options';
import {MessageService} from '../../modules/shared/message/message.service';

@Component({
  selector: 'app-nav-layout',
  templateUrl: './nav-layout.component.html',
  styleUrls: ['./nav-layout.component.css']
})
export class NavLayoutComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  user: User;
  menus: Menu;
  activeMenu: Menu;

  constructor(
    private breakpointObserver: BreakpointObserver,
    @Inject(SECURITY_OPTIONS) private securityOptions: SecurityOptions,
    private securityService: SecurityService,
    private messageService: MessageService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.subscription = this.securityService.subscribeAuthorization(() => this.initialize());
    if (this.securityService.authorized) {
      this.initialize();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  logout() {
    this.securityService.logout();
    this.messageService.info('注销成功！');
    this.router.navigate([this.securityOptions.loginUrl]);
  }

  active(menu: Menu, doNavigation = true) {
    if (this.activeMenu !== undefined) {
      this.activeMenu.selected = false;
    }
    this.activeMenu = menu;
    this.activeMenu.selected = true;
    if (doNavigation) {
      this.router.navigate([menu.path]);
    }
  }

  private initialize() {
    this.user = this.securityService.subject.user;
    const idRefs = {}, convert2Menu = (resource: Resource, baseLevel = 0): Menu => {
      return {
        id: resource.id,
        parent: idRefs[resource.parentId],
        icon: resource.icon,
        text: resource.name,
        path: resource.pathExp,
        level: resource.level - baseLevel,
        selected: false,
        expanded: false,
        leaf: true,
        children: null
      };
    };
    const routerUrl = this.router.url, defaultUrl = '/system/dicts';
    let root = null, parent = null, menu = null, children = null, routerMenu = null, defaultMenu = null, firstMenu = null;
    this.securityService.subject.resources.forEach(resource => {
      menu = convert2Menu(resource, 1);
      idRefs[resource.id] = menu;
      if (menu.level === 0) {
        root = menu;
        return;
      }
      if (resource.type !== 0) {
        return;
      }
      parent = menu.parent;
      if (parent === undefined) {
        return;
      }
      children = parent.children;
      if (children === null) {
        children = parent.children = [];
        parent.leaf = false;
      }
      children.push(menu);
      if (firstMenu === null && !menu.path === false) {
        firstMenu = menu;
      }
      if (menu.path === routerUrl) {
        routerMenu = menu;
      }
      if (menu.path === defaultUrl) {
        defaultMenu = menu;
      }
    });
    this.menus = root ? root.children : null;
    const noRouter = routerUrl === '/', activeMenu = noRouter ? defaultMenu || firstMenu : routerMenu;
    if (activeMenu !== null) {
      parent = activeMenu.parent;
      while (parent !== undefined) {
        parent.expanded = true;
        parent = parent.parent;
      }
      this.active(activeMenu, noRouter);
    }
  }
}
