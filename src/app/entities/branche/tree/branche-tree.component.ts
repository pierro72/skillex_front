import { Competence } from './../../competence';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit, Input, Output, EventEmitter, } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
/* import { ITEMS_PER_PAGE } from '../../../shared/constants/pagination.constants'; */
import { Branche, BrancheService, BrancheModalComponent, BrancheDeleteDialogComponent} from '../.';
import {ContextService} from '../../../shared';



@Component({
  selector: 'app-branche',
  templateUrl: './branche-tree.component.html',
  styleUrls: ['branche-tree.component.css']
})
export class BrancheTreeComponent implements OnInit {

    // Evenements
    @Output() eventClickBranche: EventEmitter<any> = new EventEmitter();
    @Output() eventClickCompetence: EventEmitter<any> = new EventEmitter();

    @Input() branches: Branche[];
    @Input() view: string;
    @Input() searchText: string;
    branche: Branche;
    bsModalRef: BsModalRef;

    constructor(
        public contextService: ContextService,
        private modalService: BsModalService,
        public brancheService: BrancheService) {
    }

    ngOnInit() {
        if ( !this.branches) {
            this.branches = this.contextService.branches; }
    }
    

    /* FIXME: */
    clickBranche( branche: Branche, branches: Branche[]) {
        this.eventClickBranche.emit({branche, branches});
    }

    /* FIXME: */
    clickCompetence( competence: Competence, competences: Competence[]) {
        this.eventClickCompetence.emit({competence, competences});
    }

    openCreateModal(parentId: number) {
        this.bsModalRef = this.modalService.show(BrancheModalComponent);
        this.bsModalRef.content.titre = ' Création d\'une branche';
        const branche = new Branche();
        branche.brancheParenteId = parentId;
        this.bsModalRef.content.branche = branche;
    }

    openEditModal(id: number) {
        this.bsModalRef = this.modalService.show(BrancheModalComponent);
        this.bsModalRef.content.branches = this.branches;
        this.brancheService.find(id).subscribe( (branche: Branche) => this.bsModalRef.content.branche = branche);
        this.bsModalRef.content.titre = 'Edition de la branche ' + id;
    }

    openDeleteModal(id: number) {
        this.bsModalRef = this.modalService.show(BrancheDeleteDialogComponent);
        this.bsModalRef.content.branches = this.branches;
        this.brancheService.find(id).subscribe( (branche: Branche) => this.bsModalRef.content.branche = branche);
        this.bsModalRef.content.titre = 'Edition de la branche ' + id;
    }
}


