import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { Competence, CompetenceDeleteDialogComponent, CompetenceService, CompetenceModalComponent} from '../';
import { BsModalService} from 'ngx-bootstrap/modal';
import { BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';


@Component({
    selector: 'app-competence-detail',
    templateUrl: './competence-detail.component.html',
    providers: [CompetenceService]
})
export class CompetenceDetailComponent implements OnInit {


    @Output() eventDeleteCompetence: EventEmitter<any> = new EventEmitter();
    @Input() competence: Competence;
    @Input() competences: Competence[];
    @Input() view: string;
    bsModalRef: BsModalRef;
    private subscription: Subscription;

    constructor(
        private modalService: BsModalService,
        private competenceService: CompetenceService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        if (!this.competence) {
            this.subscription = this.route.params.subscribe( (params) => {this.load(params['id']); });
        }
    }

    load(id) {
        this.competenceService.find(id).subscribe((competence) => {
            this.competence = competence;
        });
    }
    previousState() {
        window.history.back();
    }

    openEditModal() {
        this.bsModalRef = this.modalService.show(CompetenceModalComponent);
        this.bsModalRef.content.competence = this.competence;
        this.bsModalRef.content.titre = 'Edition de la competence : "' + this.competence.libelle + '"';
    }

    openDeleteModal() {
        this.bsModalRef = this.modalService.show(CompetenceDeleteDialogComponent);
        this.bsModalRef.content.competence = this.competence;
        const index = this.competences.indexOf(this.competence);
        this.bsModalRef.content.isDelete.subscribe( () => {
            this.competences.splice(index, 1);
            this.eventDeleteCompetence.emit();
        });
    }
}
