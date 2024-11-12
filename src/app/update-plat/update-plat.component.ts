import { Pays } from './../model/pays.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Plat } from '../model/plat.model';
import { PlatService } from '../services/plat.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { catchError, of } from 'rxjs';
import { Image } from '../model/image.model';

@Component({
    selector: 'app-update-plat',
    standalone: true,
    imports: [FormsModule, CommonModule], 
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
      subscribe(p => {this.pays = p._embedded.pays; 
        console.log(p); 
        }); 
        this.platService.consulterPlat(this.activatedRoute.snapshot.params['id']). 
        subscribe( p =>{ this.currentPlat = p; 
        this.updatedPaysId =   
        p.pays.idPays; 
        this.platService 
        .loadImage(this.currentPlat.image.idImage) 
        .subscribe((img: Image) => { 
        this.myImage = 'data:' + img.type + ';base64,' + img.image; 
        });     
        } ) ;

  }

  updatePlat() {
    this.currentPlat.pays = this.pays.find(p => p.idPays == 
      this.updatedPaysId)!; 
          //tester si l'image du produit a été modifiée 
          if (this.isImageUpdated) 
          {     
            this.platService 
            .uploadImage(this.uploadedImage, this.uploadedImage.name) 
            .subscribe((img: Image) => { 
              this.currentPlat.image = img; 
            
                     this.platService 
                       .updatePlat(this.currentPlat) 
                       .subscribe((prod) => { 
                          this.router.navigate(['plats']); 
                                    }); 
              }); 
            } 
            else{           
                this.platService 
                  .updatePlat(this.currentPlat) 
                  .subscribe((prod) => { 
                    this.router.navigate(['plats']); 
                  }); 
            }
    
  
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
