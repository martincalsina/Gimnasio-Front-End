import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrarRutinaComponent } from './borrar-rutina.component';

describe('BorrarRutinaComponent', () => {
  let component: BorrarRutinaComponent;
  let fixture: ComponentFixture<BorrarRutinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BorrarRutinaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BorrarRutinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
