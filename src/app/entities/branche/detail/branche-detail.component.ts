import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Branche, BrancheDeleteDialogComponent, BrancheModalComponent, BrancheService } from '../';
import { Competence, CompetenceModalComponent} from '../../competence';
import { BsModalService} from 'ngx-bootstrap/modal';
import { BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
    selector: 'app-branche-detail',
    templateUrl: './branche-detail.component.html',
    providers: [BrancheService]
})
export class BrancheDetailComponent  {

    @Output() eventChangeBranche: EventEmitter<any> = new EventEmitter();
    @Input() branche:   Branche;
    @Input() branches:  Branche[];
    @Input() view =     'box';
    bsModalRef:         BsModalRef;

    constructor(
        private modalService: BsModalService,
        private brancheService: BrancheService) {
    }

    load(id) {
        this.brancheService.find(id).subscribe((branche) => {
            this.branche = branche;
        });
    }

    previousState() {
        window.history.back();
    }

    openCreateModal( ) {
        this.bsModalRef                 = this.modalService.show(BrancheModalComponent);
        this.bsModalRef.content.titre   = 'Création d\'une sous-branche';
        const newBranche                = new Branche();
        newBranche.brancheParenteId     = this.branche.id;
        this.bsModalRef.content.branche = newBranche;
        this.bsModalRef.content.isCreate.subscribe(result => {
            this.branche.sousBranches.push(result);
            this.branche.sousBranches.sort(this.sortbranche);
        });
    }

    openEditModal() {
        this.bsModalRef = this.modalService.show(BrancheModalComponent);
        this.bsModalRef.content.branche = this.branche;
        this.bsModalRef.content.titre = 'Edition de la branche : "' + this.branche.libelle + '"';
    }

    openDeleteModal() {
        this.bsModalRef = this.modalService.show(BrancheDeleteDialogComponent);
        this.bsModalRef.content.branche = this.branche;
        const index = this.branches.indexOf(this.branche);
        this.bsModalRef.content.isDelete.subscribe( () => {
            this.branches.splice(index, 1);
            this.eventChangeBranche.emit();
        });
    }

    openCreateCompetenceModal() {
        this.bsModalRef = this.modalService.show(CompetenceModalComponent);
        this.bsModalRef.content.titre = ' Création d\'une compétence';
        const competence = new Competence();
        competence.brancheParenteId = this.branche.id;
        this.bsModalRef.content.competence = competence;
        this.bsModalRef.content.isCreate.subscribe(result => {
            this.branche.competences.push(result);
            this.branche.competences.sort(this.sortCompetence);
            }
        );
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

}
