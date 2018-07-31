import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Observable } from 'rxjs/Rx';
import { Competence, CompetenceService } from '../.';
import { Subject } from 'rxjs/Subject';
import { AlertService } from '../../../alert';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-competence-modal',
    templateUrl: './competence-modal.component.html',
})
export class CompetenceModalComponent implements OnInit {

    isSaving:           boolean;
    competence:         Competence;
    titre:              string;
    public isCreate:    Subject<Competence>;

    constructor (
        private translate: TranslateService,
        public bsModalRef: BsModalRef,
        public competenceService: CompetenceService,
        private alertService: AlertService
    ) {}


    ngOnInit() {
        this.competence = new Competence();
        this.isSaving   = false;
        this.isCreate   = new Subject();
    }

    save() {
        this.isSaving = true;
        if (this.competence.id !== undefined) {
            this.subscribeToSaveResponse( this.competenceService.update(this.competence));
        } else {
            this.subscribeToSaveResponse( this.competenceService.create(this.competence));
        }
    }

    private subscribeToSaveResponse(result: Observable<Competence>) {
        result.subscribe(
            (res)  => {this.onSaveSuccess(res); },
            (res)  => {this.onSaveError(res); },
            ()  => {this.bsModalRef.hide(); }
        );
   }

    private onSaveSuccess(result: Competence) {
        this.isSaving = false;
        this.isCreate.next(result);
        this.translate.get('notif.admin.competence.ajout.succes', {value : result.libelle}).subscribe((message: string) => this.alertService.success(message));
    }

    private onSaveError(result) {
        this.isSaving = false;
        this.translate.get('notif.admin.competence.ajout.erreur', {value : result.libelle}).subscribe((message: string) => this.alertService.error(message));
    }

}
