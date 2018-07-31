export class IhniAccount {
    constructor(
        public _user?: string,
        public _id_user?: number,
        public _admin?: boolean,
        public _team?: string,
        public _id_team?: number,
        public _role?: string,
        public _jobName?: string,
        public _appName?: string,
    ) { }

    public isValid(): boolean {
        let test = true;
        if ( !this._user || !this._id_user || !this._admin || !this._team || !this._id_team || !this._role  || !this._appName  ) {
            test = false;
        }
        return test;
    }
    
    
    
    get user(): string {
        return this._user;
    }
    
    set user(value: string) {
        this._user = value;
    }
    
    get id_user(): number {
        return this._id_user;
    }
    
    set id_user(value: number) {
        this._id_user = value;
    }
    
    get admin(): boolean {
        return this._admin;
    }
    
    set admin(value: boolean) {
        this._admin = value;
    }
    
    get team(): string {
        return this._team;
    }
    
    set team(value: string) {
        this._team = value;
    }
    
    get id_team(): number {
        return this._id_team;
    }
    
    set id_team(value: number) {
        this._id_team = value;
    }
    
    get role(): string {
        return this._role;
    }
    
    set role(value: string) {
        this._role = value;
    }
    
    get appName(): string {
        return this._appName;
    }
    
    set appName(value: string) {
        this._appName = value;
    }
    
    
    get jobName(): string {
        return this._jobName;
    }
    
    set jobName(value: string) {
        this._jobName = value;
    }
}
