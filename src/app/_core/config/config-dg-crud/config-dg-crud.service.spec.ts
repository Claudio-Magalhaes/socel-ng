import { TestBed } from '@angular/core/testing';

import { ConfigDgCrudService } from './config-dg-crud.service';

describe('ConfigDgCrudService', () => {
  let service: ConfigDgCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigDgCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
