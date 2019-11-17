import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralAffidavitComponent } from './general-affidavit.component';

describe('GeneralAffidavitComponent', () => {
  let component: GeneralAffidavitComponent;
  let fixture: ComponentFixture<GeneralAffidavitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralAffidavitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralAffidavitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
