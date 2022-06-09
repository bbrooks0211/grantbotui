import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JoinSoundsComponent } from './join-sounds/join-sounds.component';
import { HttpClientModule } from '@angular/common/http';
import { JoinSoundsService } from './services/JoinSoundsService';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { YouTubeAPIService } from './services/YouTubeAPIService';
import { PlaySoundsComponent } from './play-sounds/play-sounds.component';
import { PlaySoundService } from './services/PlaySoundService';

@NgModule({
  declarations: [
    AppComponent,
    JoinSoundsComponent,
    PlaySoundsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [JoinSoundsService, YouTubeAPIService, PlaySoundService],
  bootstrap: [AppComponent]
})
export class AppModule { }
