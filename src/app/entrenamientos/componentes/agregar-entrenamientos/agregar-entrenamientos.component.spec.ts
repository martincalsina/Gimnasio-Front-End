import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEntrenamientosComponent } from './agregar-entrenamientos.component';

describe('AgregarEntrenamientosComponent', () => {
  let component: AgregarEntrenamientosComponent;
  let fixture: ComponentFixture<AgregarEntrenamientosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgregarEntrenamientosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregarEntrenamientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
