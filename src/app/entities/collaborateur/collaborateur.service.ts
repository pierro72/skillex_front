import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';
import { Collaborateur } from './collaborateur.model';
import { HttpHeaders } from '@angular/common/http';
import {ConfigService} from '../../shared/config.service';
import {catchError} from 'rxjs/operators';


@Injectable()
export class CollaborateurService {

    private resourceUrl = SERVER_API_URL + 'api/collaborateurs';
    private options: any = {'withCredentials' : 'true'};
    
    constructor( private http: HttpClient,  public config: ConfigService) { }

    /* FIXME: */
    findMe():  Observable<Collaborateur> {
        const data = {
        };
        const headers = new HttpHeaders();
        return this.http.post(SERVER_API_URL + 'api/authenticate', data, { headers, withCredentials: true }).map((res: Response) => {
            return this.convertItemFromServer(res);
        });
    }


    find(id: number): Observable<Collaborateur> {
        return this.http.get<Collaborateur>(`${this.resourceUrl}/${id}`, this.options)
            .pipe( catchError(this.config.handleError)
        );
    }

    query(): Observable<Collaborateur[]> {
/*         const options = createRequestOption(req); */
        const options: any    = {'withCredentials' : 'true'};
        return this.http.get<Collaborateur[]>(this.resourceUrl,  this.options  )
            .pipe( catchError(this.config.handleError));
    }


    private convertResponse(res: string): Collaborateur[] {
        const result = [];
        for (let i = 0; i < res.length; i++) {
            result.push(this.convertItemFromServer(res[i]));
        }
        return result;
    }

    /**
     * Convert a returned JSON object to Collaborateur.
     */
    private convertItemFromServer(json: any): Collaborateur {
        const entity: Collaborateur = Object.assign(new Collaborateur(), json);
        return entity;
    }

    /**
     * Convert a Collaborateur to a JSON which can be sent to the server.
     */
/*     private convert(collaborateur: Collaborateur): Collaborateur {
        const copy: Collaborateur = Object.assign({}, collaborateur);
        return copy;
    } */
}
