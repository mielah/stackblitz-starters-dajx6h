import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { InputGroupModule } from 'primeng/inputgroup';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { GenericComponent } from '../generic//generic';
import { TableModule } from 'primeng/table';
import { PatientSearchService } from './patient-search.service';
import { GenericService } from '../generic/generic.service';
import { RouterLink } from '@angular/router';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { FormlyPrimeNGModule } from '@ngx-formly/primeng';
import { InputIconType } from '../generic/input-icon-input';
import { atLeastOneRequired } from '../shared';

@Component({
  selector: 'app-patient-search',
  providers: [],
  // changeDetection: ChangeDetectionStrategy.OnPush,
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
     <app-generic (searchInitiated)="search($event)">
     <div class="d-flex flex-row gap-3" simple>
      <div class="flex-column">
        <formly-form 
            [form]="form"
            [fields]="fields"
            [model]="model">
          </formly-form>
        </div>
      </div>
      
        <div class="d-flex flex-row gap-3">
           <!-- MRN input -->
           <div class="flex-column">
            <div class="p-inputgroup">
              <span class="p-float-label">
                <input pInputText placeholder="MRN" class="form-control" type="text" id="mrn"
                  name="mrn" formControlName="mrn" />
                  <label htmlFor="mrn" class="fs-6">MRN</label>
              </span>
            </div>
            <div *ngIf="mrn?.invalid && (mrn?.dirty || mrn?.touched)" class="text-danger ms-5">
              <small *ngIf="mrn?.errors?.['pattern']">Invalid MRN</small>
            </div>
          </div>
        </div>

        <div class="d-flex flex-row gap-3 justify-content" advanced>
           <!-- First name input -->
           <div class="flex-column">
            <div class="p-inputgroup">
              <span class="p-float-label">
                <input pInputText placeholder="First Name" class="form-control" type="text" id="first_name"
                  name="first_name" formControlName="first_name"/>
                  <label htmlFor="first_name" class="fs-6">First Name</label>
              </span>
            </div>
            <div *ngIf="first_name?.invalid && (first_name?.dirty || first_name?.touched)" class="text-danger ms-5">
              <small *ngIf="first_name?.errors?.['pattern']">Invalid First Name</small>
            </div>
          </div>
        <!-- Last name input -->
        <div class="flex-column">
            <div class="p-inputgroup">
              <span class="p-float-label">
                <input pInputText placeholder="Last Name" class="form-control" type="text" id="last_name"
                  name="last_name" formControlName="last_name" />
                  <label htmlFor="last_name" class="fs-6">Last Name</label>
              </span>
            </div>
            <div *ngIf="last_name?.invalid && (last_name?.dirty || last_name?.touched)" class="text-danger ms-5">
              <small *ngIf="last_name?.errors?.['pattern']">Invalid Last Name</small>
            </div>
          </div>
        </div>
      </app-generic>
  </div>
  <p-table [value]="(this.searchService.data$ | async) || []" dataKey="name" [tableStyle]="{ 'min-width': '50rem' }"
  [columns]="(searchService.columns$ | async) || []"
       selectionMode="single" (onRowSelect)="rowSelect($event)">
       <ng-template pTemplate="header" let-columns>
        <tr>
            <th *ngFor="let col of columns">
                {{ col }}
            </th>
        </tr>
    </ng-template>
    <ng-template pTemplate="body" let-rowData let-columns="columns">
        <tr>
            <td *ngFor="let col of columns">
                {{ rowData[col] }}
            </td>
        </tr>
    </ng-template>
</p-table>
</div>
  `,
})
export class PatientSearchComponent {
  model: any;
  searchStatus = ''; // for testing only
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
    this.genericService.form.set(this.form);
    this.genericService.filterData.set(this.filterConfig);

    this.form.controls['first_name'].valueChanges.subscribe((x) => {
      this.form.controls['first_name'].setValue(x, {
        onlySelf: true,
        emitEvent: false,
      })
    })
  }

  get first_name() {
    return this.form.get('first_name');
  }

  get last_name() {
    return this.form.get('last_name');
  }

  get mrn() {
    return this.form.get('mrn');
  }

  search(sort: boolean) {
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
          formControl: this.form.controls['first_name'],
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
}
