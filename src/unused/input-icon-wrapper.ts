import { Component } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'input-icon-wrapper',
  imports: [CommonModule],
  standalone: true,
  template: `
  <div class="p-inputgroup" style="width: 16rem !important">
    <span class="p-inputgroup-addon">
      <i class="pi pi-search"></i>
    </span>
    <ng-container #fieldComponent></ng-container>
  </div>
  `,
})
export class InputIconWrapper extends FieldWrapper {
}
