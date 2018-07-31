import { CompetenceRequise } from './../competence-requise/competence-requise.model';
import { Collaborateur } from './../collaborateur/collaborateur.model';
export class Equipe  {
    constructor(
        public id?: number,
        public nom?: string,
        public pilote?: Collaborateur,
        public collaborateurs?: Collaborateur[],
        public competenceRequises?: CompetenceRequise[]
    ) {
    }
}
