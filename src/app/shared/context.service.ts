import {EventEmitter, Injectable, Output} from '@angular/core';
import { Branche } from '../entities/branche';
import { Equipe } from '../entities/equipe';
import { IhniAccount } from './user/ihni-account.model';
import {Collaborateur} from '../entities/collaborateur';

@Injectable()
export class ContextService {


    private _branches: Branche[];
    private _ihniAccount: IhniAccount;
    private _equipes: Equipe[];
    private _equipeUtilisateur: Equipe;
    private _collaborateur: Collaborateur;
    private _equipeCourante: Equipe;
    private _equipeCouranteBranches: Branche[];
    private _connecte       = false;
    private _contextLoad    = false;
    private _qubLoad        = false;
    @Output() private _change: EventEmitter<boolean>            = new EventEmitter();


    get collaborateur(): Collaborateur {
        return this._collaborateur;
    }

    set collaborateur(value: Collaborateur) {
        this._collaborateur = value;
    }

    get qubLoad(): boolean {
        return this._qubLoad;
    }

    set qubLoad(value: boolean) {
        this._qubLoad = value;
    }

    get equipeCourante(): Equipe {
        return this._equipeCourante;
    }

    set equipeCourante(value: Equipe) {
        this._equipeCourante = value;
    }

    get branches(): Branche[] {
        return this._branches;
    }

    set branches(value: Branche[]) {
        this._branches = value;
    }

    get equipes(): Equipe[] {
        return this._equipes;
    }

    set equipes(value: Equipe[]) {
        this._equipes = value;
    }

    get ihniAccount(): IhniAccount {
        return this._ihniAccount;
    }

    set ihniAccount(value: IhniAccount) {
        this._ihniAccount = value;
        this._connecte = true;
        this._change.emit(this._connecte);
    }

    get change(): EventEmitter<boolean> {
        return this._change;
    }

    get equipeCouranteBranches(): Branche[] {
        return this._equipeCouranteBranches;
    }

    set equipeCouranteBranches(value: Branche[]) {
        this._equipeCouranteBranches = value;
    }

    get connecte(): boolean {
        return this._connecte;
    }

    get equipeUtilisateur(): Equipe {
        return this._equipeUtilisateur;
    }

    set equipeUtilisateur(value: Equipe) {
        this._equipeUtilisateur = value;
    }

    get contextLoad(): boolean {
        return this._contextLoad;
    }

    set contextLoad(value: boolean) {
        this._contextLoad = value;
    }

}
