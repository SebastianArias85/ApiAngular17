import { Routes } from '@angular/router';

import { RouterModule } from '@angular/router';
import { ArticulosListComponent } from './articulos-list/articulos-list.component';
import { ArticuloEditComponent } from './articulo-edit/articulo-edit.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    { path: '', component: ArticulosListComponent },
    { path: 'editar/:codigo', component: ArticuloEditComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
