import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {SecurityService} from '../../modules/system/security/security.service';
import {ConfigService} from '../../modules/system/configs/config.service';
import {MessageService} from '../../modules/shared/message/message.service';
import {catchError, map, tap} from 'rxjs/operators';
import {of} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  next: string;

  form: FormGroup;
  showPassword = false;
  loginVerifyCodeMode: boolean;

  _t = new Date().getTime();

  constructor(
    private fb: FormBuilder,
    private configService: ConfigService,
    private securityService: SecurityService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.next = this.route.snapshot.paramMap.get('next') || '/';
    this.form = this.fb.group({
      username: new FormControl('superadmin', Validators.required),
      password: new FormControl('admin', Validators.required)
    });
    this.configService.getByCode('login_verify_code_mode').pipe(
      map(config => config !== null ? config.value === '1' : false),
      tap(loginVerifyCodeMode => this.loginVerifyCodeMode = loginVerifyCodeMode),
      tap(() => {
        console.log(this.loginVerifyCodeMode);
        if (this.loginVerifyCodeMode) {
          this.form.addControl('verifyCode', new FormControl(null, Validators.required));
        }
      }),
      catchError(error => of(error))
    ).subscribe();
  }

  login() {
    const verifyCode = this.loginVerifyCodeMode !== false ? this.form.get('verifyCode').value : null;
    this.securityService.login(this.form.get('username').value, this.form.get('password').value, verifyCode).pipe(
      tap(() => this.messageService.success('登录成功！')),
      tap(() => this.router.navigate([this.next])),
      catchError(error => of(error)),
      tap(() => this.messageService.error('用户名或密码错误！')),
      tap(() => {
        if (this.loginVerifyCodeMode) {
          this.updateTimestamp();
        }
      })
    ).subscribe();
  }

  updateTimestamp() {
    this._t = new Date().getTime();
  }

}
