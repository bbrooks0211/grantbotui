import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JoinSoundsComponent } from './join-sounds/join-sounds.component';
import { HttpClientModule } from '@angular/common/http';
import { JoinSoundsService } from './services/JoinSoundsService';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    JoinSoundsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [JoinSoundsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
