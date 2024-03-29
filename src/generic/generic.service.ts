import { Injectable, signal } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Filter } from '../shared';

@Injectable({
  providedIn: 'root',
})
export class GenericService {
  // form = new Subject<FormGroup>(); // alternate solution
  private emptyForm: FormGroup = this.fb.group({});
  // which form is active (ex: patient form or prescriber form)
  form = signal<FormGroup>(this.emptyForm);

  // which filterData is active (ex: patient filterData or prescriber filterData)
  filterData = signal<{
    [key: string]: Filter
  }>({});

  constructor(private fb: FormBuilder) { }

  setActiveState(form: any, filterConfig: {[key: string]: Filter}) {
    this.form.set(form);
    this.filterData.set(filterConfig);
  }
}
