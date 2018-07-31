import { Competence } from '../competence/competence.model';

export class CompetenceRequise implements Competence {
    constructor(
        public id?: number,
        public note?: number,
        public equipeId?: number,
        public competence?: Competence,
    ) {
    }
}
