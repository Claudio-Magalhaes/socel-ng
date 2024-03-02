import { TestBed } from '@angular/core/testing';

import { StartSessionGuard } from './start-session.guard';

describe('StartSessionGuard', () => {
  let guard: StartSessionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(StartSessionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
