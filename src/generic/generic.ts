import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Output, WritableSignal, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { ReactiveFormsModule } from '@angular/forms';

import { PanelComponent } from './panel';
import { GenericService } from './generic.service';
import { flipSignalToggle, Filter } from '../shared'

@Component({
  selector: 'app-generic',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    ChipModule,
    PanelComponent,
  ],
  template: `
  <div *ngIf="genericService.form() as form">
    <form
      [formGroup]="form"
      name="simplePatientSearchForm"
      (ngSubmit)="sendSearchEvent()">
      <ng-content select="[simple]"></ng-content>
      <p-button type="Submit" [disabled]="form.invalid">Submit</p-button>
    </form>

    <!-- Advanced search link -->
    <div style="margin-top: 2rem; margin-bottom: 1rem">
      <p-button
        label="Advanced Search"
        styleClass="p-button-link p-0 fs-5-5"
        (onClick)="flipSignalToggle(advancedPanelOpen)"></p-button>
    </div>

    <!-- Filter data chips -->
    <div class="d-flex flex-row gap-2 flex-wrap">
      <span *ngFor="let filter of getSelectedSearchCriteria(form.value)">
        <p-chip styleClass="m-0">
          <b>{{ filter.field }}&nbsp;</b>
          {{ filter.connector }}
          <b>&nbsp;{{ filter.value }}</b>
        </p-chip>
      </span>
    </div>

    <app-panel [opened]="advancedPanelOpen">
      <form
        [formGroup]="form"
        name="advPatientSearchForm"
        (ngSubmit)="sendSearchEvent()">
        <hr />
        <ng-content select="[advanced]"></ng-content>
        <hr />
        <div class="gap-2 flex-row d-flex mt-4">
          <p-button
            (click)="form.reset()"
            label="Clear"
            styleClass="p-button-secondary p-button-outlined p-button-slim "></p-button>
          <p-button
            type="Submit"
            label="Search"
            styleClass="p-button-primary p-button-slim p-button-raised"
            [disabled]="form.invalid"></p-button>
        </div>
      </form>
    </app-panel>
  </div>
  `,
})
export class GenericComponent {
  flipSignalToggle = flipSignalToggle;
  @Output() searchInitiated = new EventEmitter<boolean>();
  advancedPanelOpen: WritableSignal<boolean> = signal<boolean>(false);

  constructor(public genericService: GenericService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    // needed for the submit button status to update
    this.genericService.form().statusChanges.subscribe(() => {
      this.cdr.detectChanges()
    });
  }

  sendSearchEvent() {
    this.searchInitiated.emit(false);
  }

  // use filterData to convert the form into the filter chips
  // that display the active filters
  getSelectedSearchCriteria(searchForm: any): Filter[] {
    const criteria: Filter[] = [];

    Object.keys(searchForm).forEach((fieldName: string) => {
      let fieldValue = searchForm[fieldName];
      const fieldConfig = this.genericService.filterData()[fieldName];

      if (fieldValue && fieldValue.length > 0 && fieldConfig) {
        criteria.push({ ...fieldConfig, value: fieldValue });
      }
    });

    return criteria;
  }
}
