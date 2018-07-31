import { RechercheCollaborateurComponent } from './../recherche-collaborateur/recherche-collaborateur.component';
import { MatriceComponent } from './../matrice/matrice.component';
import { GestionCompetenceAcquiseComponent } from './../gestion-competence-acquise/gestion-competence-acquise.component';
import { GestionCompetenceRequiseComponent } from './../gestion-competence-requise/gestion-competence-requise.component';
import { HomeComponent } from './../home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, } from '@angular/router';
import { AdministrationComponent } from '../administration/administration.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
/*       { path: '', redirectTo: 'home', pathMatch: 'full' }, */
      { path: 'home', component: HomeComponent },
      { path: 'gestion-competence-acquise', component: GestionCompetenceAcquiseComponent },
      { path: 'gestion-competence-requise', component: GestionCompetenceRequiseComponent },
      { path: 'matrice', component: MatriceComponent },
      { path: 'recherche', component: RechercheCollaborateurComponent },
      { path: 'administration', component: AdministrationComponent }
    ],
    { useHash: false })
  ],
  declarations: [],
  exports: [ RouterModule]
})
export class AppRoutingModule { }
