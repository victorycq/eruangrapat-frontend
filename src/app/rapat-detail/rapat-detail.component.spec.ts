import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RapatDetailComponent } from './rapat-detail.component';

describe('RapatDetailComponent', () => {
  let component: RapatDetailComponent;
  let fixture: ComponentFixture<RapatDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RapatDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RapatDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
