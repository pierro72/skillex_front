import { Subject } from 'rxjs/Subject';
import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { AlertService } from '../../../alert';
import { Branche, BrancheService } from '../.';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-branche-delete-dialog',
    templateUrl: './branche-delete-dialog.component.html'
})
export class BrancheDeleteDialogComponent implements  OnInit {

    branche: Branche;
    public isDelete: Subject<boolean>;

    constructor(
        private translate: TranslateService,
        private brancheService: BrancheService,
        public bsModalRef: BsModalRef,
        private alertService: AlertService
    ) {
    }
    ngOnInit(): void {
        this.isDelete = new Subject();
    }

    confirmDelete(id: number): void {
        this.brancheService.delete(id).subscribe(
            (res)    => {
                this.translate.get('notif.admin.branche.sup.succes', {value : id}).subscribe((message: string) => this.alertService.success(message));
                this.isDelete.next(true);
             },
            (res)   => {
                this.translate.get(
                    'notif.admin.branche.sup.erreur', {value : id})
                        .subscribe((
                            message: string) => {
                                this.alertService.error(message);
                                console.log(res);
                            });
                this.bsModalRef.hide();
            },
            ()      => { this.bsModalRef.hide(); }
        );
    }

}

