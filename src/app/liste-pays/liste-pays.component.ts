import { Component, OnInit } from '@angular/core';
import { Pays } from '../model/pays.model';
import { PlatService } from '../services/plat.service';
import { UpdatePaysComponent } from '../update-pays/update-pays.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-liste-categories',
  imports: [UpdatePaysComponent,CommonModule],
    standalone: true,
  templateUrl: './liste-pays.component.html',
  styles: [
  ]
})
export class ListePaysComponent implements OnInit {

  pays! : Pays[];

  updatedPays:Pays = {"idPays":0,"nomPays":"","descriptionPays":""};

  ajout:boolean=true;

  constructor(private platService : PlatService) { }

  ngOnInit(): void {
    this.chargerPays();
  }

  chargerPays(){
    this.platService.listePays().
      subscribe(p => {this.pays = p._embedded.pays;
      console.log(p);
    });
  }

  updatePays(p:Pays) {
    this.updatedPays=p;
    this.ajout=false;  
  }


  paysUpdated(p:Pays){
    console.log("Pays updated event",p);
    this.platService.ajouterPays(p).subscribe( () =>  this.chargerPays());
  }


  supprimerPays(p : Pays) {
    let conf = confirm("Etes-vous sûr ?");
       if (conf)
       {
         this.platService.supprimerPays(p.idPays).subscribe(() => {
          console.log("Pays supprimée");
          this.chargerPays(); }  );
       }
  }
}