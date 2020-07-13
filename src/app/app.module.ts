import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { GraphViewerComponent } from './routes/graph-viewer/graph-viewer.component';
import { GraphSelectorComponent } from './commons/graph-selector/graph-selector.component';
import { GojsAngularModule } from 'gojs-angular';
import { LoadGraphsService } from './services/load-graphs.service';
import { HttpClientModule } from '@angular/common/http';
import { GraphUploaderComponent } from './routes/graph-uploader/graph-uploader.component';
import { DrawerMenuComponent } from './commons/drawer-menu/drawer-menu.component';
import { ListGraphsComponent } from './commons/list-graphs/list-graphs.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    GraphViewerComponent,
    GraphSelectorComponent,
    GraphUploaderComponent,
    DrawerMenuComponent,
    ListGraphsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    GojsAngularModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    LoadGraphsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
