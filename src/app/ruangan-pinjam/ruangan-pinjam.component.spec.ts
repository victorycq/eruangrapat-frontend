import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuanganPinjamComponent } from './ruangan-pinjam.component';

describe('RuanganPinjamComponent', () => {
  let component: RuanganPinjamComponent;
  let fixture: ComponentFixture<RuanganPinjamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuanganPinjamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuanganPinjamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
