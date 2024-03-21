import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PatientSearchService {
  constructor() {}
  columns$ = of(['mrn', 'name', 'dob', 'location']);
  data$ = of([
    {
      mrn: 123123,
      name: 'test',
      dob: '1/1/1999',
      location: 'hospital A',
    },
  ]);
}
