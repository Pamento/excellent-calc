import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CelleDate } from "./celle-date/celle-date";
import { CelleDouble } from "./celle-double/celle-double";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CelleDate, CelleDouble],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('exelent-calc');
}
