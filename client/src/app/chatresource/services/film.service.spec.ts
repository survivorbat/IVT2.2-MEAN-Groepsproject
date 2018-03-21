import { TestBed, inject } from '@angular/core/testing';

import { FilmService } from './film.service';

describe('FilmService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FilmService]
    });
  });

  it('should be created', inject([FilmService], (service: FilmService) => {
    expect(service).toBeTruthy();
  }));
});
