import { Injectable, signal } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class GenericService {
  emptyForm: FormGroup = this.fb.group({});
  // form = new Subject<FormGroup>(); // alternate solution
  form = signal<FormGroup>(this.emptyForm);

  filterData = signal<{
    [key: string]: { field: string; connector: string; value?: string };
  }>({});

  constructor(private fb: FormBuilder) { }
}
