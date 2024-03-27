import { Route } from '@angular/router';

import { PrescriberSearchComponent } from './prescriber/prescriber-search';
import { PatientSearchComponent } from './patient/patient-search';

export const routes: Route[] = [
  {
    path: 'prescriber',
    component: PrescriberSearchComponent,
  },
  {
    path: 'patient',
    component: PatientSearchComponent,
  },
  {
    path: '**',
    redirectTo: 'patient',
  },
];
