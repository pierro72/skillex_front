import { Component, Input, OnChanges, SimpleChanges , OnInit} from '@angular/core';
import { CompetenceRequise, CompetenceRequiseService} from '../';
import { Competence} from '../../competence';
import { AlertService } from '../../../alert';
import { TranslateService } from '@ngx-translate/core';
import { Branche, BrancheService } from './../../../entities/branche/.';
import {ContextService} from '../../../shared';
import {Equipe} from '../../equipe';


@Component({
    selector: 'app-competence-requise-multi-edit',
    templateUrl: './competence-requise-multi-edit.component.html',
    providers: [
        CompetenceRequiseService
    ]
})
export class CompetenceRequiseMultiEditComponent implements OnChanges, OnInit  {
    @Input() competenceToAdd: Competence;
    public equipe: Equipe;
    public branches: Branche[];

    constructor(
        public contextService: ContextService,
        public brancheService: BrancheService,
        public competenceRequiseService: CompetenceRequiseService,
        private alertService: AlertService,
        public translate: TranslateService) {}

        ngOnInit(): void {
            this.equipe = this.contextService.equipeUtilisateur;
            this.branches = this.contextService.branches;
            this.branches.forEach( branche => {
                this.initEquipeBranche(branche, this.equipe.competenceRequises);
                }
            );
        }

    ngOnChanges(changes: SimpleChanges): void {
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

    public initEquipeBranche(branche: Branche, competenceRequises: CompetenceRequise[] ): Boolean {
        let isEquipe = false;
        /* Test competences */
        branche.competences.forEach( competence => {
            competenceRequises.forEach( competenceRequise => {
                if ( this.isEquipeCompetence(competence, competenceRequise )) {
                    isEquipe = true;
                }
            });
        });
        /* Test branches */
        branche.sousBranches.forEach ( sousBranche => {
            if (this.initEquipeBranche(sousBranche, competenceRequises)) {
                isEquipe = true;
            }
        });
        branche.equipe = isEquipe;
        return branche.equipe;
    }

    isEquipeCompetence (competence: Competence, competenceRequise: CompetenceRequise ): Boolean {
        return competence.id == competenceRequise.competence.id;
    }

    create() {
        const competenceRequise = new CompetenceRequise();
        competenceRequise.equipeId = this.contextService.ihniAccount.id_team;
        competenceRequise.note  = 1;
        competenceRequise.competence = this.competenceToAdd;
        this.competenceRequiseService.create( this.contextService.ihniAccount.id_team, competenceRequise).subscribe(
            (succes)      => {
                this.equipe.competenceRequises.push(succes);
                this.branches.forEach( branche => {
                    this.initEquipeBranche(branche, this.equipe.competenceRequises);
                    }
                );
                this.translate.get(
                    'notif.competence.ajout.succes',
                    {value : this.competenceToAdd.libelle}).subscribe((message: string) => this.alertService.info(message));
             },
            (erreur)   =>  this.translate.get('notif.competence.ajout.erreur', {value : this.competenceToAdd.libelle}).subscribe((message: string) => this.alertService.error(message))
        );
    }
    delete(competenceRequise: CompetenceRequise) {
        const index = this.equipe.competenceRequises.indexOf(competenceRequise);
        this.competenceRequiseService.delete( competenceRequise.id).subscribe(
            ()  => {
                this.equipe.competenceRequises.splice(index, 1);
                this.branches.forEach( branche => {
                    this.initEquipeBranche(branche, this.equipe.competenceRequises);
                    }
                );
                this.translate.get('notif.competence.sup.succes', {value : competenceRequise.competence.libelle}).subscribe((message: string) => this.alertService.info(message));
            },
            (erreur)   => this.translate.get('notif.competence.sup.erreur', {value : competenceRequise.competence.libelle}).subscribe((message: string) => this.alertService.error(message))
        );
    }

    updateNote(competenceRequise: CompetenceRequise, note: number) {
        competenceRequise.note = note;
        this.competenceRequiseService.update( this.contextService.ihniAccount.id_team, competenceRequise).subscribe(
            ()  => console.log('ok'),
            erreur  => this.translate.get('notif.competence.eval.erreur', {value : competenceRequise.competence.libelle}).subscribe((message: string) => this.alertService.error(message))
        );
    }

    isDoublon(competence: Competence): boolean {
        let doublon = false;
        this.equipe.competenceRequises.forEach( competenceRequises => {
            if (competenceRequises.competence.id === competence.id ) {
                doublon = true;
            }
        });
        return doublon;
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


}


