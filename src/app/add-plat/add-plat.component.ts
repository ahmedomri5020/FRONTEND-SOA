import { Router, RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PlatService } from '../services/plat.service';
import { Plat } from '../model/plat.model';
import { FormsModule } from '@angular/forms';
import { Pays } from '../model/pays.model';
import { CommonModule } from '@angular/common';
import { Image } from '../model/image.model';

@Component({
  selector: 'app-add-produit',
  templateUrl: './add-plat.component.html',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
})
export class AddPlatComponent implements OnInit {
  newPlat = new Plat();
  pays!: Pays[];
  newIdPays!: number;
  uploadedImage!: File;
  imagePath: any;

  constructor(private platService: PlatService, private router: Router) {}

  ngOnInit(): void {
    this.platService.listePays().subscribe((pays) => {
      this.pays = pays._embedded.pays;
      console.log(pays);
    });
  }

  addPlat(){ 
    this.platService 
    .uploadImage(this.uploadedImage, this.uploadedImage.name) 
    .subscribe((img: Image) => { 
         this.newPlat.image=img; 
         this.newPlat.pays = this.pays.find(p => p.idPays 
== this.newIdPays)!; 
      
          this.platService 
            .ajouterPlat(this.newPlat) 
            .subscribe(() => { 
              this.router.navigate(['plats']); 
            }); 
    }); 
    } 
  


  onImageUpload(event: any) {
    this.uploadedImage = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.uploadedImage);
    reader.onload = (_event) => { this.imagePath = reader.result; }
    }
}
