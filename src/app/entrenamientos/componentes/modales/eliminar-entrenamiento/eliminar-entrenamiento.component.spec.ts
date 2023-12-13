import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarEntrenamientoComponent } from './eliminar-entrenamiento.component';

describe('EliminarEntrenamientoComponent', () => {
  let component: EliminarEntrenamientoComponent;
  let fixture: ComponentFixture<EliminarEntrenamientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EliminarEntrenamientoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EliminarEntrenamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
