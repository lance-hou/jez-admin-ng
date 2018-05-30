import { DictsModule } from './dicts.module';

describe('DictsModule', () => {
  let dictsModule: DictsModule;

  beforeEach(() => {
    dictsModule = new DictsModule();
  });

  it('should create an instance', () => {
    expect(dictsModule).toBeTruthy();
  });
});
