import {  ContextService } from '../shared';
import { Competence } from '../entities/competence';
import { CompetenceRequise, CompetenceRequiseService} from '../entities/competence-requise';
import { CollaborateurService, Collaborateur} from '../entities/collaborateur';
import { Component, OnInit } from '@angular/core';
import { TIMEOUT_DEFAUT} from '../app.constants';


@Component({
    selector: 'app-gestion-competence-acquise',
    templateUrl: './gestion-competence-acquise.component.html'
})
export class GestionCompetenceAcquiseComponent  {

    public selectedCompetence:  Competence;

    constructor (
        public competenceRequiseService: CompetenceRequiseService,
        public collaborateurService: CollaborateurService,
        public contextService: ContextService
    ) {}
    
    updateSelectedCompetence(competence: Competence ) {
        this.selectedCompetence = competence;
        setTimeout((() => {
            this.selectedCompetence = null;
           }).bind(this), TIMEOUT_DEFAUT);
    }

    /*    private getCollaborateur(id: number) {
        this.collaborateurService.find(id).subscribe(
            (collaborateur) => {
                this.collaborateur = collaborateur;
             }
        );
    }*/

    /*    private getCompetenceRequises(id: number) {
			const params = new HttpParams().set('equipeId.' +
				'', id.toString());
			this.competenceRequiseService.query(params).subscribe(
				(competenceRequises) => {
					this.competenceRequises = competenceRequises;
				 }
			);
		}*/

}
