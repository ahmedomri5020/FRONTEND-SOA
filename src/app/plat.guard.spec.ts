import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { platGuard } from './plat.guard';

describe('platGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => platGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
