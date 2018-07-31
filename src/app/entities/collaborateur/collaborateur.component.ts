import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Collaborateur, CollaborateurService} from './';


@Component({
  selector: 'app-collaborateur',
  templateUrl: './collaborateur.component.html',
  styleUrls: ['./collaborateur.component.css']
})
export class CollaborateurComponent implements OnInit, OnChanges {
    collaborateur: Collaborateur;
    bsModalRef: BsModalRef;
    @Input() collaborateurs: Collaborateur[];
    @Input() equipeId= 6;
    @Input() view= 'box';

    constructor(
        public collaborateurService: CollaborateurService) {
    }

    loadAll() {
        this.collaborateurService.query().subscribe(
            (collaborateurs: Collaborateur[]) => this.collaborateurs = collaborateurs
        );
    }

    loadForEquipe(equipeId) {
        /* const params = new HttpParams().set('equipeId.equals', equipeId); */
        this.collaborateurService.query().subscribe(
            (collaborateurs: Collaborateur[]) => this.collaborateurs = collaborateurs
        );
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['collaborateurs']) {
        }
    }

    ngOnInit() {
        if ( !this.collaborateurs) {
            if ( this.equipeId) {
                this.loadForEquipe(this.equipeId);
            }
            this.loadAll();
        }
    }

}


