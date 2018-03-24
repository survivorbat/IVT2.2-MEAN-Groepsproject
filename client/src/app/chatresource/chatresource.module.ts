import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { OvService } from './services/ov.service';
import { FilmService } from './services/film.service';
import { ChatresourceService } from './services/chatresource.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [OvService, FilmService, ChatresourceService]
})
export class ChatresourceModule { }
