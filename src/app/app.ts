import { Component, inject, OnInit, signal } from '@angular/core';
import { CalcRow } from './calc-row/calc-row';
import { CsvService } from './csv-service';

@Component({
  selector: 'app-root',
  imports: [CalcRow],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('exelent-calc');
  excelCalcService = inject(CsvService);
  ngOnInit(): void {
    /*this.excelCalcService.loadCsvData();*/
    console.log('Excelent Calc initalized');
  }
}
