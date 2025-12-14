import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcRow } from './calc-row';

describe('CalcRow', () => {
  let component: CalcRow;
  let fixture: ComponentFixture<CalcRow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalcRow]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalcRow);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
