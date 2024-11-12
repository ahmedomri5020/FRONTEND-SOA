import { Component, OnInit } from '@angular/core';
import { Plat } from '../model/plat.model';
import { PlatService } from '../services/plat.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recherche-par-nom',
  standalone: true,
  templateUrl: './recherche-par-nom.component.html',
  imports: [FormsModule, CommonModule],
  styles: []
})
export class RechercheParNomComponent implements OnInit {
  
  searchTerm: string = '';
  plats!: Plat[];
  allPlats!: Plat[]; 

  constructor(private platService: PlatService) {}

  ngOnInit(): void {
    this.platService.listePlats().subscribe(p => {
      console.log(p);
      this.plats = p;
      this.allPlats = p; 
    });
  }

  onKeyUp(filterText: string) {
    if (!filterText) {
      this.plats = [...this.allPlats];
      return;
    }
    
    this.plats = this.allPlats.filter(item =>
      item.nomPlat?.toLowerCase().includes(filterText.toLowerCase())
    );
  }
}
