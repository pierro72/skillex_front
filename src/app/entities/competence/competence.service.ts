import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';
import { Competence } from './competence.model';
import { createRequestOption } from '../../shared';


@Injectable()
export class CompetenceService {

    private resourceUrl = SERVER_API_URL + 'api/competences';
    /* FIXME: */
    /* private headers = new Headers({'Content-Type': 'application/json'}); */

    constructor(
        private http: HttpClient
    ) { }

    create(competence: Competence): Observable<Competence> {
        const copy = this.convert(competence);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return this.convertItemFromServer(res);
        });
    }

    update(competence: Competence): Observable<Competence> {
        const copy = this.convert(competence);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return this.convertItemFromServer(res);
        });
    }

    find(id: number): Observable<Competence> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            return this.convertItemFromServer(res);
        });
    }

    query(req?: any): Observable<Competence[]> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, { params: options} )
            .map((res: string) => this.convertResponse(res));
    }

    getAllCompetences(): Observable<Competence[]> {
        return this.http.get(this.resourceUrl).map((res: string) => this.convertResponse(res));
    }

/*  FIXME: HttpClient ne parvient pas à analyser une réponse 200
    voir https://github.com/angular/angular/issues/18680
    Solution temporaire */
    delete(id: number): Observable<string> {
        sessionStorage.removeItem('branches');
        const headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json');
        return this.http.delete(`${this.resourceUrl}/${id}`,  {headers: headers, responseType: 'text'});
    }


    private convertResponse(res: string): Competence[] {
        const result = [];
        for (let i = 0; i < res.length; i++) {
            result.push(this.convertItemFromServer(res[i]));
        }
        return result;
    }

    /**
     * Convert a returned JSON object to Competence.
     */
    private convertItemFromServer(json: any): Competence {
        const entity: Competence = Object.assign(new Competence(), json);
        return entity;
    }

    /**
     * Convert a Competence to a JSON which can be sent to the server.
     */
    private convert(competence: Competence): Competence {
        const copy: Competence = Object.assign({}, competence);
        return copy;
    }
}
