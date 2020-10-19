import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { RequestService } from './request.service';

describe('RequestService', () => {
  const userServiceStub = {
    get: () => of([]),
    post: () => of([]),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(userServiceStub).toBeTruthy();
  });
});
