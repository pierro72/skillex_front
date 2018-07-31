import { CompetenceAcquise } from '../competence-acquise/competence-acquise.model';
import { Evaluation } from '../../shared';
export class Collaborateur  {
    constructor(
        public id?: number,
        public nom?: string,
        public poste?: string,
        public prenom?: string,
        public pseudo?: string,
        public admin?: boolean,
        public active?: boolean,
        public mail?: string,
        public competenceAcquises?: CompetenceAcquise[],
        public evaluations?: Evaluation[]
    ) {
    }
}
