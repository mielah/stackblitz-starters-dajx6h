import { Injectable, signal } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class GenericService {
  // form = new Subject<FormGroup>(); // alternate solution
  emptyForm: FormGroup = this.fb.group({});
  // which form is active (ex: patient form or prescriber form)
  form = signal<FormGroup>(this.emptyForm);

  // which filterData is active (ex: patient filterData or prescriber filterData)
  filterData = signal<{
    [key: string]: { field: string; connector: string; value?: string };
  }>({});

  constructor(private fb: FormBuilder) { }
}
