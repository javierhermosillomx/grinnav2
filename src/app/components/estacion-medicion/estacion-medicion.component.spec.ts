import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstacionMedicionComponent } from './estacion-medicion.component';

describe('EstacionMedicionComponent', () => {
  let component: EstacionMedicionComponent;
  let fixture: ComponentFixture<EstacionMedicionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstacionMedicionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstacionMedicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
