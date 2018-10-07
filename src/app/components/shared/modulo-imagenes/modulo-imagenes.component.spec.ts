import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuloImagenesComponent } from './modulo-imagenes.component';

describe('ModuloImagenesComponent', () => {
  let component: ModuloImagenesComponent;
  let fixture: ComponentFixture<ModuloImagenesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuloImagenesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuloImagenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
