import {InjectionToken} from '@angular/core';

export interface SecurityOptions {
  loginUrl: string;
  notFoundUrl: string;
  forbiddenUrl: string;
  navigateErrorUrl: string;
}

export const SECURITY_OPTIONS = new InjectionToken<SecurityOptions>('securityOptions');
