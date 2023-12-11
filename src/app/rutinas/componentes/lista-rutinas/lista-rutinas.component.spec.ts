import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaRutinasComponent } from './lista-rutinas.component';

describe('ListaRutinasComponent', () => {
  let component: ListaRutinasComponent;
  let fixture: ComponentFixture<ListaRutinasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaRutinasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaRutinasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
