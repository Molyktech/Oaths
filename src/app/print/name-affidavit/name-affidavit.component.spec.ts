import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NameAffidavitComponent } from './name-affidavit.component';

describe('NameAffidavitComponent', () => {
  let component: NameAffidavitComponent;
  let fixture: ComponentFixture<NameAffidavitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NameAffidavitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NameAffidavitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
