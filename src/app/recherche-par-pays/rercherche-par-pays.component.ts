import { Component, OnInit } from '@angular/core';
import { Pays } from '../model/pays.model';
import { Plat } from '../model/plat.model';
import { PlatsComponent } from '../plats/plats.component';
import { PlatService } from '../services/plat.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recherche-par-pays',
  imports: [FormsModule, CommonModule], // Import necessary modules
  standalone: true,
  templateUrl: './recherche-par-pays.component.html',
  styles: [
  ]
})
export class RechercheParPaysComponent implements OnInit {
  IdPays! : number;
  pays! : Pays[];
  plats! : Plat[];


  constructor(private platService : PlatService) { }

  ngOnInit(): void {
    this.platService.listePays().subscribe(paysData => {
      this.pays = paysData._embedded.pays; 
      console.log('Fetched pays:', this.pays); 
    });

  }

  onChange() {
    this.platService.rechercherParPays(this.IdPays).
      subscribe(p =>{this.plats=p});

    }

}