import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ExcelentCalcRow } from './excelent-calc-row';

@Injectable({
  providedIn: 'root',
})
export class CsvService {
  http = inject(HttpClient);

  getData(): ExcelentCalcRow[] | [] {
    let lines: string[] = [];
    this.http.get('/assets/inputs.csv', { responseType: 'text' }).subscribe((data) => {
      console.log(data);
      lines = data.split('\n');
      lines.forEach((line) => console.log(line));
      console
    });

    console.log('Lines:', lines);
    return this.computeRowsData(lines);
  }

  private computeRowsData(lines: string[]): ExcelentCalcRow[] | [] {
    console.log('Computing rows data from lines:', lines);
    if (lines.length === 0) {
      return [];
    }

    let rowsData: ExcelentCalcRow[] = [];

    for (let i = 1; i < lines.length; i++) {
      const columns = lines[i].split(',');

      if (columns.length >= 4) {
        const date = columns[0];
        const km = parseInt(columns[1]);
        const liters = parseFloat(columns[2]);
        const price = parseFloat(columns[3]);
        const priceLiter = parseFloat(columns[4]);

        const kmDone = i > 1 ? km - parseInt(lines[i - 1].split(',')[1]) : 0;
        const liters100km = kmDone > 0 ? (liters / kmDone) * 100 : 0;
        const kmLiter = liters > 0 && kmDone > 0 ? kmDone / liters : 0;

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
