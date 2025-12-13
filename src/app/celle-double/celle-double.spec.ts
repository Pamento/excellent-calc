import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CelleDouble } from './celle-double';

describe('CelleDouble', () => {
  let component: CelleDouble;
  let fixture: ComponentFixture<CelleDouble>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CelleDouble]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CelleDouble);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
