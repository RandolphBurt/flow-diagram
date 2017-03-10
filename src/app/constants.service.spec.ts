/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ConstantsService } from './constants-service.service';

describe('ConstantsServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConstantsService]
    });
  });

  it('should ...', inject([ConstantsService], (service: ConstantsService) => {
    expect(service).toBeTruthy();
  }));
});
