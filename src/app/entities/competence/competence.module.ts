import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
    CompetenceService,
    CompetenceDetailComponent,
    CompetenceModalComponent,
    CompetenceDeleteDialogComponent,
} from './';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
    imports: [
        TranslateModule.forChild(),
        CommonModule,
        FormsModule
    ],
    declarations: [
        CompetenceDetailComponent,
        CompetenceDeleteDialogComponent,
        CompetenceModalComponent,
    ],
    entryComponents: [
        CompetenceDeleteDialogComponent,
        CompetenceModalComponent,
    ],
    providers: [
        CompetenceService
    ],
    exports: [
        CompetenceDetailComponent
    ]
})
export class CompetenceModule { }
