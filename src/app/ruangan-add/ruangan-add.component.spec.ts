import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuanganAddComponent } from './ruangan-add.component';

describe('RuanganAddComponent', () => {
  let component: RuanganAddComponent;
  let fixture: ComponentFixture<RuanganAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuanganAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuanganAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
