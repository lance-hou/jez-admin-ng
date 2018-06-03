export class OperationLog {
  id: number;
  userId: number;
  operateTime: string;
  title: string;
  serverPath: string;
  servletPath: string;
  method: string;
  responseStatus: number;
  responseMillis: number;
  clientIp: string;
  clientDevice: string;
  clientOs: string;
  clientBrowser: string;
  clientBrowserVersion: string;
  headers: string;
  parameters: string;
  payload: string;
}
