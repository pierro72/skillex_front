import { Competence } from './../entities/competence';
import { Branche, BrancheService } from './../entities/branche/.';
import { Component, OnInit } from '@angular/core';
import { AlertService } from '../alert';
import {ContextService} from '../shared';


@Component({
    selector: 'app-administration-main',
    providers: [],
    templateUrl: './administration.component.html',
    styleUrls: ['./administration.component.css'],
})
export class AdministrationComponent implements OnInit {
    maskRightPanel:     boolean;
    isShowBranche:      boolean;

    selectedBranches:   Branche[];
    selectedCompetences: Competence[];
    selectedBranche:    Branche = new Branche();
    selectedCompetence: Competence = new Competence();

    constructor (
        public contextService: ContextService,
        public brancheService: BrancheService,
        private alertService: AlertService

    ) {}


    ngOnInit() {
        this.maskRightPanel = true;
        this.isShowBranche  = true;
    }

    updateSelectedBranche(branche: Branche, branches: Branche[]) {
        this.selectedBranches = branches;
        this.selectedBranche = branche;
        this.isShowBranche = true;
        this.maskRightPanel = false;
    }

    updateSelectedCompetence(competence: Competence, competences: Competence[]) {
        this.selectedCompetences = competences;
        this.selectedCompetence = competence;
        this.isShowBranche = false;
        this.maskRightPanel = false;
    }

    /* FIXME: Solution simple mais pas optimisé */
    /* lors de suppression de competence : appel API et recharge toutes les branches et compétences */
    reloadAfterChange(): void {
        this.maskRightPanel = true;
/*         this.chargementArbre(); */
    }



}
