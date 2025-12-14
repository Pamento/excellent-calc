import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CsvService {
  http = inject(HttpClient);
  getData() {
    this.http.get('/assets/inputs.csv', {responseType: 'text'}).subscribe(data => {
      console.log(data);
    });
  }
}
