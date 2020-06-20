import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkpdTambahComponent } from './skpd-tambah.component';

describe('SkpdTambahComponent', () => {
  let component: SkpdTambahComponent;
  let fixture: ComponentFixture<SkpdTambahComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkpdTambahComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkpdTambahComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
