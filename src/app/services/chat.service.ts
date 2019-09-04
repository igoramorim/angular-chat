import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import * as firebase from 'firebase/app';

import { ChatMessage } from '../models/chat-message.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  user: firebase.User;
  chatMessages: AngularFireList<ChatMessage>;
  chatMessage: ChatMessage;
  userName: string; // Observable<string>;

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth
  ) {
    this.afAuth.authState.subscribe(auth => {
      if (auth !== undefined && auth !== null) {
        this.user = auth;
        // console.log(this.user);
      }

      console.log(this.getUser());

      // this.getUser().valueChanges().subscribe(u => {
      //   console.log('chat service');
      //   console.log(u);
      //   this.userName = u.
      // });

      this.getUser().valueChanges().subscribe(u => {
        console.log(u.displayName);
        this.userName = u.displayName;
      });

    });
  }

  getUser(): any {
     const userId = this.user.uid;
     const path = `/users/${userId}`;
    //  console.log(path);
     return this.db.object(path);
  }

  sendMessage(msg: string) {
    const timestamp = this.getTimeStamp();
    const email = this.user.email;
    this.chatMessages = this.getMessages();

    const message: ChatMessage = {
      email: email,
      userName: this.userName,
      message: msg,
      timeSent: timestamp
    };

    this.chatMessages.push(message);
  }

  getMessages(): AngularFireList<ChatMessage> {
    // query to create our message feed binding
    return this.db.list('messages', ref => ref.orderByKey().limitToLast(25));
  }

  getTimeStamp() {
    const now = new Date();
    const date = now.getUTCFullYear() + '/' +
                  (now.getUTCMonth() + 1) + '/' +
                  now.getUTCDate();
    const time = now.getUTCHours() + ':' +
                  now.getUTCMinutes() + ':' +
                  now.getUTCSeconds();

    return (date + ' ' + time);
  }

}
