import { Competence } from './../../competence/.';
import { Pipe, PipeTransform } from '@angular/core';
import { Branche } from '..';
@Pipe({
  name: 'treeFilter2'
})
export class TreeFilterPipe2 implements PipeTransform {

    transform(branches: Branche[] ,searchText: string): any {
        if (!branches) {
            return [];
        }
        if (!searchText) {
            return branches;
        }
        searchText = searchText.toLowerCase();
        return branches.filter( branche => {
            if ( this.isNotEmptyBranche(branche,searchText) ){
                return true;
            }
        });
   }

   isNotEmptyCompetence (branche: Branche, searchText: string ): Boolean{
        let test = false;
        branche.competences.forEach( competence => {
            if (competence.libelle.toLowerCase().includes(searchText)){
                test = true;
            };
        })
        return test;
    }

    isNotEmptyBranche(branche: Branche, searchText: string): Boolean{
        let testBranche      = false;
        let testCompetences  = false;

        if (branche.competences){
            if (this.isNotEmptyCompetence(branche, searchText) ){
                testCompetences = true;
            }
        }
        if (branche.sousBranches){
            branche.sousBranches.forEach( 
                branche => {
                    if (this.isNotEmptyBranche(branche, searchText) ) {
                        testBranche = true;
                    }
                }
            )
        }
        
        return ( testBranche || testCompetences);
    }


}
