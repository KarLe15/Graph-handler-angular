import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NotFoundComponent} from './errors/not-found/not-found.component';
import {GraphViewerComponent} from './routes/graph-viewer/graph-viewer.component';
import {GraphUploaderComponent} from './routes/graph-uploader/graph-uploader.component';


const routes: Routes = [
  {path: '', component: GraphViewerComponent},
  {path: 'viewer', component: GraphViewerComponent},
  {path: 'upload', component: GraphUploaderComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
