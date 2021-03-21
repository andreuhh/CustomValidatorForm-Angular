import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// NB
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

interface UsernameAvailableResponse {
  available: boolean;
}

interface SignupCredentials {
  username: string;
  password: string;
  passwordConfirmation: string;
}

interface SignupResponse {
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  rootUrl = 'https://api.angular-email.com';

  signedin$ = new BehaviorSubject(false); // i used $ because there is a community convention for the Observable

  constructor(
    private http: HttpClient
  ) { }

  // check se l'username è gia utilizzato
  usernameAvaible(username: string) {
    return this.http.post<UsernameAvailableResponse>(
      this.rootUrl + '/auth/username', {
      username
    })
  }

  signup(credentials: SignupCredentials) {
    return this.http.post<SignupResponse>(
      this.rootUrl + '/auth/signup',
      credentials
    ).pipe(
      tap(() => {
        this.signedin$.next(true);
      })
    );
  }

  //check user authentication status
  checkAuth() {
    return this.http.get(`${this.rootUrl}/auth/signedin`).pipe(
      tap(response => {
        console.log(response);
      })
    )
  }
}
