import { Component, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet, provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormlyModule } from '@ngx-formly/core';

import { routes } from './routes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterOutlet],
  template: `
     <router-outlet></router-outlet>
  `,
})
export class App {
  name = 'Angular';
}

const dashStringValidation = '^-?[^-]+(?:-[^-]+)*-?$';

bootstrapApplication(App, {
  providers: [provideAnimations(), provideRouter(routes), importProvidersFrom([
    FormlyModule.forRoot({
      validators: [
        { name: 'basicDash', validation: Validators.pattern(dashStringValidation) },
      ],
    }),
  ]),],
});
