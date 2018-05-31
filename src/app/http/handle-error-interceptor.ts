import {Inject, Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {MessageService} from '../modules/shared/message/message.service';
import {Router} from '@angular/router';
import {SecurityService} from '../modules/system/security/security.service';
import {catchError, tap} from 'rxjs/operators';
import {SECURITY_OPTIONS, SecurityOptions} from '../modules/system/security/security-options';

@Injectable()
export class HandleErrorInterceptor implements HttpInterceptor {

  constructor(
    private messageService: MessageService,
    @Inject(SECURITY_OPTIONS) private securityOptions: SecurityOptions,
    private securityService: SecurityService,
    private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(
        () => {
        },
        (error: HttpErrorResponse) => {
          if (!error.url.endsWith('/login')) {
            if (error.status === 401) {
              if (this.securityService.authenticated) {
                this.securityService.logout(false);
                this.messageService.warning('登录超时！');
              }
              this.router.navigate([this.securityOptions.loginUrl, {next: this.router.url}]);
            } else if (error.status === 403) {
              this.messageService.error('无数据权限！');
              this.securityService.authorize().pipe(
                catchError(() => of()),
                tap(() => window.location.reload(true))
              );
            } else if (error.status === 484) {
              this.messageService.error('您的输入入有误！');
              try {
                const fieldErrors = JSON.parse(error.error);
                this.messageService.error(fieldErrors.map(fieldError => `${fieldError.field}: ${fieldError.message}`));
              } catch (e) {
              }
            } else if (error.status === 520) {
              this.messageService.error(error.error);
            } else if (error.status >= 500) {
              this.messageService.error('系统错误！');
            } else {
              this.messageService.error('网络异常！');
            }
          }
        }
      )
    );
  }

}
