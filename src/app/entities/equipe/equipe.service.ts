import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';
import { Equipe } from './equipe.model';
import {ConfigService} from '../../shared/config.service';
import {catchError} from 'rxjs/operators';
/* import { createRequestOption } from '../../shared'; */

@Injectable()
export class EquipeService {

/*    private options: any = {'withCredentials' : 'true'};*/
    private resourceUrl = SERVER_API_URL + 'api/equipes';
    
    constructor( private http: HttpClient, public config: ConfigService) { }

    find(id: number): Observable<Equipe> {
        return this.http.get<Equipe>(this.resourceUrl + '/' + id)
            .pipe(catchError(this.config.handleError));
    }

    /*  FIXME: option */
    query(req?: any): Observable<Equipe[]> {
/*         const options = createRequestOption(req); */
        return this.http.get<Equipe[]>(this.resourceUrl)
            .pipe(catchError(this.config.handleError));

    }

}
