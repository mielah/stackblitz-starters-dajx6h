import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { ReactiveFormsModule } from '@angular/forms';
import { PanelComponent } from './panel';
import { GenericService } from './generic.service';

export interface Filter {
  field: string;
  connector: string;
  value: string;
}

@Component({
  selector: 'app-generic',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    ChipModule,
    PanelComponent,
  ],
  template: `
  <div *ngIf="genericService.form() as form">
  <form [formGroup]="form" name="simplePatientSearchForm" (ngSubmit)="sendSearchEvent()">
    <ng-content select="[simple]"></ng-content>
    <p-button type="Submit">Submit</p-button>
  </form>

  <!-- Advanced search link -->
  <div style="margin-top: 2rem; margin-bottom: 1rem;">
    <p-button label="Advanced Search" styleClass="p-button-link p-0 fs-5-5"
      (onClick)="toggleAdvancedSearch()"></p-button>
  </div>

  <div class="d-flex flex-row gap-2 flex-wrap">
    <span *ngFor="let filter of getSelectedSearchCriteria(form.value)">
      <p-chip styleClass="m-0">
        <b>{{ filter.field }}&nbsp;</b>
        {{ filter.connector }}
        <b>&nbsp;{{ filter.value }}</b>
      </p-chip>
    </span>
  </div>

  <app-panel [opened]="panelOpen" (toggled)="panelOpen = $event">
  <form [formGroup]="form" name="advPatientSearchForm" (ngSubmit)="sendSearchEvent()">
    <hr>
      <ng-content select="[advanced]"></ng-content>
    <hr>
    <div class="justify-content-end gap-2 flex-row d-flex mt-4">
      <p-button (click)="form.reset()" label="Clear"
        styleClass="p-button-secondary p-button-outlined p-button-slim "></p-button>
      <p-button type="Submit" label="Search" styleClass="p-button-primary p-button-slim p-button-raised"
        [disabled]="form.invalid"></p-button>
    </div>
    </form>
  </app-panel>
</div>
  `,
  providers: [],
})
export class GenericComponent {
  @Output() searchInitiated = new EventEmitter<boolean>();

  panelOpen: boolean = false;

  constructor(public genericService: GenericService) {}

  sendSearchEvent() {
    this.searchInitiated.emit(false);
  }

  getSelectedSearchCriteria(searchForm: any): Filter[] {
    const criteria: Filter[] = [];

    Object.keys(searchForm).forEach((fieldName: string) => {
      let fieldValue = searchForm[fieldName];
      const fieldConfig = this.genericService.filterData()[fieldName];

      if (fieldValue && fieldValue.length > 0 && fieldConfig) {
        criteria.push({ value: fieldValue, ...fieldConfig });
      }
    });

    return criteria;
  }

  toggleAdvancedSearch(): void {
    this.panelOpen = !this.panelOpen;
  }
}
