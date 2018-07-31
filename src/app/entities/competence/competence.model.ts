export class Competence  {

    constructor(
        public id?: number,
        public nom?: string,
        public libelle?: string,
        public description?: string,
        public brancheParenteId?: number,
        public isteam?: boolean
    ) {
    }
}
