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
          <tr>
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
  styles: ``,
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

  // ngOnInit() {
  //   this.excelCalcService
  //     .getData()
  //     .then((data: ExcelentCalcRow[]) => {
  //       console.log('Rows Data 0:', this.rowsData);
  //       console.log('Rows Data D:', data);
  //       this.rowsData = data;
  //       console.log('Rows Data:', this.rowsData);
  //     })
  //     .catch((error) => {
  //       console.error('Error loading data:', error);
  //     });
  //   console.log('Rows Data after:', this.rowsData);
  // }

  // Temporary hardcoded data for testing
  // Remove this when integrating with CsvService

  rowsDatas: ExcelentCalcRow[] = [
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
