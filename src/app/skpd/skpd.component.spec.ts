import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkpdComponent } from './skpd.component';

describe('SkpdComponent', () => {
  let component: SkpdComponent;
  let fixture: ComponentFixture<SkpdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkpdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkpdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
