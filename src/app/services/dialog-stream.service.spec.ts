import { TestBed } from '@angular/core/testing';

import { DialogStreamService } from './dialog-stream.service';

describe('DialogStreamService', () => {
  let service: DialogStreamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogStreamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
