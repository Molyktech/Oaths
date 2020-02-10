import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NameViewComponent } from './name-view.component';

describe('NameViewComponent', () => {
  let component: NameViewComponent;
  let fixture: ComponentFixture<NameViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NameViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NameViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
