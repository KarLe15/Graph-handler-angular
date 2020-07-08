import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NotFoundComponent} from './errors/not-found/not-found.component';
import {GraphsComponent} from './render/graphs/graphs.component';


const routes: Routes = [
  {path: '', component: GraphsComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
