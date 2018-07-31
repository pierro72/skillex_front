import { Routes } from '@angular/router';
import { CollaborateurComponent, CollaborateurDetailComponent  } from './.';


export const collaborateurRoute: Routes = [
    { path: 'collaborateur', component: CollaborateurComponent },
    { path: 'collaborateur/:id', component: CollaborateurDetailComponent}
];
