import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { NotFoundComponent } from './errors/not-found/not-found.component';
import { GraphViewerComponent } from './routes/graph-viewer/graph-viewer.component';
import { GraphUploaderComponent } from './routes/graph-uploader/graph-uploader.component';
import { HomePageComponent } from './routes/home-page/home-page.component';
import {DashboardComponent} from './routes/dashboard/dashboard.component';
import {AboutComponent} from './routes/about/about.component';


const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'viewer', component: GraphViewerComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'about', component: AboutComponent},
  {path: 'upload', component: GraphUploaderComponent},
  {path: '**', component: HomePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
