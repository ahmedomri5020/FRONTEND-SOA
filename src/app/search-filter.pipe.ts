import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(list: any[], filterText: string): any {
    console.log("Transforming Cours List...");

    if (!list || !filterText) {
      return list || []; // Return original list if no filter text or list is provided
    }

    const lowerCaseFilterText = filterText.toLowerCase();

    return list.filter(item => {
      // Ensure item.title exists and is a string before calling toLowerCase
      return item.title?.toLowerCase().includes(lowerCaseFilterText) || false;
    });
  }
}
