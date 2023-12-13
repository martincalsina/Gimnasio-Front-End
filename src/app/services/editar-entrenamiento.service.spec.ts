import { TestBed } from '@angular/core/testing';

import { EditarEntrenamientoService } from './editar-entrenamiento.service';

describe('EditarEntrenamientoService', () => {
  let service: EditarEntrenamientoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditarEntrenamientoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
