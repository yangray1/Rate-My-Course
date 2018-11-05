import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ReviewsComponent } from './reviews/reviews.component';
import {   
  MatCardModule,
  MatButtonModule,
  MatTabsModule } from '@angular/material/';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    ReviewsComponent
  ],
  imports: [
    BrowserModule,
    MatCardModule,
    MatTabsModule,
    BrowserAnimationsModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
