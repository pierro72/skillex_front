import { Competence } from '../entities/competence';
import { Branche, BrancheService } from '../entities/branche';
import { CompetenceAcquise } from '../entities/competence-acquise';
import { CollaborateurService, Collaborateur} from '../entities/collaborateur';
import { Component, OnInit } from '@angular/core';
import {ContextService, Critere, Evaluation} from '../shared';



@Component({
    selector: 'app-recherche-collaborateur',
    templateUrl: './recherche-collaborateur.component.html',
    styleUrls: ['./recherche-collaborateur.component.css']
})
export class RechercheCollaborateurComponent implements OnInit {
    collaborateur: Collaborateur;
    collaborateurs: Collaborateur[];
    sortedCollaborateurs: Collaborateur[];
    criteres: Critere[];
    isFilterActive:  boolean;
    isCritereActive:  boolean;


    constructor (
        public contextService: ContextService,
        public brancheService: BrancheService,
        public collaborateurService: CollaborateurService
    ) {}

    ngOnInit(): void {
        /* CRITERES DE RECHERCHE */
        if ( sessionStorage.getItem('criteres') ) {
            this.criteres = JSON.parse(sessionStorage.getItem('criteres'));
        } else {
            this.criteres = new Array<Critere>();
        }

        this.isFilterActive = false;
        this.isCritereActive = true;
        if (this.criteres.length > 0){
            this.calculateStyles();
        }


        /* COLLABORATEURS */
        if ( sessionStorage.getItem('collaborateurs') ) {
            this.collaborateurs = JSON.parse(sessionStorage.getItem('collaborateurs'));
            if ( sessionStorage.getItem('sortedCollaborateurs') ) {
                this.sortedCollaborateurs = JSON.parse(sessionStorage.getItem('sortedCollaborateurs'));
            } else {
                this.sortedCollaborateurs = JSON.parse(sessionStorage.getItem('collaborateurs'));
            }
        } else {
            this.collaborateurService.query().subscribe(
                (collaborateurs: Collaborateur[]) => {
                    this.collaborateurs = collaborateurs;
                    this.collaborateurs.sort(this.dynamicSort('prenom'));
                    this.sortedCollaborateurs = collaborateurs;
                    sessionStorage.setItem('collaborateurs', JSON.stringify(collaborateurs));
                    sessionStorage.setItem('sortedCollaborateurs', JSON.stringify(collaborateurs));
                 }
            );
        }
    }

    calculateStyles(){
        this.isCritereActive = !this.isCritereActive;
        this.isFilterActive = !this.isFilterActive;
    }

    updateSelecledCollaborateur(collaborateur: Collaborateur) {
        this.collaborateur = collaborateur;
    }

    createCritere( competence: Competence) {
        if ( !this.isDoublon(competence)){
        /* Ajout critere */
        const critere = new Critere();
        critere.note  = 1;
        critere.competenceId = competence.id;
        critere.libelle = competence.libelle;
        this.criteres.push(critere);
        sessionStorage.setItem('criteres', JSON.stringify(this.criteres));
        /* Maj des collaborateurs */
        this.sortedCollaborateurs = this.updateSortedCollaborateurs(this.collaborateurs);
        this.updateEvaluateCollaborateur();
        sessionStorage.setItem('sortedCollaborateurs', JSON.stringify(this.sortedCollaborateurs));
        this.calculateStyles();
        }

    }

    deleteCritere(critere: Critere) {
        /* Suppression critere */
        const index = this.criteres.indexOf(critere);
        this.criteres.splice(index, 1);
        sessionStorage.setItem('criteres', JSON.stringify(this.criteres));
        /* Maj des collaborateurs */
        this.sortedCollaborateurs = this.updateSortedCollaborateurs(this.collaborateurs);
        this.updateEvaluateCollaborateur();
        sessionStorage.setItem('sortedCollaborateurs', JSON.stringify(this.sortedCollaborateurs));
        if (this.criteres.length == 0){
            this.calculateStyles();
        }
    }


    updateCritereNote(critere: Critere, note: number) {
        /* Maj note critere */
        critere.note = note;
        sessionStorage.setItem('criteres', JSON.stringify(this.criteres));
        /* Maj des collaborateurs */
        this.sortedCollaborateurs = this.updateSortedCollaborateurs(this.collaborateurs);
        this.updateEvaluateCollaborateur();
        sessionStorage.setItem('sortedCollaborateurs', JSON.stringify(this.sortedCollaborateurs));
    }

    private updateSortedCollaborateurs(collaborateurs: Collaborateur[]): Collaborateur[]  {
        return collaborateurs.filter(collaborateur => {
           return this.isAllCriteresValid(this.criteres, collaborateur.competenceAcquises);
        });
    }

    private updateEvaluateCollaborateur() {
        this.sortedCollaborateurs.forEach(
            collaborateur => {
                collaborateur.evaluations = new Array<Evaluation>();
                this.evaluate(collaborateur, this.criteres );
            }
        );
    }

    private isAllCriteresValid(criteres: Critere[], competenceAcquises: CompetenceAcquise[]): boolean  {
        let valid = true;
        criteres.forEach(critere => {
            if ( !this.isCritereValid( critere, competenceAcquises)) { valid = false; }
        });
        return valid;
    }

    private isCritereValid( critere: Critere, competenceAcquises: CompetenceAcquise[]): boolean {
        let valid = false;
        competenceAcquises.forEach( competenceAcquise => {
            if (competenceAcquise.competence.id === critere.competenceId && competenceAcquise.note >= critere.note) {
                valid = true;
            }
        });
        return valid;
    }

    private evaluate (collaborateur: Collaborateur, criteres: Critere[] ) {
        criteres.forEach(
            critere => {
                let note: number;
                let diff: number;
                collaborateur.competenceAcquises.forEach(
                    competenceAcquise => {
                        if (competenceAcquise.competence.id === critere.competenceId) {
                            note = competenceAcquise.note;
                            diff = competenceAcquise.note - critere.note;
                        }
                    }
                );
                collaborateur.evaluations.push( new Evaluation(note, diff, critere.competenceId, critere.libelle));
            }
        );
    }

    private isDoublon(competence: Competence): boolean {
        let doublon = false;
        this.criteres.forEach( critere => {
            if (critere.competenceId === competence.id ) {
                doublon = true;
            }
        });
        return doublon;
    }

    private dynamicSort(property) {
        let sortOrder = 1;
        if (property[0] === '-') {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a, b) {
            let result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        };
    }


}
