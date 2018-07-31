import {  ContextService } from '../shared';
import { Competence } from '../entities/competence';
import { Component, OnInit } from '@angular/core';
import { TIMEOUT_DEFAUT} from '../app.constants';


@Component({
    selector: 'app-gestion-competence-requise',
    templateUrl: './gestion-competence-requise.component.html'
})
export class GestionCompetenceRequiseComponent  {
    selectedCompetence: Competence;

    constructor (
        public contextService: ContextService
    ) {}


    updateSelectedCompetence(competence: Competence ) {
        this.selectedCompetence = competence;
        setTimeout((
            () => {this.selectedCompetence = null; }
        ).bind(this), TIMEOUT_DEFAUT);
    }


}
