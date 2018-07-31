import { Competence } from '../competence/competence.model';

export class Branche  {
    equipe: boolean;
    collaborateur: Boolean;
    constructor(
        public id?: number,
        public nom?: string,
        public libelle?: string,
        public description?: string,
        public brancheParenteId?: number,
        public sousBranches?: Branche[],
        public competences?: Competence[],
        public isteam?: boolean
    ) {
        this.collaborateur = false;
        this.equipe = false;
    }
}
