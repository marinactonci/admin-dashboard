import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from './user.service';

interface RemoteLoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    const storedUser = JSON.parse(localStorage.getItem('currentUser')!);
    this.currentUserSubject = new BehaviorSubject<any>(storedUser);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  loginRemote(email: string, password: string) {
    const url = 'https://webhook.site/a758bb08-0248-488d-86b6-67995ad595a4';
    return this.http.post<RemoteLoginResponse>(url, { email, password }).pipe(
      map((response) => {
        localStorage.setItem('token', JSON.stringify(response.token));
      })
    );
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http.get<any[]>(`${this.apiUrl}?email=${email}`).pipe(
      map((users) => {
        if (users.length > 0) {
          const user = users[0];
          if (user.password === password) {
            this.currentUserSubject.next(user);
            localStorage.setItem('currentUser', JSON.stringify(user));
            return true;
          }
        }
        return false;
      }),
      catchError(() => of(false))
    );
  }

  logout(): void {
    this.currentUserSubject.next(null);
    localStorage.removeItem('currentUser');
  }

  isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }
}
