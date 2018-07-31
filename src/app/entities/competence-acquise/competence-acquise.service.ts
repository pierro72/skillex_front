import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';
import { CompetenceAcquise } from './';


@Injectable()
export class CompetenceAcquiseService {

    private resourceUrl = SERVER_API_URL + 'api/competence-acquises';
    /* FIXME: */
    /* private headers = new Headers({'Content-Type': 'application/json'}); */

    constructor(
        private http: HttpClient
    ) { }

    create( idCollaborateur: number, competenceAcquise: CompetenceAcquise): Observable<CompetenceAcquise> {
        const copy = this.convert(competenceAcquise);
        const url = SERVER_API_URL + 'api/collaborateur/' + idCollaborateur + '/competence-acquises';
        return this.http.post(url, copy).map((res: Response) => {
            return this.convertItemFromServer(res);
        });
    }


    update( idCollaborateur: number, competenceAcquise: CompetenceAcquise): Observable<CompetenceAcquise> {
        const copy = this.convert(competenceAcquise);
        const url = SERVER_API_URL + 'api/collaborateur/' + idCollaborateur + '/competence-acquises';
        return this.http.put(url, copy).map((res: Response) => {
            return this.convertItemFromServer(res);
        });
    }

    find(id: number): Observable<CompetenceAcquise> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            return this.convertItemFromServer(res);
        });
    }


    query(idCollaborateur: number, req?: any): Observable<CompetenceAcquise[]> {
/*         const options = createRequestOption(req); */
        const url = SERVER_API_URL + 'api/collaborateur/' + idCollaborateur + '/competence-acquises';
        return this.http.get(url, { params: req} )
            .map((res: string) => this.convertResponse(res));
    }


    /*  FIXME: HttpClient ne parvient pas à analyser une réponse 200
    voir https://github.com/angular/angular/issues/18680 Solution temporaire */
    delete(id: number): Observable<string> {
        sessionStorage.removeItem('equipes');
        sessionStorage.removeItem('collaborateurs');
        sessionStorage.removeItem('sortedCollaborateurs');
        const headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json');
        return this.http.delete(`${this.resourceUrl}/${id}`,  {headers: headers, responseType: 'text'});
    }


    private convertResponse(res: string): CompetenceAcquise[] {
        const result = [];
        for (let i = 0; i < res.length; i++) {
            result.push(this.convertItemFromServer(res[i]));
        }
        return result;
    }

    /**
     * Convert a returned JSON object to CompetenceAcquise.
     */
    private convertItemFromServer(json: any): CompetenceAcquise {
        const entity: CompetenceAcquise = Object.assign(new CompetenceAcquise(), json);
        return entity;
    }

    /**
     * Convert a CompetenceAcquise to a JSON which can be sent to the server.
     */
    private convert(competenceAcquise: CompetenceAcquise): CompetenceAcquise {
        const copy: CompetenceAcquise = Object.assign({}, competenceAcquise);
        return copy;
    }
}
