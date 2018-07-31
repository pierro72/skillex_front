import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Competence, CompetenceService } from '../.';
import { Subject } from 'rxjs/Subject';
import { AlertService } from '../../../alert';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-competence-delete-dialog',
    templateUrl: './competence-delete-dialog.component.html'
})
export class CompetenceDeleteDialogComponent implements OnInit {

    competence: Competence;
    public isDelete: Subject<boolean>;

    constructor(
        private translate: TranslateService,
        private alertService: AlertService,
        private competenceService: CompetenceService,
        public bsModalRef: BsModalRef,
    ) {
    }

    ngOnInit(): void {
        this.isDelete = new Subject();
    }

    // FIXME:
    confirmDelete(id: number): void {
        this.competenceService.delete(id).subscribe(
            ()   => { 
                this.isDelete.next(true);
                this.translate.get('notif.admin.competence.sup.succes', {value : id}).subscribe((message: string) => this.alertService.success(message));
             },
            (res)   => {
                this.translate.get('notif.admin.competence.sup.erreur', {value : id}).subscribe((message: string) => this.alertService.error(message));
/*                 this.alertService.errorformate(res) */
                this.bsModalRef.hide();
            },
            ()   => { this.bsModalRef.hide(); }
        );
    }

}

