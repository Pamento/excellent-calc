import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CelleDate } from './celle-date';

describe('CelleDate', () => {
  let component: CelleDate;
  let fixture: ComponentFixture<CelleDate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CelleDate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CelleDate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
