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

    const atLeastOneFieldFilled =
      firstName?.value;
  
    return (!atLeastOneFieldFilled) ? { atLeastOneRequired: true } : null;
  };
  
  