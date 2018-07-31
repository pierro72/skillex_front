import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Observable } from 'rxjs/Rx';
import { Branche, BrancheService } from '../.';
import { Subject } from 'rxjs/Subject';
import { AlertService} from '../../../alert'
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-branche-modal',
    templateUrl: './branche-modal.component.html',

})
export class BrancheModalComponent implements OnInit {

    isCreate:    Subject<Branche>;
    isSaving:           boolean;
    branche:            Branche;
    titre:              string;

    constructor (
        private translate: TranslateService,
        public bsModalRef: BsModalRef,
        public brancheService: BrancheService,
        private alertService : AlertService
    ) {}

    ngOnInit() {
        this.branche = new Branche();
        this.isSaving = false;
        this.isCreate   = new Subject();
    }

    save() {
        this.isSaving = true;
        if (this.branche.id !== undefined) {
            this.subscribeToSaveResponse( this.brancheService.update(this.branche));
        } else {
            this.subscribeToSaveResponse( this.brancheService.create(this.branche));
        }
    }

    private subscribeToSaveResponse(result: Observable<Branche>) {
        result.subscribe(
            (res: Branche)  => {this.onSaveSuccess(res); },
            (res)  => {this.onSaveError(res); },
            ()  => {this.bsModalRef.hide(); }
        );
   }

    private onSaveSuccess(result: Branche) {
        this.branche = result;
        this.isSaving = false;
        this.isCreate.next(this.branche);
        this.translate.get('notif.admin.branche.ajout.succes', {value : result.libelle}).subscribe((message: string) => this.alertService.success(message));
    }

    private onSaveError(result) {
        this.translate.get('notif.admin.branche.ajout.erreur', {value : result.libelle}).subscribe((message: string) => this.alertService.error(message));
        this.isSaving = false;
    }
}
