import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogVerifikasiTokenComponent } from './dialog-verifikasi-token.component';

describe('DialogVerifikasiTokenComponent', () => {
  let component: DialogVerifikasiTokenComponent;
  let fixture: ComponentFixture<DialogVerifikasiTokenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogVerifikasiTokenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogVerifikasiTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
