import { User } from './../models/user.model';
import { Component, OnInit } from '@angular/core';
import { ChatService } from './../services/chat.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.css']
})
export class ChatFormComponent implements OnInit {

  message: string;
  user: User;
  userStatus = '';

  constructor(
    private chat: ChatService,
    private authService: AuthService
  ) {
    this.chat.getUser().valueChanges().subscribe(user => {
      const u: any = user;
      // this.users = u.filter((us) => {
      //   return us.status !== 'offline';
      // });
      this.user = u;
      this.userStatus = this.user.status;
      console.log(this.user);
    });
  }

  ngOnInit() {
  }

  send() {
    this.chat.sendMessage(this.message);
    this.message = '';
  }

  handleSubmit(event) {
    console.log(this.userStatus);

    if (this.message !== '' && this.userStatus !== 'typing') {
      // console.log('entrou if typing');
      this.authService.setUserStatus('typing');
    }
    if (this.message === '' && this.userStatus === 'typing') {
      // console.log('entrou if sem typing');
      this.authService.setUserStatus('online');
    }
    // console.log(this.userStatus);
    if (event.keyCode === 13) {
      this.send();
    }
  }

}
