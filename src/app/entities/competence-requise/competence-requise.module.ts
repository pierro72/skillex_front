
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {BrowserModule } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import {
    LibelleFilterPipe,
    CompetenceRequiseMultiEditComponent,
    CompetenceRequiseService,
} from './';



@NgModule({
    imports: [
        TranslateModule.forChild(),
        CommonModule,
        FormsModule,
        BrowserModule
    ],
    declarations: [
        LibelleFilterPipe,
        CompetenceRequiseMultiEditComponent
    ],
    entryComponents: [
    ],
    providers: [
        CompetenceRequiseService
    ],
    exports: [
        CompetenceRequiseMultiEditComponent
    ]
})

export class CompetenceRequiseModule {}
