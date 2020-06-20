import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RapatComponent } from './rapat.component';

describe('RapatComponent', () => {
  let component: RapatComponent;
  let fixture: ComponentFixture<RapatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RapatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RapatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
