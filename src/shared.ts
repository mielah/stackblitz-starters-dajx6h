import { WritableSignal } from "@angular/core";

export const flipSignalToggle = (target: WritableSignal<boolean>) => {
    target.update(value => !value);
}