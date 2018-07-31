
import {Equipe, EquipeService} from '../../entities/equipe';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {IhniAccount, ContextService} from '../';
import {Collaborateur} from '../../entities/collaborateur';
import {SERVER_IHNI_URL} from '../../app.constants';
import {Branche} from '../../entities/branche';
import {catchError} from 'rxjs/operators';
import {ConfigService} from '../config.service';



@Injectable()
export class AuthService {
    private authUrl = SERVER_IHNI_URL + '/api/authme';
    options: any    = {'withCredentials' : 'true'};
    
    constructor(private http: HttpClient, private config: ConfigService, private context: ContextService) {
     }
    
    authMe(): Observable<IhniAccount> {
        return this.http.get<IhniAccount>(this.authUrl, this.options).pipe(
            catchError(this.config.handleError)
        );
    }
    
    isPilote(account: IhniAccount, equipe: Equipe) {
        return equipe.pilote.id === account.id_user;
    }
    
    
    isOwner(collaborateur: Collaborateur) {
        return this.context.ihniAccount.id_user === collaborateur.id;
    }

    

}
