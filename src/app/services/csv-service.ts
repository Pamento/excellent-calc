import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ExcelentCalcRow } from '../models/interfaces/excelent-calc-row';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CsvService {
  http = inject(HttpClient);


  getDataFromSCV(): Observable<ExcelentCalcRow[]> {
    return this.http.get('/assets/inputs.csv', { responseType: 'text' }).pipe(
      map((data: any) => {
        const lines = data.split('\n');
        return this.computeRowsData(lines) ?? [];
      }
    ));   
  }

  async getData(): Promise<ExcelentCalcRow[]> {
    let lines: string[];
    const response = await fetch('/assets/inputs.csv');
    const data = await response.text();
    console.log(data);
    lines = data.split('\n');
    return this.computeRowsData(lines) ?? [];
  }

  private computeRowsData(lines: string[]): ExcelentCalcRow[] {
    if (lines.length === 0) {
      return [];
    }

    let rowsData: ExcelentCalcRow[] = [];

    for (let i = 1; i < lines.length; i++) {
      const columns = lines[i].split(',');

      if (columns.length >= 5) {
        const date = columns[0];
        const km = parseInt(columns[1]);
        const liters = parseFloat(columns[2]);
        const price = parseFloat(columns[3]);
        const priceLiter = parseFloat(columns[4]);

        const kmDone = i > 1 ? km - parseInt(lines[i - 1].split(',')[1]) : 0;
        const liters100km = kmDone > 0 ? Number(((liters / kmDone) * 100).toFixed(2)) : 0;
        const kmLiter = liters > 0 && kmDone > 0 ? Number((kmDone / liters).toFixed(2)) : 0;

        rowsData.push({
          date,
          km,
          liters,
          price,
          priceLiter,
          kmDone,
          liters100km,
          kmLiter,
        });
      }
    }

    return rowsData;
  }
}
