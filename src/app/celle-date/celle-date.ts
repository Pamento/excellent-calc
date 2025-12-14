import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-celle-date',
  imports: [],
  template: `
    <p>
      {{date}}
    </p>
  `,
  styles: ``,
})
export class CelleDate {
  @Input() date = '';
}
