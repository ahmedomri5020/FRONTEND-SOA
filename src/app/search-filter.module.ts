// search-filter.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchFilterPipe } from './search-filter.pipe'; // Adjust the path as necessary

@NgModule({
  declarations: [SearchFilterPipe],
  imports: [CommonModule],
  exports: [SearchFilterPipe] // Export the pipe to use it in other modules
})
export class SearchFilterModule {}
