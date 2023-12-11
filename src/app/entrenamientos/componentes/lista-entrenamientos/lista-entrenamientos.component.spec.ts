import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaEntrenamientosComponent } from './lista-entrenamientos.component';

describe('ListaEntrenamientosComponent', () => {
  let component: ListaEntrenamientosComponent;
  let fixture: ComponentFixture<ListaEntrenamientosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaEntrenamientosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaEntrenamientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
