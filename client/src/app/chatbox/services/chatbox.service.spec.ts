import { TestBed, inject } from '@angular/core/testing';

import { ChatboxService } from './chatbox.service';

describe('ChatboxService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChatboxService]
    });
  });

  it('should be created', inject([ChatboxService], (service: ChatboxService) => {
    expect(service).toBeTruthy();
  }));
});
