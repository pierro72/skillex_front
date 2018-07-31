import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { CollaborateurService, Collaborateur} from '../';
import { CompetenceAcquise, CompetenceAcquiseService } from '../../competence-acquise';
import { Competence} from '../../competence';
import {Location} from '@angular/common';
import { Branche, BrancheService } from './../../../entities/branche/.';
import {ContextService} from '../../../shared';


@Component({
    selector: 'app-collaborateur-detail',
    templateUrl: './collaborateur-detail.component.html',
    providers: [CollaborateurService],
    styleUrls: ['../collaborateur.component.css']
})
export class CollaborateurDetailComponent implements OnInit, OnDestroy {

    collaborateur: Collaborateur;
    private subscription: Subscription;
    branches: Branche[];

    constructor(
        public contextService: ContextService,
        public brancheService: BrancheService,
        private _location: Location,
        private collaborateurService: CollaborateurService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.branches = this.contextService.branches;
        this.subscription = this.route.params.subscribe((params) => { this.load(params['id']); });

    }

    load(id) {
        this.collaborateurService.find(id).subscribe((collaborateur) => {
            this.collaborateur = collaborateur;
            this.branches.forEach( branche => {
                this.initCollaborateurBranche(branche, this.collaborateur.competenceAcquises);
                }
            )
        });
    }

    public initCollaborateurBranche(branche: Branche, competenceAcquises: CompetenceAcquise[] ): Boolean{
        let isCollaborateur = false;
        /* Test competences */
        branche.competences.forEach( competence => {
            competenceAcquises.forEach(  competenceAcquise =>{
                if (this.isCollaborateurCompetence(competence,competenceAcquise )) {
                    isCollaborateur = true;
                }
            })
        });
        /* Test branches */
        branche.sousBranches.forEach ( sousBranche =>{
            if (this.initCollaborateurBranche(sousBranche, competenceAcquises)){
                isCollaborateur = true;
            }
        })
        branche.collaborateur = isCollaborateur;
        return branche.collaborateur;
    }

    isCollaborateurCompetence (competence :Competence, competenceAcquises: CompetenceAcquise ) : Boolean{
        return competence.id == competenceAcquises.competence.id
    }


    previousState() {
        this._location.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
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
