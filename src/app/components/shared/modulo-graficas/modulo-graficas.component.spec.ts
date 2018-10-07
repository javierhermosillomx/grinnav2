import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuloGraficasComponent } from './modulo-graficas.component';

describe('ModuloGraficasComponent', () => {
  let component: ModuloGraficasComponent;
  let fixture: ComponentFixture<ModuloGraficasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuloGraficasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuloGraficasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
