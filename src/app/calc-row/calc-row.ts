import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { CelleDate } from '../celle-date/celle-date';
import { CelleDouble } from '../celle-double/celle-double';
import { ExcelentCalcRow } from '../models/interfaces/excelent-calc-row';
import { CsvService } from '../services/csv-service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-calc-row',
  imports: [CelleDate, CelleDouble, AsyncPipe],
  template: `
    <div>
      @if (loading) {
        <p>Loading data...</p>
      } @else {
      <table>
        <thead>
          <tr>
            <th scope="col">N°</th>
            <th scope="col">Date</th>
            <th scope="col">Compteur</th>
            <th scope="col">Litres</th>
            <th scope="col">Prix</th>
            <th scope="col">Prix/litre</th>
            <th scope="col">Km parcuru</th>
            <th scope="col">Litres/100km</th>
            <th scope="col">km/1l</th>
          </tr>
        </thead>
        <tbody>
          @for (rowData of rowsData$ | async; track $index) {
          <tr [class]="rowData.rowStyle">
            <td>
              <app-celle-double [value]="$index"></app-celle-double>
            </td>
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
      }
    </div>
  `,
  styles: `
  table {
    width: 100%;
    border-collapse: collapse;
    background-color: #393e41;
    color: #ffffff;
  }
  table, th, td {
    border: 1px solid #3f88c5;
    margin: 24px 0px;
    white-space: nowrap;
  }
  th {
    padding: 6px 16px;
  }
  .month-avarage {
    background-color: #f6f7eb;
    color: #393e41;;
  }
  `,
})
export class CalcRow implements OnInit {
  excelCalcService = inject(CsvService);
  rowsData$!: Observable<ExcelentCalcRow[]>;
  loading: boolean = true;

  constructor() {
  }

  ngOnInit() {
    this.rowsData$ = this.excelCalcService.getDataFromSCV();
    this.loading = false;
  }
}
