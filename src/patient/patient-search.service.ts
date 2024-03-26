import { Injectable } from '@angular/core';
import { delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PatientSearchService {
  constructor() { }
  columns$ = of(['mrn', 'name', 'dob', 'location']);
  data$ = of([
    {
      mrn: 123123,
      name: 'test',
      dob: '1/1/1999',
      location: 'hospital A',
    },
  ]);

  mockSearch() {
    this.data$ = of([
      {
        mrn: 987987,
        name: 'test',
        dob: '1/1/1980',
        location: 'hospital B',
      },
      {
        mrn: 6482048,
        name: 'neo',
        dob: '1/1/1970',
        location: 'hospital A',
      },
    ]).pipe(
      delay(1000)
    )
  }
}
