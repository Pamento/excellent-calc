import { Component } from '@angular/core';
import { CelleDate } from '../celle-date/celle-date';
import { CelleDouble } from '../celle-double/celle-double';
import { ExcelentCalcRow } from '../excelent-calc-row';

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
            <app-celle-double [value]="rowData.litrs"></app-celle-double>
          </td>
          <td>
            <app-celle-double [value]="rowData.price"></app-celle-double>
          </td>
        </tr>
        }
      </tbody>
    </table>
  `,
  styles: ``,
})
export class CalcRow {
  rowDatas: ExcelentCalcRow[] = [
    { date: '2024-01-01', km: 1000, litrs: 50, price: 75 },
    { date: '2024-02-01', km: 1500, litrs: 40, price: 60 },
    { date: '2024-03-01', km: 2000, litrs: 60, price: 90 },
  ];
}
