import { CompetenceRequise } from '../';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'libelleFilter'
})
export class LibelleFilterPipe implements PipeTransform {

    transform(items: CompetenceRequise[], searchText: string): any[] {
        if (!items) {
            return [];
        }
        if (!searchText) {
            return items;
        }
        searchText = searchText.toLowerCase();
        return items.filter( it => {
        return it.competence.libelle.toLowerCase().includes(searchText);
        });
   }
}
