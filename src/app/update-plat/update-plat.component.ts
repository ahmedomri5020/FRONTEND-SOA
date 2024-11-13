import { Pays } from './../model/pays.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Plat } from '../model/plat.model';
import { PlatService } from '../services/plat.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { catchError, of } from 'rxjs';
import { Image } from '../model/image.model';

@Component({
    selector: 'app-update-plat',
    standalone: true,
    imports: [FormsModule, CommonModule,RouterModule], 
    templateUrl: './update-plat.component.html',
})
export class UpdatePlatComponent implements OnInit {

  currentPlat = new Plat();
  pays!: Pays[]; 
  updatedPaysId!: number; 
  myImage! : string; 
  uploadedImage!: File; 
  isImageUpdated: Boolean=false;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private platService: PlatService) { }

  ngOnInit(): void {
    this.platService.listePays(). 
    subscribe(cats => {this.pays = cats._embedded.pays; 
    }); 
 
   this.platService.consulterPlat(this.activatedRoute.snapshot.params['id'])
 .subscribe( prod =>{ this.currentPlat = prod; 
        this.updatedPaysId =   prod.pays.idPays; 
    } ) ; 

  }

  updatePlat() {
    this.currentPlat.pays = this.pays.find(cat => cat.idPays == 
      this.updatedPaysId)!;         
                this.platService 
                  .updatePlat(this.currentPlat) 
                  .subscribe((prod) => { 
                    this.router.navigate(['plats']); 
                  }); 
}
            onAddImagePlat() { 
              this.platService 
              .uploadImagePlat(this.uploadedImage, 
            this.uploadedImage.name,this.currentPlat.idPlat) 
              .subscribe( (img : Image)  => { 
                      this.currentPlat.images.push(img); 
                      }); 
             } 
             supprimerImage(img: Image){ 
              let conf = confirm("Etes-vous sûr ?"); 
              if (conf) 
                 this.platService.supprimerImage(img.idImage).subscribe(() => { 
                    //supprimer image du tableau currentProduit.images     
                    const index = this.currentPlat.images.indexOf(img, 0); 
                    if (index > -1) { 
                      this.currentPlat.images.splice(index, 1); 
                    } 
               }); 
             }
    
  
  
  onImageUpload(event: any) { 
    if(event.target.files && event.target.files.length) { 
      this.uploadedImage = event.target.files[0]; 
       this.isImageUpdated =true; 
      const reader = new FileReader(); 
      reader.readAsDataURL(this.uploadedImage); 
      reader.onload = () => { this.myImage = reader.result as string;  }; 
    } 
 } 
}
