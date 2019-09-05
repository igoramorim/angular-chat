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
  userStatus = 'online';

  constructor(
    private chat: ChatService,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  send() {
    this.chat.sendMessage(this.message);
    this.message = '';
  }

  handleSubmit(event) {

    // TODO: recuperar o status do usuario logado

    if (this.message !== '' && this.userStatus !== 'typing') {
      // console.log('entrou if typing');
      this.userStatus = 'typing';
      this.authService.setUserStatus('typing');
    }
    if (this.message === '' && this.userStatus === 'typing') {
      // console.log('entrou if sem typing');
      this.userStatus = 'online';
      this.authService.setUserStatus('online');
    }
    // console.log(this.userStatus);
    if (event.keyCode === 13) {
      this.send();
    }
  }

}
