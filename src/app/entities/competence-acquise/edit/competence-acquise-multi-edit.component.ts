import { Component, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { CompetenceAcquise, CompetenceAcquiseService } from '../';
import { Competence} from '../../competence';
import { AlertService } from '../../../alert';
import { TranslateService  } from '@ngx-translate/core';
import { Branche, BrancheService } from './../../../entities/branche/.';
import {ContextService} from '../../../shared';
import {  Equipe} from './../../../entities/equipe';
import {Collaborateur} from '../../collaborateur';

@Component({
    selector: 'app-competence-acquise-multi-edit',
    templateUrl: './competence-acquise-multi-edit.component.html',
    styleUrls: ['../competence-acquise.component.css'],
    providers: [
        CompetenceAcquiseService
    ]
})

export class CompetenceAcquiseMultiEditComponent implements  OnChanges, OnInit {
    @Input() public competenceToAdd: Competence;
    public branches: Branche[];
    public equipe: Equipe;
    public collaborateur: Collaborateur;

    constructor(
        public contextService: ContextService,
        public brancheService: BrancheService,
        public competenceAcquiseService: CompetenceAcquiseService,
        private alertService: AlertService,
        public translate: TranslateService) {}

    public ngOnInit(): void {
        // FIXME:
        this.collaborateur  = this.contextService.collaborateur;
        this.equipe         = this.contextService.equipeUtilisateur;
        this.branches       = this.contextService.branches;
        this.branches.forEach( branche => {
            this.initCollaborateurBranche(branche, this.collaborateur.competenceAcquises);
            }
        );
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes['competenceToAdd'] != undefined) {
            if (this.competenceToAdd) {
                if ( !this.isDoublon(this.competenceToAdd) ) {
                    this.create();
                } else {
                    this.translate.get('notif.competence.ajout.doublon', {value : this.competenceToAdd.libelle}).subscribe((message: string) => this.alertService.warn(message));
                }
            }
        }
    }

    public initCollaborateurBranche(branche: Branche, competenceAcquises: CompetenceAcquise[] ): Boolean{
        let isCollaborateur = false;
        /* Test competences */
        branche.competences.forEach( competence => {
            competenceAcquises.forEach(  competenceAcquise => {
                if (this.isCollaborateurCompetence(competence, competenceAcquise )) {
                    isCollaborateur = true;
                }
            });
        });
        /* Test branches */
        branche.sousBranches.forEach ( sousBranche => {
            if (this.initCollaborateurBranche(sousBranche, competenceAcquises)){
                isCollaborateur = true;
            }
        });
        branche.collaborateur = isCollaborateur;
        return branche.collaborateur;
    }

    private isCollaborateurCompetence (competence: Competence, competenceAcquises: CompetenceAcquise ): Boolean{
        return competence.id == competenceAcquises.competence.id;
    }



    private create() {
        const competenceAcquise = new CompetenceAcquise();
        competenceAcquise.collaborateurId = this.collaborateur.id;
        competenceAcquise.note  = 1;
        competenceAcquise.competence = this.competenceToAdd;
        this.competenceAcquiseService.create(  this.collaborateur.id, competenceAcquise).subscribe(
            succes  => {
                this.collaborateur.competenceAcquises.push(succes);
                this.branches.forEach( branche => {
                    this.initCollaborateurBranche(branche, this.collaborateur.competenceAcquises);
                    }
                );
                this.translate.get(
                    'notif.competence.ajout.succes',
                    {value : this.competenceToAdd.libelle}).subscribe((message: string) => this.alertService.info(message));
                 },
            (erreur)   =>  this.translate.get('notif.competence.ajout.erreur', {value : this.competenceToAdd.libelle}).subscribe((message: string) => this.alertService.error(message))
        );
    }



    /* FIXME: SUBSCRIBE !!!!!!!!!!!!!!!!!!!!!!!!!! */
    private delete(competenceAcquise: CompetenceAcquise) {
        const index = this.collaborateur.competenceAcquises.indexOf(competenceAcquise);
        this.competenceAcquiseService.delete( competenceAcquise.id).subscribe(
            ()  => {
                this.collaborateur.competenceAcquises.splice(index, 1);
                this.branches.forEach( branche => {
                    this.initCollaborateurBranche(branche, this.collaborateur.competenceAcquises);
                    }
                );
                this.translate.get(
                    'notif.competence.sup.succes',
                    {value : competenceAcquise.competence.libelle}).subscribe((message: string) => this.alertService.info(message));
             },
            (erreur)   => this.translate.get(
                'notif.competence.sup.erreur',
                {value : competenceAcquise.competence.libelle}).subscribe((message: string) => this.alertService.error(message))
        );
    }

    private updateNote(competenceAcquise: CompetenceAcquise, note: number) {
        competenceAcquise.note = note;
        this.competenceAcquiseService.update( this.collaborateur.id, competenceAcquise).subscribe(
            ()      => console.log('ok'),
            erreur  => this.translate.get('notif.competence.eval.erreur', {value : competenceAcquise.competence.libelle}).subscribe((message: string) => this.alertService.error(message))
        );
    }

    private isDoublon(competence: Competence): boolean {
        let doublon = false;
        this.collaborateur.competenceAcquises.forEach( competenceAcquise => {
            if (competenceAcquise.competence.id === competence.id ) {
                doublon = true;
            }
        });
        return doublon;
    }

    private cssClassRow(lvl: any) {
        if (!lvl) {
            return;
        }
        switch (lvl) {
            case 1: return 'cat1Row';
            case 2: return 'cat2Row';
            case 3: return 'cat3Row';
        }
    }

    private cssClassTh(lvl: any) {
        if (!lvl) {
            return;
        }
        switch (lvl) {
            case 1: return 'th1';
            case 2: return 'th2';
            case 3: return 'th3';
        }
    }


}


