import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuloAvancesObraComponent } from './modulo-avances-obra.component';

describe('ModuloAvancesObraComponent', () => {
  let component: ModuloAvancesObraComponent;
  let fixture: ComponentFixture<ModuloAvancesObraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuloAvancesObraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuloAvancesObraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
