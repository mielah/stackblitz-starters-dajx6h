import { Route } from '@angular/router';
import { SearchComponent } from './search';

export const routes: Route[] = [
  {
    path: 'prescriber',
    component: SearchComponent,
  },
  // {
  //   path: 'patient',
  //   component: ProductComponent,
  // },
  {
    path: '**',
    redirectTo: 'prescriber',
  },
];
