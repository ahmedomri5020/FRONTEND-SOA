import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPlatComponent } from './add-plat/add-plat.component';
import { PlatsComponent } from './plats/plats.component';
import { UpdatePlatComponent } from './update-plat/update-plat.component';
import { RechercheParPaysComponent } from './recherche-par-pays/rercherche-par-pays.component';
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';
import { ListePaysComponent } from './liste-pays/liste-pays.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { PlatGuard } from './plat.guard';
import { RegisterComponent } from './register/register.component';
import { VerifEmailComponent } from './verif-email/verif-email.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register',component:RegisterComponent},
  { path: 'verifEmail/:email', component: VerifEmailComponent }, 
  { path: 'plats', component: PlatsComponent },
  { path: 'add-plat', component: AddPlatComponent, canActivate: [PlatGuard] },
  { path: 'updatePlat/:id', component: UpdatePlatComponent },
  { path: 'rechercheParPays', component: RechercheParPaysComponent },
  { path: 'rechercheParNom', component: RechercheParNomComponent },
  { path: 'listePays', component: ListePaysComponent },
  { path: 'app-forbidden', component: ForbiddenComponent },
  { path: '', redirectTo: 'plats', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
