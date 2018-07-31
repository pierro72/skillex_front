import { NgModule } from "@angular/core";
import { AlertComponent, AlertService} from './';
import { CommonModule } from '@angular/common';  


@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        AlertComponent
    ],
    providers: [
        AlertService
    ],
    exports: [
        AlertComponent
    ]
})

export class AlertModule { }