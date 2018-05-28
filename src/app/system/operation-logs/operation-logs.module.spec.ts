import { OperationLogsModule } from './operation-logs.module';

describe('OperationLogsModule', () => {
  let operationLogsModule: OperationLogsModule;

  beforeEach(() => {
    operationLogsModule = new OperationLogsModule();
  });

  it('should create an instance', () => {
    expect(operationLogsModule).toBeTruthy();
  });
});
