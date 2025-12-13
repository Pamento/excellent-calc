import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelRow } from './excel-row';

describe('ExcelRow', () => {
  let component: ExcelRow;
  let fixture: ComponentFixture<ExcelRow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExcelRow]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExcelRow);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
