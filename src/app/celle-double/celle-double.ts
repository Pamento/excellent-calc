import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-celle-double',
  imports: [],
  template: `
    <p>
      {{value}}
    </p>
  `,
  styles: ``,
})
export class CelleDouble {
  @Input() value = 0;
}
