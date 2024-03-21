import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import {
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private fb: FormBuilder) {}
  columns$ = of(['name', 'dob', 'location']);
  data$ = of([
    {
      name: 'test',
      dob: '1/1/1999',
      location: 'hospital A',
    },
  ]);

  // @Input() filterData!: {
  //   [key: string]: { field: string; connector: string; value?: string };
  // };
}
