import { Collaborateur } from './../.';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'nameFilter'
})
export class NameFilterPipe implements PipeTransform {

    transform(items: Collaborateur[], searchText: string): any[] {
        if (!items) {
            return [];
        }
        if (!searchText) {
            return items;
        }
        searchText = searchText.toLowerCase();
        return items.filter( it => {
            return (it.nom.toLowerCase().includes(searchText) || it.prenom.toLowerCase().includes(searchText)) ;
        });
   }
}
