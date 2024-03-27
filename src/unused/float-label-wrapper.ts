import { Component } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';
import { CommonModule } from '@angular/common';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

@Component({
  selector: 'float-label-wrapper',
  imports: [CommonModule, IconFieldModule, InputIconModule],
  standalone: true,
  template: `
  <span class="p-input-icon-left">
    <i class="pi pi-search"></i>
    <span class="p-float-label">
      <ng-container #fieldComponent></ng-container>
      <label *ngIf="props.label && props['hideLabel'] !== true" [for]="id">
        {{ props.label }}
        <span
          *ngIf="props.required && props['hideRequiredMarker'] !== true"
          aria-hidden="true"
          >*</span
        >
      </label>
    </span>
  </span>
  `,
})
export class FloatLabelWrapper extends FieldWrapper {
}
