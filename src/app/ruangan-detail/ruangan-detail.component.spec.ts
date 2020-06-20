import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuanganDetailComponent } from './ruangan-detail.component';

describe('RuanganDetailComponent', () => {
  let component: RuanganDetailComponent;
  let fixture: ComponentFixture<RuanganDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuanganDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuanganDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
