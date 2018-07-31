import { Component, OnInit } from '@angular/core';
import { Competence } from '../entities/competence';
import { CompetenceRequise } from '../entities/competence-requise';
import { CompetenceAcquise } from '../entities/competence-acquise';
import { Branche, BrancheService } from '../entities/branche';
import { Evaluation, ContextService } from '../shared';
import { Collaborateur } from '../entities/collaborateur';
import { EquipeService, Equipe} from '../entities/equipe';
import {  IhniAccount  } from '../shared';

@Component({
  selector: 'app-matrice',
  templateUrl: './matrice.component.html',
  styleUrls: ['./matrice.component.css'],
  providers: []
})

export class MatriceComponent implements OnInit {

    public equipes: Equipe[];
    public branches: Branche[];
    public equipeCourante: Equipe;
    public equipeSelect: Equipe;
    
    public equipeUtilisateur: Equipe;
    public vue: string;
    public isRequiredShow: boolean;
    public isHideNote: boolean;
    public ihniAccount: IhniAccount;
    public equipeCouranteBranches: Branche[];
    public levelMax: number;

    constructor (
        public brancheService: BrancheService,
        public equipeService: EquipeService,
        public contextService: ContextService
    ) {
    }

    ngOnInit(): void {
        this.levelMax       = 3;
        this.vue            = 'simple';
        this.isHideNote     = false;
        this.isRequiredShow = true;
        this.chargerContexte();
        this.updateMatrice( this.equipeCourante );
    }

    private chargerContexte( ) {
        this.ihniAccount        = this.contextService.ihniAccount;
        this.equipes            = this.contextService.equipes;
        this.branches           = this.contextService.branches;
        this.equipeUtilisateur  = this.contextService.equipeUtilisateur;
        this.equipeCourante     = this.contextService.equipeCourante;
        this.contextService.equipes.filter(
            equipe => {
                if ( equipe.id == this.equipeCourante.id){
                    this.equipeSelect = equipe;
                }
            }
        );
    }

    cssClassRow(lvl: any) {
        if (!lvl) {
            return;
        }
        switch (lvl) {
            case 1: return 'cat1Row';
            case 2: return 'cat2Row';
            case 3: return 'cat3Row';
        }
    }

    cssClassTh(lvl: any) {
        if (!lvl) {
            return;
        }
        switch (lvl) {
            case 1: return 'th1';
            case 2: return 'th2';
            case 3: return 'th3';
        }
    }


    createArbreEquipe(equipe: Equipe) {
        this.equipeCouranteBranches = JSON.parse(JSON.stringify(this.branches));
        this.equipeCouranteBranches .filter(
            branche => { this.isTeamBranche( branche, equipe, 0); }
        );
        this.contextService.equipeCouranteBranches = this.equipeCouranteBranches;
    }

    updateMatrice(equipe: Equipe) {
        this.equipeService.find(equipe.id).subscribe(
            (e: Equipe) => {
                this.equipeCourante =  e;
                this.createArbreEquipe(e);
                this.equipeCouranteBranches .filter(
                    branche => { this.isTeamBranche( branche, e, 0); }
                );
                this.contextService.equipeCouranteBranches = this.equipeCouranteBranches;
                this.equipeCourante.collaborateurs.forEach(collaborateur => {
                    collaborateur.evaluations = this.getAllNoteForCollaborateur( collaborateur, this.equipeCourante.competenceRequises);
                });
            });
    }

    updateVue(vue: string) {
        this.vue = vue;
    }

    
    isTeamBranche( branche: Branche, equipe: Equipe, level: number ) {
        let isTeam = false;
        level += 1 ;
        branche.sousBranches = branche.sousBranches.filter(
            sousBranche => this.isTeamBranche(sousBranche, equipe, level )
        );
        branche.competences = branche.competences.filter(
            competence => this.isTeamCompetence(competence, equipe)
        );
        if ( level >= this.levelMax) {
             branche.sousBranches.map(
                 sousBranche =>  {
                    branche.competences = branche.competences.concat(this.getCompetenceBranche(sousBranche) ) ;
                }
            );
            branche.sousBranches = [];
        }
        if ( branche.competences.length > 0 || branche.sousBranches.length > 0 ) {
            isTeam = true;
        }
        return isTeam;
    }

    getCompetenceBranche( branche: Branche): Competence[] {
        if (branche.sousBranches) {
            const competenceBranches = branche.sousBranches.map(
                sousBranche => { branche.competences = branche.competences.concat(this.getCompetenceBranche(sousBranche));
                }
            );
        }
        return branche.competences;
    }

    isTeamCompetence( competence: Competence, equipe: Equipe ): boolean {
        let isTeam = false;
        equipe.competenceRequises.forEach( function(competenceRequise) {
            if (competenceRequise.competence.id === competence.id) {
                isTeam = true;
            }
        });
        return isTeam;
    }


    // Retourne notes collaborateurs sur les competences equipes
    private getAllNoteForCollaborateur( collaborateur: Collaborateur, competenceRequises: CompetenceRequise[]) {
        const evaluations = new Array<Evaluation>();
        competenceRequises.forEach(competenceRequise =>
            evaluations.push( this.getNoteForCompetenceRequise( competenceRequise, collaborateur.competenceAcquises ))
            );
        return evaluations;
    }

    // Retourne evaluation sur une competence equipe
    private getNoteForCompetenceRequise( competenceRequise: CompetenceRequise, competenceAcquises: CompetenceAcquise[]): Evaluation  {
        const evaluation = new Evaluation(0, 0, competenceRequise.competence.id);
        competenceAcquises.forEach( function(competenceAcquise) {
            if (competenceAcquise.competence.id === competenceRequise.competence.id) {
                evaluation.note = competenceAcquise.note;
            }
        });
        evaluation.difference = evaluation.note - competenceRequise.note;
        return evaluation;
    }

    private PrintRecord() {
        const divToPrint = document.getElementById('matrice');
        const popupwindow = window.open();
        popupwindow.document.write(`<html> ${$('head').clone().html()} ${divToPrint.outerHTML}</body></html>`);
        popupwindow.document.close();
        popupwindow.focus();
        setTimeout(function() {
            popupwindow.print();
            popupwindow.close();
        }, 250);
    }
}
