import { Component, OnInit, Input } from '@angular/core';
import { IhniAccount } from '../../shared/index';
import {ContextService} from '../../shared';
declare var AdminLTE: any;

@Component({
  selector: 'app-template-content',
  templateUrl: './template-content.component.html',
  styleUrls: ['./template-content.component.css']
})
export class TemplateContentComponent implements OnInit {
    @Input()  ihniAccount: IhniAccount;

    constructor( public contextService: ContextService) {}

      ngOnInit() {
        AdminLTE.init();
      }

}
