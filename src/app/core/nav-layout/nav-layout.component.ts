import {Component, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable, Subscription} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {SecurityService} from '../../system/security/security.service';
import {User} from '../../system/users/user';
import {Menu} from '../nav-menu/menu';
import {Resource} from '../../system/resources/resource';
import {Router} from '@angular/router';
import {SECURITY_OPTIONS, SecurityOptions} from '../../system/security/security-options';
import {MessageService} from '../../shared/message/message.service';
import {ReuseTabStore} from '../route/reuse-tab-store.service';
import {NavMenuComponent} from '../nav-menu/nav-menu.component';
import {MatSidenav} from '@angular/material';
import {emptyLambda} from '../../shared/util/fn';

@Component({
  selector: 'app-nav-layout',
  templateUrl: './nav-layout.component.html',
  styleUrls: ['./nav-layout.component.css']
})
export class NavLayoutComponent implements OnInit, OnDestroy {

  @ViewChild(MatSidenav) sideNav: MatSidenav;
  @ViewChild(NavMenuComponent) navMenu: NavMenuComponent;

  private subscription: Subscription;
  private isHandSet: boolean;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      tap(result => this.isHandSet = result.matches),
      map(result => result.matches)
    );

  initialized = false;
  user: User;
  menus: Menu;
  activeMenu: Menu;
  activeIdx = 0;

  constructor(
    public reuseTabStore: ReuseTabStore,
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
      this.activeIdx = this.reuseTabStore.add(menu);
      this.router.navigate([menu.path]);
    }
    if (this.isHandSet) {
      this.sideNav.close().catch(emptyLambda);
    }
  }

  activeTab(idx: number): void {
    if (idx !== this.activeIdx) {
      const menu = this.reuseTabStore.menus[idx];
      if (menu.parent !== undefined) {
        this.navMenu.open(menu.parent);
      }
      this.active(this.reuseTabStore.menus[idx]);
    }
  }

  closeTab(idx: number): void {
    this.reuseTabStore.remove(idx);
    this.activeTab(idx === 0 ? idx + 1 : idx - 1);
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
    defaultMenu = defaultMenu || firstMenu;
    this.menus = root ? root.children : null;
    const isRoot = routerUrl === '/', isRouterValid = !!routerMenu;
    if (!isRoot && isRouterValid) {
      this.activeIdx = this.reuseTabStore.add(routerMenu);
    }
    const activeMenu = isRoot ? defaultMenu : isRouterValid ? routerMenu : defaultMenu;
    if (activeMenu !== null) {
      this.expandMenu(activeMenu);
      this.active(activeMenu, isRoot || !isRouterValid);
    }
    this.initialized = true;
  }

  private expandMenu(menu: Menu) {
    let parent = menu.parent;
    while (parent !== undefined) {
      parent.expanded = true;
      parent = parent.parent;
    }
  }
}
