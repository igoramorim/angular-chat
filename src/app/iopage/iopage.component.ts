import { ChatioService } from './../services/chatio.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-iopage',
  templateUrl: './iopage.component.html',
  styleUrls: ['./iopage.component.css']
})
export class IopageComponent {

  user: string;
  room: string;
  messageText: string;
  messageArray: Array<{ user: string, message: string }> = [];

  constructor(
    private ioService: ChatioService,
    private router: Router
  ) {

    this.ioService.newUserJoined()
      .subscribe((data) => {
        this.messageArray.push(data);
      });

    this.ioService.userLeftRoom()
      .subscribe((data) => {
        this.messageArray.push(data);
      });

    this.ioService.newMessageReceived()
      .subscribe((data) => {
        this.messageArray.push(data);
      });
  }

  join() {
    this.ioService.joinRoom({ user: this.user, room: this.room });
  }

  leave() {
    this.ioService.leaveRoom({ user: this.user, room: this.room });
  }

  sendMessage() {
    this.ioService.sendMessage({ user: this.user, room: this.room, message: this.messageText });
  }

  navigate() {
    this.router.navigate(['login']);
  }

}
