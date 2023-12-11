import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarRutinaComponent } from './agregar-rutina.component';

describe('AgregarRutinaComponent', () => {
  let component: AgregarRutinaComponent;
  let fixture: ComponentFixture<AgregarRutinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgregarRutinaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregarRutinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
