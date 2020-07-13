import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule, MatInputModule,
  MatSelectModule, MatTabsModule,
  MatToolbarModule
} from '@angular/material';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import {MaterialFileInputModule} from 'ngx-material-file-input';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatFormFieldModule,
    MatTabsModule,
    MatInputModule,
    MaterialFileInputModule, // additionnal extern module
  ],
  exports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatFormFieldModule,
    MatTabsModule,
    MatInputModule,
    MaterialFileInputModule,
  ]
})
export class MaterialModule { }
