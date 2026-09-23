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
    let monthNb = "";

    for (let i = 1; i < lines.length; i++) {
      const columns = lines[i].split(',');
      let result = columns.length >= 5 ? this.getMonthNb(columns[0]) : "";
      if (i === 1) {
        monthNb = result;
      }
      if (monthNb !== result) {
        rowsData.push(this.addMonthAvarage(monthNb, rowsData));
        monthNb = result;
      }

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
          rowStyle: '',
        });
      }
    }

    return rowsData;
  }

  private addMonthAvarage(monthNb: string, rowsData: ExcelentCalcRow[]): ExcelentCalcRow {
    const monthName = this.getMonthName(monthNb);
    const monthRows = rowsData.filter(row => this.getMonthNb(row.date) === monthNb);
    const totalKmDone = monthRows.reduce((sum, row) => sum + row.kmDone, 0);
    const totalLiters = monthRows.reduce((sum, row) => sum + row.liters, 0);
    const totalPrice = this.roundIfNeeded(monthRows.reduce((sum, row) => sum + row.price, 0));
    const priceLiter = Number((monthRows.reduce((sum, row) => sum + row.priceLiter, 0) / monthRows.length).toFixed(3));
    const liters100km = totalKmDone > 0 ? Number(((totalLiters / totalKmDone) * 100).toFixed(2)) : 0;
    const kmLiter = totalLiters > 0 && totalKmDone > 0 ? Number((totalKmDone / totalLiters).toFixed(2)) : 0;

    return {
      date: `Moyenne ${monthName}`,
      km: 0,
      liters: totalLiters,
      price: totalPrice,
      priceLiter: priceLiter,
      kmDone: totalKmDone,
      liters100km: liters100km,
      kmLiter: kmLiter,
      rowStyle: 'month-avarage',
    };
  }

  private roundIfNeeded(value: number): number {
    let afterPeriod = value.toString().split('.')[1];
    if (afterPeriod && afterPeriod.length > 2) {
      return Math.round((value + Number.EPSILON) * 100) / 100;
    }
    return value;
  }

  private getMonthNb(date: string): string {
    if(date.includes('/')) {
      const splited: string[] = date.split('/');
      return splited.length === 3 ? splited[1] : "";
    }
    return "";
  }

  private getMonthName(order: string): string {
    let monthName = "";
    if (order && order.length > 0) {
      switch(order) {
        case "01" : monthName = "Janvier"; break; 
        case "02" : monthName = "Février"; break; 
        case "03" : monthName = "Mars"; break; 
        case "04" : monthName = "Avril"; break; 
        case "05" : monthName = "Mai"; break; 
        case "06" : monthName = "Juin"; break; 
        case "07" : monthName = "Juillet"; break; 
        case "08" : monthName = "Août"; break; 
        case "09" : monthName = "Septembre"; break; 
        case "10" : monthName = "Octobre"; break; 
        case "11" : monthName = "Novembre"; break; 
        case "12" : monthName = "Décembre"; break; 
      }
    }
    return monthName;
  }
}
