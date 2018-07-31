import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import {
    TreeFilterPipe,
    TreeFilterPipe2,
    BrancheService,
    BrancheTreeComponent,
    BrancheDetailComponent,
    BrancheModalComponent,
    BrancheDeleteDialogComponent,
    brancheRoute
} from './';

const ENTITY_STATES = [
    ...brancheRoute,
];

@NgModule({
    imports: [
        TranslateModule.forChild(),
        CommonModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true }),
        FormsModule,
        BrowserModule
    ],
    declarations: [
        TreeFilterPipe,
        TreeFilterPipe2,
        BrancheTreeComponent,
        BrancheDetailComponent,
        BrancheDeleteDialogComponent,
        BrancheModalComponent,
    ],
    entryComponents: [
        BrancheTreeComponent,
        BrancheDeleteDialogComponent,
        BrancheModalComponent,
    ],
    providers: [
        BrancheService
    ],
    exports: [
        BrancheTreeComponent,
        BrancheDetailComponent
    ]
})
export class BrancheModule { }
