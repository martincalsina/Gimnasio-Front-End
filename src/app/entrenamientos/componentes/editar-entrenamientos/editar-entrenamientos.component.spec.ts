import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarEntrenamientosComponent } from './editar-entrenamientos.component';

describe('EditarEntrenamientosComponent', () => {
  let component: EditarEntrenamientosComponent;
  let fixture: ComponentFixture<EditarEntrenamientosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditarEntrenamientosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarEntrenamientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
