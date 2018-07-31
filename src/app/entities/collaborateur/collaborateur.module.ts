import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CompetenceAcquiseModule } from '../competence-acquise/competence-acquise.module';
import { FormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';

import {
    CompetenceFilterPipe,
    NameFilterPipe,
    CollaborateurService,
    CollaborateurComponent,
    CollaborateurDetailComponent,
    CollaborateurCardComponent,
    collaborateurRoute
} from './';

const ENTITY_STATES = [
    ...collaborateurRoute,
];

@NgModule({
    imports: [
        TranslateModule.forChild(),
        CommonModule,
        CompetenceAcquiseModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true }),
        FormsModule,
        BrowserModule
    ],
    declarations: [
        CompetenceFilterPipe,
        NameFilterPipe,
        CollaborateurComponent,
        CollaborateurDetailComponent,
        CollaborateurCardComponent
    ],
    entryComponents: [
        CollaborateurComponent,
        CollaborateurCardComponent
    ],
    providers: [
        CollaborateurService
    ],
    exports: [
        CollaborateurComponent,
        CollaborateurCardComponent
    ]
})
export class CollaborateurModule { }
