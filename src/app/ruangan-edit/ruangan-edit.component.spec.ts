import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuanganEditComponent } from './ruangan-edit.component';

describe('RuanganEditComponent', () => {
  let component: RuanganEditComponent;
  let fixture: ComponentFixture<RuanganEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuanganEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuanganEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
