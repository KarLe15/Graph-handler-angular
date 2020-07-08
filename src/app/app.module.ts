import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { GraphsComponent } from './render/graphs/graphs.component';
import { GraphSelectorComponent } from './commons/graph-selector/graph-selector.component';
import {GojsAngularModule} from 'gojs-angular';
import {LoadGraphsService} from './services/load-graphs.service';
import { HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    GraphsComponent,
    GraphSelectorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    GojsAngularModule,
    HttpClientModule,
  ],
  providers: [
    LoadGraphsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
