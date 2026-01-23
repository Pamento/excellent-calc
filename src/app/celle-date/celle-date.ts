import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-celle-date',
  imports: [],
  template: `
    <p class="cell-date">
      {{date}}
    </p>
  `,
  styles: `
    .cell-date {
      margin: 6px 10px;
    }
  `,
})
export class CelleDate {
  @Input() date: string = '';
}
