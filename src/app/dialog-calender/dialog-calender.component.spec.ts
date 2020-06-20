import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCalenderComponent } from './dialog-calender.component';

describe('DialogCalenderComponent', () => {
  let component: DialogCalenderComponent;
  let fixture: ComponentFixture<DialogCalenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCalenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
