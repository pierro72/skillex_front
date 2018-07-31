import {Component, OnInit} from '@angular/core';
import {Branche, BrancheService} from './entities/branche/.';
import {IhniAccount, ContextService} from './shared';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import * as $ from 'jquery';
import {SERVER_IHNI_URL} from './app.constants';
import {QUB_HEADER_JS} from './app.constants';


declare var initQubHeader: any;

import {TranslateService} from '@ngx-translate/core';
import {Equipe, EquipeService} from './entities/equipe';
import {CollaborateurService} from './entities/collaborateur';
import {Competence} from './entities/competence';
import {AuthService} from './shared/auth/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [ContextService, AuthService]
})
export class AppComponent implements OnInit {
    public title = 'app';
    public ihniAccount: IhniAccount = new IhniAccount();
    public isConnected: boolean;
    constructor(
        private cookieService: CookieService,
        public authService: AuthService,
        public  contextService: ContextService,
        private translate: TranslateService,
        public  collaborateurService: CollaborateurService,
        public  brancheService: BrancheService,
        public  equipeService: EquipeService,
        public  http: HttpClient,
        private route: ActivatedRoute) {
        translate.setDefaultLang('fr');
    }

    public ngOnInit(): void {
        this.loadScript();
        this.isConnected    = this.contextService.connecte;

        this.contextService.change.subscribe(connected => {
            this.isConnected = connected;
            this.loadContext();
        });

        if (!this.isConnected) {
            this.creerCompteIhni();
        } else {
            this.ihniAccount = this.contextService.ihniAccount;
            this.loadContext();

        }


    }

    private loadContext() {
        this.chargerArbreDeCompetence();
        this.chargerEquipes();

/*        this.chargerEquipe();*/
/*        this.chargerCollaborateur();*/
    }

    private chargerArbreDeCompetence() {
        this.brancheService. query().subscribe(
            (branche) => {
                console.log(branche);
                this.contextService.branches = branche;
                this.trierBranche( this.contextService.branches);
            }
        );
    }
    
/*    private chargerEquipe() {
        this.equipeService.find( this.contextService.ihniAccount.id_team).subscribe(
            ( equipe: Equipe) => {
                this.contextService.equipeCourante      = equipe;
                this.contextService.equipeUtilisateur   = equipe;
                equipe.collaborateurs.forEach(collaborateur => {
                    if (collaborateur.id == this.ihniAccount.id_user) {
                        this.contextService.collaborateur = collaborateur;
                        this.contextService.contextLoad = true;
                    }
                });
            }
        );
    }*/
    
    
    private chargerEquipes() {
        this.equipeService.query().subscribe(
            (equipes: Equipe[]) => {
                this.contextService.equipes = equipes;
                this.contextService.contextLoad = true;
                this.loadQubHeaderInTemplate(this.ihniAccount);

/*                equipes.forEach( equipe => {
                    if (equipe.id == this.ihniAccount.id_team) {
                        this.contextService.equipeCourante      = equipe;
                        this.contextService.equipeUtilisateur   = equipe;
                        equipe.collaborateurs.forEach(collaborateur => {
                            if (collaborateur.id == this.ihniAccount.id_user) {
                                this.contextService.collaborateur = collaborateur;
                                this.contextService.contextLoad = true;
                            }
                        });
                    }
                });*/
            }
        );
    }

    private chargerCollaborateur() {
        this.collaborateurService.find(this.ihniAccount.id_user).subscribe(
            (collaborateur) => {
                this.contextService.collaborateur = collaborateur;
            }
        );
    }

    private creerCompteIhni() {
        /*FIXME:*/
        this.authService.authMe().subscribe(
            ( account)  => {
                const idTeam = parseInt(this.cookieService.get('ihni_context'), 10);
                this.ihniAccount.admin      = account['admin'];
                this.ihniAccount.id_user    = account['id'];
                this.ihniAccount.jobName    = account['jobName'];
                this.ihniAccount.id_team    = idTeam;
                this.ihniAccount.user       = account['prenom'] + ' ' + account['nom'];
                this.ihniAccount.appName    = 'Skillex';
                this.equipeService.find(idTeam).subscribe(
                    (equipe: Equipe) => {
                        this.contextService.equipeCourante      = equipe;
                        this.contextService.equipeUtilisateur   = equipe;
                        this.ihniAccount.team       = equipe.nom;
                        if ( equipe.pilote.id == account['id'] ) {
                            this.ihniAccount.role = 'pilote';
                        } else {
                            this.ihniAccount.role = 'collaborateur';
                        }
                        equipe.collaborateurs.forEach(collaborateur => {
                            if (collaborateur.id == this.ihniAccount.id_user) {
                                this.contextService.collaborateur = collaborateur;
                                this.contextService.ihniAccount = this.ihniAccount;
                            }
                        });
                    }
                );

        });
        
        
/*        this.route.queryParams.subscribe((params) => {
            if (params['id_user']) {
                const account = new IhniAccount(
                    params['apiKey'],
                    decodeURI(params['user']).replace(/\+/g, ' '),
                    params['id_user'],
                    params['admin'],
                    decodeURI(params['team']).replace(/\+/g, ' '),
                    params['id_team'],
                    params['role'],
                    params['appName']
                );
                if (account.isValid()) {
                    this.ihniAccount = account;
                    this.contextService.ihniAccount = account;
                } else {
                    this.ihniAccount = this.contextService.ihniAccount;
                }
            }
        });*/
    }
    
    
    private trierBranche( branches: Branche[]) {
        branches.sort(this.sortbranche);
        branches.forEach( (br) => {
            br.competences.sort(this.sortCompetence);
            this.trierBranche(br.sousBranches);
        });
    }

    private sortCompetence(c1: Competence, c2: Competence) {
        const a = c1.libelle.toLowerCase();
        const b = c2.libelle.toLowerCase();
        return a > b ? 1 : (a < b ? -1 : 0);
    }

    private sortbranche(b1: Branche, b2: Branche) {
        const a = b1.libelle.toLowerCase();
        const b = b2.libelle.toLowerCase();
        return a > b ? 1 : (a < b ? -1 : 0);
    }


    private loadQubHeaderInTemplate(ihniAccount: IhniAccount) {
        this.getQubHeader(ihniAccount);
        $('.main-header').html($('.qubHeader').html());
        $('.main-header').addClass('qubHeader');
        $('body>div.qubHeader').remove();
        this.contextService.qubLoad = true;
    }

    private getQubHeader(ihniAccount: IhniAccount): any {

        return initQubHeader(
            ihniAccount.appName, // A1
            ihniAccount.user, // PRENOM + NOM B2
            ihniAccount.id_user, // c3
            ihniAccount.admin, // d4
            ihniAccount.team, // NAME TEAM e5
            ihniAccount.id_team, // f6
            ihniAccount.jobName, // JOB g7
            '86834038aa3d', // h8
            SERVER_IHNI_URL, // j9
            'http://azr-cds-lemans-01.sodifrance.fr:8080/kiback'  // KI ADRESSE k10
        );
    }
    
    public loadScript() {
        let body = <HTMLDivElement> document.body;
        let script = document.createElement('script');
        script.innerHTML = '';
        script.src = QUB_HEADER_JS;
        script.async = true;
        script.defer = true;
        body.appendChild(script);
    }
}
