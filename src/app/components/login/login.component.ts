import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {SecurityService} from '../../modules/system/security/security.service';
import {ConfigService} from '../../modules/system/configs/config.service';
import {MessageService} from '../../modules/shared/message/message.service';
import {SECURITY_OPTIONS, SecurityOptions} from '../../modules/system/security/security-options';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  next: string;

  form: FormGroup;
  showPassword = false;
  loginVerifyCodeMode: any;

  _t = new Date().getTime();

  constructor(
    private formBuilder: FormBuilder,
    private configService: ConfigService,
    @Inject(SECURITY_OPTIONS) private securityOptions: SecurityOptions,
    private securityService: SecurityService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.next = this.route.snapshot.paramMap.get('next') || '/';
    this.form = this.formBuilder.group({
      username: new FormControl('superadmin', Validators.required),
      password: new FormControl('admin', Validators.required)
    });
    this.configService.getByCode('login_verify_code_mode').then(config => {
      this.loginVerifyCodeMode = config !== null ? config.value === '1' : false;
      if (this.loginVerifyCodeMode !== false) {
        this.form.addControl('verifyCode', new FormControl(null, Validators.required));
      }
    }).catch(() => {
    });
  }

  login() {
    const verifyCode = this.loginVerifyCodeMode !== false ? this.form.get('verifyCode').value : null;
    this.securityService.login(this.form.get('username').value, this.form.get('password').value, verifyCode).then(() => {
      this.messageService.success('登录成功！');
      console.log(this.router, this.next);
      this.router.navigate([this.next])
        .catch(error => this.router.navigate([this.securityOptions.navigateErrorUrl, {url: this.next, error}]));
    }).catch(() => {
      this.messageService.error('用户名或密码错误！');
      if (this.loginVerifyCodeMode) {
        this.updateTimestamp();
      }
    });
  }

  updateTimestamp() {
    this._t = new Date().getTime();
  }

}
