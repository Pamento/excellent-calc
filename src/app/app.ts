import { Component, signal } from '@angular/core';
import { CalcRow } from './calc-row/calc-row';

@Component({
  selector: 'app-root',
  imports: [CalcRow],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('exelent-calc');
}
