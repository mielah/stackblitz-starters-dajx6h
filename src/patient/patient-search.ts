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
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { FormlyPrimeNGModule } from '@ngx-formly/primeng';

import { GenericComponent } from '../generic//generic';
import { PatientSearchService } from './patient-search.service';
import { GenericService } from '../generic/generic.service';
import { InputIconType } from '../custom/input-icon-input';
import { atLeastOneRequired } from '../shared';

@Component({
  selector: 'app-patient-search',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GenericComponent,
    InputGroupModule,
    TableModule,
    RouterLink,
    FormlyModule,
    FormlyPrimeNGModule,
  ],
  standalone: true,
  template: `
  <div class="w-100">
    <a [routerLink]="'prescriber'">Go to prescriber search</a>
    <h1>Patient Search {{searchStatus}}</h1>
    <div [formGroup]="form">
      <app-generic (searchInitiated)="search()">
        <div class="d-flex flex-row gap-3" simple>
          <div class="flex-column">
            <formly-form
              [form]="form"
              [fields]="fields"
              [model]="model"
              (modelChange)="syncInput($event)">
            </formly-form>
          </div>
        </div>

        <div class="d-flex flex-row gap-3" advanced>
          <div class="flex-column">
            <formly-form
              [form]="form"
              [fields]="advancedFields"
              [model]="model"
              (modelChange)="syncInput($event)">
            </formly-form>
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
export class PatientSearchComponent {
  searchStatus = ''; // for testing only
  model: any; // needed for formly form

  // status checkboxes not included in this form
  // because they were just for testing form formatting
  form: FormGroup = this.fb.group({
    first_name: ['', [Validators.pattern('^[a-zA-Z]+$')]],
    last_name: ['', [Validators.pattern('^[a-zA-Z]+$')]],
    mrn: ['', [Validators.pattern('^[0-9]+$')]],
  });
  filterConfig = {
    mrn: { field: 'MRN', connector: ' is ' },
    first_name: { field: 'First Name', connector: ' starts with ' },
    last_name: { field: 'Last Name', connector: ' starts with ' },
  };

  constructor(
    public searchService: PatientSearchService,
    private fb: FormBuilder,
    private genericService: GenericService
  ) { }

  ngOnInit() {
    this.genericService.setActiveState(this.form, this.filterConfig);
  }

  syncInput(event: any) {
    this.model = {
      ...this.model,
      first_name: event.first_name
    }
  }

  search() {
    this.searchStatus = `mrn: ${this.form.value.mrn}, firstName: ${this.form.value.first_name} lastName: ${this.form.value.last_name}`;
    this.searchService.mockSearch();
  }

  rowSelect(row: any) {
    console.log('rowSelected', row);
  }

  fields: FormlyFieldConfig[] = [
    {
      validators: {
        validation: [atLeastOneRequired],
      },
      fieldGroup: [
        // TODO: create a registry of fields to reduce duplication
        {
          key: 'first_name',
          type: InputIconType,
          props: {
            label: 'First Name',
            placeholder: 'First name',
            error: 'Invalid First name',
          },
          validators: {
            validation: ['basicDash'],
          },
        },
        {
          template: '<hr /><div><strong>Status:</strong></div>',
        },
        {
          fieldGroupClassName: 'd-flex flex-row gap-2 pb-3',
          fieldGroup: [
            {
              className: 'col-6',
              type: 'checkbox',
              key: 'void',
              props: {
                label: 'Void',
              },
            },
            {
              className: 'col-6',
              type: 'checkbox',
              key: 'hold',
              props: {
                label: 'Hold',
              },
            },
          ],
        },
        {
          fieldGroupClassName: 'd-flex flex-row gap-2 pb-3',
          fieldGroup: [
            {
              className: 'col-6',
              type: 'checkbox',
              key: 'inactive',
              props: {
                label: 'Inactive',
              },
            },
            {
              className: 'col-6',
              type: 'checkbox',
              key: 'transferred',
              props: {
                label: 'Transferred',
              },
            },
          ],
        },
      ],
    },
  ];

  advancedFields: FormlyFieldConfig[] = [
    {
      validators: {
        validation: [atLeastOneRequired],
      },
      fieldGroup: [
        {
          fieldGroupClassName: 'd-flex flex-row gap-2 pb-3',
          fieldGroup: [
            {
              key: 'first_name',
              className: 'col-6',
              type: InputIconType,
              props: {
                label: 'First Name',
                placeholder: 'First name',
                error: 'Invalid First name',
              },
              validators: {
                validation: ['basicDash'],
              },
            },
            {
              key: 'last_name',
              className: 'col-6',
              type: InputIconType,
              props: {
                label: 'Last Name',
                placeholder: 'Last name',
                error: 'Invalid Last name',
              },
              validators: {
                validation: ['basicDash'],
              },
            },
          ],
        },
        {
          key: 'mrn',
          type: 'input',
          props: {
            placeholder: 'MRN',
            pattern: /^[0-9]+$/,
          },
          validation: {
            messages: {
              pattern: (error: any, field: FormlyFieldConfig) => `"${field.formControl?.value}" is not a valid MRN`,
            },
            show: true,
          },
          expressions: {
            'validation.show': 'true',
          },
        },
      ],
    },
  ];
}
