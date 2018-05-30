import { OfficesModule } from './offices.module';

describe('OfficesModule', () => {
  let officesModule: OfficesModule;

  beforeEach(() => {
    officesModule = new OfficesModule();
  });

  it('should create an instance', () => {
    expect(officesModule).toBeTruthy();
  });
});
