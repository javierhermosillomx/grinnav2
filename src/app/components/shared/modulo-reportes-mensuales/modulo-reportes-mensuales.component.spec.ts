import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuloReportesMensualesComponent } from './modulo-reportes-mensuales.component';

describe('ModuloReportesMensualesComponent', () => {
  let component: ModuloReportesMensualesComponent;
  let fixture: ComponentFixture<ModuloReportesMensualesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuloReportesMensualesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuloReportesMensualesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
