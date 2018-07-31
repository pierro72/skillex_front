import { Component, Input } from '@angular/core';
import { Collaborateur} from '../';


@Component({
  selector: 'app-collaborateur-card',
  templateUrl: './collaborateur-card.component.html',
  styleUrls: ['../collaborateur.component.css']
})
export class CollaborateurCardComponent   {
    
    collaborateur: Collaborateur;
    @Input() collaborateurs: Collaborateur[];

    constructor() {
    }
}


