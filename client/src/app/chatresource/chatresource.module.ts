import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FilmService } from './services/film.service';
import { ChatresourceService } from './services/chatresource.service';
import { ResourcelistComponent } from './components/resourcelist/resourcelist.component';
import { ResourceitemComponent } from './components/resourceitem/resourceitem.component';
import { PokemonService } from './services/pokemon.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [ResourcelistComponent, ResourceitemComponent],
  exports:[ResourcelistComponent, ResourceitemComponent],
  providers: [FilmService, ChatresourceService, PokemonService]
})
export class ChatresourceModule { }
