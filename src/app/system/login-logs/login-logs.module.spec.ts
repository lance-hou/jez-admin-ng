import { LoginLogsModule } from './login-logs.module';

describe('LoginLogsModule', () => {
  let loginLogsModule: LoginLogsModule;

  beforeEach(() => {
    loginLogsModule = new LoginLogsModule();
  });

  it('should create an instance', () => {
    expect(loginLogsModule).toBeTruthy();
  });
});
