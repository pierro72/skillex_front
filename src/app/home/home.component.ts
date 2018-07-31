import { Component, OnInit } from '@angular/core';
import { IhniAccount, ContextService  } from '../shared';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: []
})
export class HomeComponent {
    constructor( public contextService: ContextService) {}


}

