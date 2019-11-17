import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarriageAffidavitComponent } from './marriage-affidavit.component';

describe('MarriageAffidavitComponent', () => {
  let component: MarriageAffidavitComponent;
  let fixture: ComponentFixture<MarriageAffidavitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarriageAffidavitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarriageAffidavitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
