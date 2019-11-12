import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgeAffidavitComponent } from './age-affidavit.component';

describe('AgeAffidavitComponent', () => {
  let component: AgeAffidavitComponent;
  let fixture: ComponentFixture<AgeAffidavitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgeAffidavitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgeAffidavitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
