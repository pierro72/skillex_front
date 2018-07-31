import { Competence } from '../competence';

export class CompetenceAcquise implements Competence {
    constructor(
        public id?: number,
        public note?: number,
        public collaborateurId?: number,
        public competence?: Competence
    ) {
    }
}
