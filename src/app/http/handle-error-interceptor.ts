import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MessageService} from '../modules/shared/message/message.service';
import {Router} from '@angular/router';
import {SecurityService} from '../modules/system/security/security.service';

@Injectable()
export class HandleErrorInterceptor implements HttpInterceptor {

  constructor(
    private messageService: MessageService,
    private securityService: SecurityService,
    private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req);
  }

}
