import { TestBed, inject } from '@angular/core/testing';

import { ChatioService } from './chatio.service';

describe('ChatioService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChatioService]
    });
  });

  it('should be created', inject([ChatioService], (service: ChatioService) => {
    expect(service).toBeTruthy();
  }));
});
