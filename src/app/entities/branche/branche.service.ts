import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';
import { Branche } from './branche.model';
import {catchError} from 'rxjs/operators';


@Injectable()
export class BrancheService {

    private resourceUrl = SERVER_API_URL + 'api/branches';
     /*  FIXME: */
/*     private headers = new Headers({'Content-Type': 'application/json'}); */

    constructor( private http: HttpClient) { }

    create(branche: Branche): Observable<Branche> {
        sessionStorage.removeItem('branches');
        const copy = this.convert(branche);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return this.convertItemFromServer(res);
        });
    }

    update(branche: Branche): Observable<Branche> {
        sessionStorage.removeItem('branches');
        const copy = this.convert(branche);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return this.convertItemFromServer(res);
        });
    }

    find(id: number): Observable<Branche> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            return this.convertItemFromServer(res);
        });
    }

    query(): Observable<Branche[]> {
/*         const options = createRequestOption(req); */
        return this.http.get(this.resourceUrl)
          .map((res: string) => this.convertResponse(res));
    }
    
/*    query(): Observable<Branche[]> {
        /!*         const options = createRequestOption(req); *!/
       return this.http.get<Branche[]>(this.resourceUrl);
    }*/
    

    /*  FIXME: HttpClient ne parvient pas à analyser une réponse 200
    voir https://github.com/angular/angular/issues/18680
    Solution temporaire */
    delete(id: number): Observable<string> {
        sessionStorage.removeItem('branches');
        const headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json');
        return this.http.delete(`${this.resourceUrl}/${id}`,  {headers: headers, responseType: 'text'});
    }


    private convertResponse(res: string): Branche[] {
        const result = [];
        for (let i = 0; i < res.length; i++) {
            result.push(this.convertItemFromServer(res[i]));
        }
        return result;
    }

    /**
     * Convert a returned JSON object to Branche.
     */
    private convertItemFromServer(json: any): Branche {
        const entity: Branche = Object.assign(new Branche(), json);
        return entity;
    }

    /**
     * Convert a Branche to a JSON which can be sent to the server.
     */
    convert(branche: Branche): Branche {
        const copy: Branche = Object.assign({}, branche);
        return copy;
    }
}
