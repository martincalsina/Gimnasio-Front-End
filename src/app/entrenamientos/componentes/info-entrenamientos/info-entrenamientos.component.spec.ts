import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoEntrenamientosComponent } from './info-entrenamientos.component';

describe('InfoEntrenamientosComponent', () => {
  let component: InfoEntrenamientosComponent;
  let fixture: ComponentFixture<InfoEntrenamientosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InfoEntrenamientosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoEntrenamientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
