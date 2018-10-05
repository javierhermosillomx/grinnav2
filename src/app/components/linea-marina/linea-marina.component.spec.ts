import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineaMarinaComponent } from './linea-marina.component';

describe('LineaMarinaComponent', () => {
  let component: LineaMarinaComponent;
  let fixture: ComponentFixture<LineaMarinaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineaMarinaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineaMarinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
