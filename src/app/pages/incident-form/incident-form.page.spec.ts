import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IncidentFormPage } from './incident-form.page';

describe('IncidentFormPage', () => {
  let component: IncidentFormPage;
  let fixture: ComponentFixture<IncidentFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
