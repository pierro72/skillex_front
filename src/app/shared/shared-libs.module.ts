
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import {  NgModule } from '@angular/core';



@NgModule({
    imports: [
        FormsModule,
    ],
    exports: [
        HttpModule,
        CommonModule,
        FormsModule,
        HttpClientModule,
        TranslateModule
    ]
})
export class SharedLibsModule {

}

