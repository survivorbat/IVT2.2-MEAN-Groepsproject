import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Message from '../domain/Message';
import { environment } from '../../../environments/environment';
import Chatbox from '../../chatbox/domain/Chatbox';
import { Observable } from 'rxjs/Observable';

const BASE_URL = environment.serverurl + "/api/chatboxes"
@Injectable()
export class MessageService {

  constructor(private http: HttpClient) { }

  getMessages(chatbox: Chatbox): Observable<Message[]> {
    return this.http.get<Message[]>(BASE_URL+'/'+chatbox.id);
  }

  add(message: Message, chatbox: Chatbox){
    this.http.post(BASE_URL+'/'+chatbox.id,message)
  }

  remove(message: Message){
    this.http.delete(BASE_URL+'/'+message.id)
  }
}
