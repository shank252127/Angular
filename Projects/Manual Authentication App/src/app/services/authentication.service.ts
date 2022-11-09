import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

// Interface
interface Credentials {
  username: string;
  password: string;
}
@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private URL_LOGIN = environment.loginApi;
  private URL_USER = environment.userDetailApi;
  constructor(private http: HttpClient) {}

  // modify the return type to properly use the full response
  login(username: string, password: string): Observable<any> {
    let body: Credentials = { username, password };
    return this.http.post<Credentials>(this.URL_LOGIN, body);
  }

  isLoggedIn() {
    return localStorage.getItem('token') != null;
  }

  fetchToken() {
    return localStorage.getItem('token') || '';
  }

  getUsers(){
    return this.http.get(this.URL_USER);
  }
}
