
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CompetenceRequiseModule } from '../competence-requise/competence-requise.module';
import { CompetenceAcquiseModule } from '../competence-acquise/competence-acquise.module';
import { EquipeService } from './';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CompetenceRequiseModule,
        CompetenceAcquiseModule
    ],
    providers: [
        EquipeService
    ],
    exports: [
    ]
})
export class EquipeModule { }
