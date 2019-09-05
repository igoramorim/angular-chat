import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: Observable<firebase.User>;
  private authState: any;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router
  ) {
    this.user = this.afAuth.authState;
  }

  authUser() {
    return this.user;
  }

  get currentUserId(): string {
    // console.log(this.user);
    const x = this.authState !== null ? this.authState.user.uid : '';
    console.log('currentUserId(): ' + x);
    return x;
  }

  login(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((resolve) => {
        // console.log(resolve.user);
        this.authState = resolve;
        const status = 'online';
        this.setUserStatus(status);
        this.router.navigate(['chat']);
      });
  }

  logout() {
    this.setUserStatus('offline');
    // this.afAuth.auth.signOut();
    // this.router.navigate(['login']);
  }

  signUp(email: string, password: string, displayName: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
        const status = 'online';
        this.setUserData(email, displayName, status);
      })
      .catch(error => console.log(error));
  }

  setUserData(email: string, displayName: string, status: string): void {
    const path = `users/${this.currentUserId}`;
    const data = {
      email: email,
      displayName: displayName,
      status: status
    };

    console.log('path: ' + path);
    console.log('data: ' + data);

    this.db.object(path).update(data)
      .catch(error => console.log(error));
  }

  setUserStatus(status: string) {
    console.log('setUserStatus');
    const path = `users/${this.currentUserId}`;
    const data = {
      status: status
    };

    console.log('path: ' + path);
    console.log('data: ' + data);

    this.db.object(path).update(data)
      .catch(error => console.log(error));
  }

}
