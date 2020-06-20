import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermohonanDetailComponent } from './permohonan-detail.component';

describe('PermohonanDetailComponent', () => {
  let component: PermohonanDetailComponent;
  let fixture: ComponentFixture<PermohonanDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermohonanDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermohonanDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
