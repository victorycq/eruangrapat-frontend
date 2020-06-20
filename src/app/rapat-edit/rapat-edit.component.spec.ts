import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RapatEditComponent } from './rapat-edit.component';

describe('RapatEditComponent', () => {
  let component: RapatEditComponent;
  let fixture: ComponentFixture<RapatEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RapatEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RapatEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
