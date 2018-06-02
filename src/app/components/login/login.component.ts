import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {SecurityService} from '../../modules/system/security/security.service';
import {ConfigService} from '../../modules/system/configs/config.service';
import {MessageService} from '../../modules/shared/message/message.service';
import {map} from 'rxjs/operators';
import {emptyLambda} from '../../modules/shared/util/fn';

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
      map(config => config !== null ? config.value === '1' : false)
    ).subscribe(
      loginVerifyCodeMode => {
        this.loginVerifyCodeMode = loginVerifyCodeMode;
        if (loginVerifyCodeMode) {
          this.form.addControl('verifyCode', new FormControl(null, Validators.required));
        }
      },
      emptyLambda
    );
  }

  login() {
    const verifyCode = this.loginVerifyCodeMode !== false ? this.form.get('verifyCode').value : null;
    this.securityService.login(this.form.get('username').value, this.form.get('password').value, verifyCode).subscribe(
      () => {
        this.messageService.success('登录成功！');
        this.router.navigate([this.next]);
      },
      () => {
        this.messageService.error('用户名或密码错误！');
        if (this.loginVerifyCodeMode) {
          this.updateTimestamp();
        }
      }
    );
  }

  updateTimestamp() {
    this._t = new Date().getTime();
  }

}
