import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { InputGroupModule } from 'primeng/inputgroup';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TableModule } from 'primeng/table';
import { RouterLink } from '@angular/router';

import { GenericComponent } from '../generic/generic';
import { GenericService } from '../generic/generic.service';
import { PrescriberSearchService } from './prescriber-search.service';

// uses manually defined forms instead of formly dynamic forms
@Component({
  selector: 'app-prescriber-search',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GenericComponent,
    InputGroupModule,
    TableModule,
    RouterLink,
  ],
  standalone: true,
  template: `
  <div>
    <a [routerLink]="['/patient']">Go to patient search</a>
    <h1>Prescriber Search {{searchStatus}}</h1>
    <div [formGroup]="form">
      <app-generic (searchInitiated)="search()">
        <!-- Simple search form -->
        <div class="d-flex flex-row gap-3" simple>
          <!-- First name input -->
          <div class="flex-column">
            <div class="p-inputgroup">
              <span class="p-float-label">
                <input
                  pInputText
                  placeholder="First Name"
                  class="form-control"
                  type="text"
                  id="first_name"
                  name="first_name"
                  formControlName="first_name" />
                <label htmlFor="first_name" class="fs-6">First Name</label>
              </span>
            </div>
            <div
              *ngIf="first_name?.invalid && (first_name?.dirty || first_name?.touched)"
              class="text-danger ms-5">
              <small *ngIf="first_name?.errors?.['pattern']"
                >Invalid First Name</small
              >
            </div>
          </div>
        </div>

        <!-- Advanced search form -->
        <div class="d-flex flex-row gap-3" advanced>
          <!-- First name input -->
          <div class="flex-column">
            <div class="p-inputgroup">
              <span class="p-float-label">
                <input
                  pInputText
                  placeholder="First Name"
                  class="form-control"
                  type="text"
                  id="first_name"
                  name="first_name"
                  formControlName="first_name" />
                <label htmlFor="first_name" class="fs-6">First Name</label>
              </span>
            </div>
            <div
              *ngIf="first_name?.invalid && (first_name?.dirty || first_name?.touched)"
              class="text-danger ms-5">
              <small *ngIf="first_name?.errors?.['pattern']"
                >Invalid First Name</small
              >
            </div>
          </div>
          <!-- Last name input -->
          <div class="flex-column">
            <div class="p-inputgroup">
              <span class="p-float-label">
                <input
                  pInputText
                  placeholder="Last Name"
                  class="form-control"
                  type="text"
                  id="last_name"
                  name="last_name"
                  formControlName="last_name" />
                <label htmlFor="last_name" class="fs-6">Last Name</label>
              </span>
            </div>
            <div
              *ngIf="last_name?.invalid && (last_name?.dirty || last_name?.touched)"
              class="text-danger ms-5">
              <small *ngIf="last_name?.errors?.['pattern']"
                >Invalid Last Name</small
              >
            </div>
          </div>
        </div>
      </app-generic>
    </div>

    <!-- Data table -->
    <p-table
      [value]="(this.searchService.data$ | async) || []"
      dataKey="name"
      [tableStyle]="{ 'min-width': '50rem' }"
      [columns]="(searchService.columns$ | async) || []"
      selectionMode="single"
      (onRowSelect)="rowSelect($event)">
      <ng-template pTemplate="header" let-columns>
        <tr>
          <th *ngFor="let col of columns">{{ col }}</th>
        </tr>
      </ng-template>
      <ng-template pTemplate="body" let-rowData let-columns="columns">
        <tr>
          <td *ngFor="let col of columns">{{ rowData[col] }}</td>
        </tr>
      </ng-template>
    </p-table>
  </div>
  `,
})
export class PrescriberSearchComponent {
  searchStatus = ''; // for testing only
  form: FormGroup = this.fb.group({
    first_name: ['', [Validators.pattern('^[a-zA-Z]+$')]],
    last_name: ['', [Validators.pattern('^[a-zA-Z]+$')]],
  });
  filterConfig = {
    first_name: { field: 'First Name', connector: ' starts with ' },
    last_name: { field: 'Last Name', connector: ' starts with ' },
  };

  constructor(
    public searchService: PrescriberSearchService,
    private fb: FormBuilder,
    private genericService: GenericService
  ) {}

  ngOnInit() {
    this.genericService.form.set(this.form);
    this.genericService.filterData.set(this.filterConfig);
  }

  get first_name() {
    return this.form.get('first_name');
  }

  get last_name() {
    return this.form.get('last_name');
  }

  search() {
    this.searchStatus = `firstName: ${this.form.value.first_name} lastName: ${this.form.value.last_name}`;
    this.searchService.mockSearch();
  }

  rowSelect(row: any) {
    console.log('rowSelected', row);
  }
}
