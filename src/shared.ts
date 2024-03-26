import { WritableSignal } from "@angular/core";
import { AbstractControl, ValidatorFn } from '@angular/forms';

export const flipSignalToggle = (target: WritableSignal<boolean>) => {
    target.update(value => !value);
}

export const log = (object: any) => {
    console.log(object)
}

export const atLeastOneRequired: ValidatorFn = (control: AbstractControl) => {
    const firstName = control.get('first_name');
    const lastName = control.get('last_name');
    const mrn = control.get('mrn');

    const atLeastOneFieldFilled =
      firstName?.value ||
      lastName?.value ||
      mrn?.value;
  
    return (!atLeastOneFieldFilled) ? { atLeastOneRequired: true } : null;
  };
  
  