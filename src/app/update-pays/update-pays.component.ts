import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Pays } from '../model/pays.model';
import { ListePaysComponent } from '../liste-pays/liste-pays.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-pays',
  imports: [ListePaysComponent,FormsModule,CommonModule],
  standalone: true,
  templateUrl: './update-pays.component.html',
  styles: [
  ]
})
export class UpdatePaysComponent implements OnInit {

  @Input()
  pays! : Pays;

  @Input()
  ajout!:boolean;

  @Output() 
  paysUpdated = new EventEmitter<Pays>();


  constructor() { }

  ngOnInit(): void {
    
  }

  savePays(){
    this.paysUpdated.emit(this.pays);
  }


  modeAjout()
  {
    this.ajout=true;
    this.pays.idPays = 0;
    this.pays.nomPays="";
  }
}