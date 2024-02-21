import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormTicketsHotelsComponent } from './shared/components/form-tickets-hotels/form-tickets-hotels.component';
import { MaterialModule } from './shared/material/material.module';
import { AddOrEditTravelerComponent } from './shared/components/add-or-edit-traveler/add-or-edit-traveler.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddOrEditStepTwoComponent } from './shared/components/add-or-edit-stepTwo/add-or-edit-stepTwo.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    FormTicketsHotelsComponent,
    AddOrEditTravelerComponent,
    AddOrEditStepTwoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
