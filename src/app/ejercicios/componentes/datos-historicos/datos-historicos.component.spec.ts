import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosHistoricosComponent } from './datos-historicos.component';

describe('DatosHistoricosComponent', () => {
  let component: DatosHistoricosComponent;
  let fixture: ComponentFixture<DatosHistoricosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatosHistoricosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DatosHistoricosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
