import { TestBed, inject } from '@angular/core/testing';

import { OvService } from './ov.service';

describe('OvService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OvService]
    });
  });

  it('should be created', inject([OvService], (service: OvService) => {
    expect(service).toBeTruthy();
  }));
});
