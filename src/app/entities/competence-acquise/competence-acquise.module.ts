import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {BrowserModule } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import {
    LibelleFilterPipe,
    CompetenceAcquiseMultiEditComponent,
    CompetenceAcquiseService,

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
        CompetenceAcquiseMultiEditComponent
    ],
    entryComponents: [
    ],
    providers: [
        CompetenceAcquiseService
    ],
    exports: [
        CompetenceAcquiseMultiEditComponent
    ],
})

export class CompetenceAcquiseModule {}
