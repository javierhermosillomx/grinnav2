import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuloIngenieriaComponent } from './modulo-ingenieria.component';

describe('ModuloIngenieriaComponent', () => {
  let component: ModuloIngenieriaComponent;
  let fixture: ComponentFixture<ModuloIngenieriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuloIngenieriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuloIngenieriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
