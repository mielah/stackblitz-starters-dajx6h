import { Injectable, WritableSignal, signal } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PrescriberSearchService {
  constructor() {}
  columns$ = of(['name', 'dob', 'location']);
  data$ = of([
    {
      name: 'test',
      dob: '1/1/1999',
      location: 'hospital A',
    },
  ]);

  mockSearch() {
    this.data$ = of([
      {
        name: 'test',
        dob: '1/1/1980',
        location: 'hospital B',
      },
      {
        name: 'dr death',
        dob: '1/1/1970',
        location: 'hospital A',
      },
    ])
  }
}
