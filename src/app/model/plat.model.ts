import { Image } from "./image.model";
import { Pays } from "./pays.model";

export class Plat{
    idPlat!: number;
    nomPlat?: string;
    prixPlat?: number;
    dateCreation?: Date;
    pays!: Pays;
    image!: Image;
    imageStr!: string;

    images!: Image[];
    

}