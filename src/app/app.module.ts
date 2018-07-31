import { LOCALE_ID, NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
/*import { TokenInterceptor } from './shared/auth/token.interceptor';*/
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';

/*  ******************************************************  */
/*        Imports des composant partagés      */
/*  ******************************************************  */
import { SharedLibsModule } from './shared/shared-libs.module';
import { AlertModule} from './alert/alert.module';

/*  ******************************************************  */
/*        Imports des composant metier      */
/*  ******************************************************  */
import { BrancheModule } from './entities/branche/branche.module';
import { CompetenceModule } from './entities/competence/competence.module';
import { CompetenceAcquiseModule } from './entities/competence-acquise/competence-acquise.module';
import { CompetenceRequiseModule } from './entities/competence-requise/competence-requise.module';
import { EquipeModule } from './entities/equipe/equipe.module';
import { CollaborateurModule } from './entities/collaborateur/collaborateur.module';

/*  ******************************************************  */
/*        Imports des composant fonction     */
/*  ******************************************************  */
import { TemplateComponent } from './template/template.component';
import { TemplateHeaderComponent } from './template/template-header/template-header.component';
import { TemplateLeftSideComponent } from './template/template-left-side/template-left-side.component';
import { TemplateContentComponent } from './template/template-content/template-content.component';
import { InfoModule } from './info/info.module';
import { HomeComponent } from './home/home.component';
import { RechercheCollaborateurComponent} from './recherche-collaborateur/recherche-collaborateur.component';
import { MatriceComponent} from './matrice/matrice.component';
import { GestionCompetenceAcquiseComponent} from './gestion-competence-acquise/gestion-competence-acquise.component';
import { GestionCompetenceRequiseComponent} from './gestion-competence-requise/gestion-competence-requise.component';
import { AdministrationComponent } from './administration/administration.component';
import { CookieService } from 'ngx-cookie-service';
import {ConfigService} from './shared/config.service';
import {CustomInterceptor} from './shared/auth/CustomInterceptor.interceptor';


@NgModule({
    declarations: [
        AppComponent,
        TemplateComponent,
        TemplateHeaderComponent,
        TemplateLeftSideComponent,
        TemplateContentComponent,
        RechercheCollaborateurComponent,
        MatriceComponent,
        GestionCompetenceRequiseComponent,
        GestionCompetenceAcquiseComponent,
        AdministrationComponent,
        HomeComponent
    ],
    imports: [
        HttpClientModule,
        SharedLibsModule,
        ModalModule.forRoot(),
        BrowserModule,
        AppRoutingModule,
        InfoModule,
        BrancheModule,
        CompetenceModule,
        CompetenceAcquiseModule,
        CompetenceRequiseModule,
        EquipeModule,
        CollaborateurModule,
        AlertModule,
        TranslateModule.forRoot({
            loader: {
              provide: TranslateLoader,
              useFactory: HttpLoaderFactory,
              deps: [HttpClient]
            }
          })
    ],
    providers: [
        CookieService,
        ConfigService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: CustomInterceptor ,
            multi: true
        },
    {   provide: LOCALE_ID,
        useValue: 'fr' },
/*    {
        provide: LocationStrategy,
        useClass:  PathLocationStrategy,
    }*/],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
     return new TranslateHttpLoader(http, './assets/i18n/', '.json');
  }
