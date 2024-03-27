import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import {
    ReactiveFormsModule,
} from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';

// custom text input type for formly forms that includes an icon
// and a float label
@Component({
    selector: 'icon-input',
    imports: [ReactiveFormsModule, FormlyModule, CommonModule],
    standalone: true,
    template: `
    <div class="flex-column">
        <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
            <i class="pi pi-search"></i>
            </span>
            <span class="p-float-label">
            <input
                pInputText
                class="form-control no-left-radius"
                type="text"
                [formControl]="formControl"
                [formlyAttributes]="field" />
            <label>
                {{ props.label }}
                <span
                *ngIf="props.required && props['hideRequiredMarker'] !== true"
                aria-hidden="true"
                >*</span
                >
            </label>
            </span>
        </div>
        <div
            *ngIf="formControl.invalid && (formControl.dirty || formControl.touched)"
            class="text-danger ms-5">
            <small *ngIf="formControl.errors?.['pattern']">{{props['error']}}</small>
        </div>
    </div>
  `,
})
export class InputIconType extends FieldType<FieldTypeConfig> {}