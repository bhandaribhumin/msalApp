import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'incident',
    loadComponent: () => import('./pages/incident-form/incident-form.page').then( m => m.IncidentFormPage)
  },
  {
    path: '',
    redirectTo: 'incident',
    pathMatch: 'full'
  },

];
