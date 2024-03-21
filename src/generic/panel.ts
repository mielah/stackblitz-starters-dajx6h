import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InputGroupModule } from 'primeng/inputgroup';
import { ButtonModule } from 'primeng/button';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-panel',
  providers: [],
  imports: [CommonModule, ButtonModule, InputGroupModule],
  standalone: true,
  template: `
  <div style="overflow-x: hidden;width:0;" [@panel]="opened ? 'true' : 'false'">
    <p-button label="Collapse"
            icon="fa fa-solid fa-angle-right fa-xl" iconPos="right" (onClick)="toggleEvent()">
    </p-button>
    <ng-content></ng-content>
  </div>
  `,
  animations: [
    trigger('panel', [
      state('false', style({ width: 0 })),
      state('true', style({ width: '40rem' })),
      transition('* => *', animate(200)),
    ]),
  ],
})
export class PanelComponent {
  @Input() opened: boolean = false;
  @Output() toggled = new EventEmitter<boolean>();

  constructor() {}

  toggleEvent() {
    this.toggled.emit(!this.opened);
  }
}
