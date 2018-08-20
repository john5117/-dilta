import { TestBed, inject } from '@angular/core/testing';

import { PlatformConfigService } from './platform-config.service';

describe('PlatformConfigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlatformConfigService]
    });
  });

  it('should be created', inject([PlatformConfigService], (service: PlatformConfigService) => {
    expect(service).toBeTruthy();
  }));
});
