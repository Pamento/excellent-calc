import { Component, inject, OnInit } from '@angular/core';
import { CelleDate } from '../celle-date/celle-date';
import { CelleDouble } from '../celle-double/celle-double';
import { ExcelentCalcRow } from '../excelent-calc-row';
import { CsvService } from '../csv-service';

@Component({
  selector: 'app-calc-row',
  imports: [CelleDate, CelleDouble],
  template: `
    <table>
      <thead>
        <tr>
          <th scope="col">Date</th>
          <th scope="col">Compteur</th>
          <th scope="col">Litres</th>
          <th scope="col">Prix</th>
        </tr>
      </thead>
      <tbody>
        @for (rowData of rowDatas; track $index) {
        <tr>
          <td>
            <app-celle-date [date]="rowData.date"></app-celle-date>
          </td>
          <td>
            <app-celle-double [value]="rowData.km"></app-celle-double>
          </td>
          <td>
            <app-celle-double [value]="rowData.liters"></app-celle-double>
          </td>
          <td>
            <app-celle-double [value]="rowData.price"></app-celle-double>
          </td>
          <td>
            <app-celle-double [value]="rowData.priceLiter"></app-celle-double>
          </td>
          <td>
            <app-celle-double [value]="rowData.kmDone"></app-celle-double>
          </td>
          <td>
            <app-celle-double [value]="rowData.liters100km"></app-celle-double>
          </td>
          <td>
            <app-celle-double [value]="rowData.kmLiter"></app-celle-double>
          </td>
        </tr>
        } @empty {
        <tr>
          <td colspan="4">No data available</td>
        </tr>
        }
      </tbody>
    </table>
  `,
  styles: ``,
})
export class CalcRow implements OnInit {
  excelCalcService = inject(CsvService);

  ngOnInit(): void {
    this.excelCalcService.getData();
  }

  rowDatas: ExcelentCalcRow[] = [
    {
      date: '2024-01-01',
      km: 1000,
      liters: 50,
      price: 75,
      priceLiter: 1.5,
      kmDone: 0,
      liters100km: 0,
      kmLiter: 0,
    },
    {
      date: '2024-02-01',
      km: 1500,
      liters: 40,
      price: 60,
      priceLiter: 1.5,
      kmDone: 500,
      liters100km: 8,
      kmLiter: 12.5,
    },
    {
      date: '2024-03-01',
      km: 2000,
      liters: 60,
      price: 90,
      priceLiter: 1.5,
      kmDone: 500,
      liters100km: 12,
      kmLiter: 8.33,
    },
  ];
}
