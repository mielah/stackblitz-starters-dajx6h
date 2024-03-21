import { Injectable, signal } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GenericService {
  // form = new Subject<FormGroup>(); // alternate solution
  emptyForm: FormGroup = this.fb.group({});
  form = signal<FormGroup>(this.emptyForm);

  filterData = signal<{
    [key: string]: { field: string; connector: string; value?: string };
  }>({});

  constructor(private fb: FormBuilder) {}
}
