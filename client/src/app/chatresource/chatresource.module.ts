import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { OvService } from './services/ov.service';
import { FilmService } from './services/film.service';
import { ChatresourceService } from './services/chatresource.service';
import { ResourcelistComponent } from './components/resourcelist/resourcelist.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [OvService, FilmService, ChatresourceService, ResourcelistComponent],
  providers: [ChatresourceService, FilmService, OvService]
})
export class ChatresourceModule { }
