import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressInfoDetailsComponent } from './address-info-details.component';

describe('AddressInfoDetailsComponent', () => {
  let component: AddressInfoDetailsComponent;
  let fixture: ComponentFixture<AddressInfoDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddressInfoDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddressInfoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
