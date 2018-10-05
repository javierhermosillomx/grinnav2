import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstacionCompresionComponent } from './estacion-compresion.component';

describe('EstacionCompresionComponent', () => {
  let component: EstacionCompresionComponent;
  let fixture: ComponentFixture<EstacionCompresionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstacionCompresionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstacionCompresionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
