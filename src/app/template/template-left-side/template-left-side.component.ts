import { Component } from '@angular/core';
import { IhniAccount, ContextService } from '../../shared/index';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { VERSION, APP_NAME } from '../../app.constants';


@Component({
  selector: 'app-template-left-side',
  templateUrl: './template-left-side.component.html',
  styleUrls: ['./template-left-side.component.css'],
  providers: []
})
export class TemplateLeftSideComponent implements OnInit {

    public ihniAccount: IhniAccount;
    public version = VERSION;
    public appName = APP_NAME;


    constructor( public contextService : ContextService) {}

    ngOnInit(): void {
        this.ihniAccount = this.contextService.ihniAccount;

    }



}
