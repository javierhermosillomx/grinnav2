import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineaTerrestreComponent } from './linea-terrestre.component';

describe('LineaTerrestreComponent', () => {
  let component: LineaTerrestreComponent;
  let fixture: ComponentFixture<LineaTerrestreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineaTerrestreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineaTerrestreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
