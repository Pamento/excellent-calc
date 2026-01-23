import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-celle-double',
  imports: [],
  template: `
    <p class="cell-double">
      {{value}}
    </p>
  `,
  styles: `
    .cell-double {
      margin: 4px 10px;
    }
  `,
})
export class CelleDouble {
  @Input() value: number = 0;
}
