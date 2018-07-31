import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';
import { CompetenceRequise } from './';
/* import { createRequestOption } from '../../shared'; */

@Injectable()
export class CompetenceRequiseService {

    private resourceUrl = SERVER_API_URL + 'api/competence-requises';
    /* FIXME: */
/*     private headers = new Headers({'Content-Type': 'application/json'}); */

    constructor(
        private http: HttpClient
    ) { }

    create( idEquipe: number, competenceRequise: CompetenceRequise): Observable<CompetenceRequise> {
        sessionStorage.removeItem('equipes');
        const copy = this.convert(competenceRequise);
        const url = SERVER_API_URL + 'api/equipe/' + idEquipe + '/competence-requises';
        return this.http.post(url, copy).map((res: Response) => {
            return this.convertItemFromServer(res);
        });
    }


    update( idEquipe: number, competenceRequise: CompetenceRequise): Observable<CompetenceRequise> {
        sessionStorage.removeItem('equipes');
        const copy = this.convert(competenceRequise);
        const url = SERVER_API_URL + 'api/equipe/' + idEquipe + '/competence-requisess';
        return this.http.put(url, copy).map((res: Response) => {
            return this.convertItemFromServer(res);
        });
    }

    find(id: number): Observable<CompetenceRequise> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            return this.convertItemFromServer(res);
        });
    }


    query( idEquipe: number, req?: any): Observable<CompetenceRequise[]> {
/*         const options = createRequestOption(req); */
        const url = SERVER_API_URL + 'api/equipe/' + idEquipe + '/competence-requises';
        return this.http.get(url, { params: req} )
            .map((res: string) => this.convertResponse(res));
    }


    /*  FIXME: HttpClient ne parvient pas à analyser une réponse 200
    voir https://github.com/angular/angular/issues/18680 Solution temporaire */
    delete(id: number): Observable<string> {
        sessionStorage.removeItem('equipes');
        const headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json');
        return this.http.delete(`${this.resourceUrl}/${id}`,  {headers: headers, responseType: 'text'});
    }


    private convertResponse(res: string): CompetenceRequise[] {
        const result = [];
        for (let i = 0; i < res.length; i++) {
            result.push(this.convertItemFromServer(res[i]));
        }
        return result;
    }

    /**
     * Convert a returned JSON object to CompetenceRequise.
     */
    private convertItemFromServer(json: any): CompetenceRequise {
        const entity: CompetenceRequise = Object.assign(new CompetenceRequise(), json);
        return entity;
    }

    /**
     * Convert a CompetenceRequise to a JSON which can be sent to the server.
     */
    private convert(competenceRequise: CompetenceRequise): CompetenceRequise {
        const copy: CompetenceRequise = Object.assign({}, competenceRequise);
        return copy;
    }
}
