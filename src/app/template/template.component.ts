import { Component, OnInit, OnDestroy } from '@angular/core';
import {ContextService} from '../shared';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
})
export class TemplateComponent implements OnInit, OnDestroy {

    constructor( public contextService: ContextService){}

    bodyClasses = 'skin-blue sidebar-mini';
    body: HTMLBodyElement = document.getElementsByTagName('body')[0];

    ngOnInit() {
        // add the the body classes
        this.body.classList.add('skin-blue');
        this.body.classList.add('sidebar-mini');
    }

    ngOnDestroy() {
        // remove the the body classes
        this.body.classList.remove('skin-blue');
        this.body.classList.remove('sidebar-mini');
    }

}
