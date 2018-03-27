import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import User from '../domain/User';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {
  private URL: string = environment.serverurl + "/api/users";
  constructor(private http: HttpClient) { }

  getAll(): Observable<User[]>{
    return this.http.get<User[]>(this.URL, {
      headers: {
        'Authorization': 'Bearer '+window.localStorage.getItem('API_TOKEN'),
      }
    });
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.URL, user);
  }

  checkUser(user: User): any {
    return this.http.post(environment.serverurl + "/api/token", user);
  }
  delete(id: String) {
    return this.http.delete(this.URL+'/'+id, {
      headers: {
        'Authorization': 'Bearer '+window.localStorage.getItem('API_TOKEN'),
      }
    });
  }
}
