import { Competence } from './../../competence/.';
import { Pipe, PipeTransform } from '@angular/core';
import { Branche } from '..';
@Pipe({
  name: 'treeFilter'
})
export class TreeFilterPipe implements PipeTransform {

    transform(competences: Competence[] ,searchText: string): any[] {
        if (!competences) {
            return [];
        }
        if (!searchText) {
            return competences;
        }
        searchText = searchText.toLowerCase();
        return competences.filter( it => {
            return it.libelle.toLowerCase().includes(searchText);
        });
   }
}
