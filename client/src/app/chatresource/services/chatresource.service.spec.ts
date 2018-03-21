import { TestBed, inject } from '@angular/core/testing';

import { ChatresourceService } from './chatresource.service';

describe('ChatresourceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChatresourceService]
    });
  });

  it('should be created', inject([ChatresourceService], (service: ChatresourceService) => {
    expect(service).toBeTruthy();
  }));
});
