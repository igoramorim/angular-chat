import { Component, OnInit } from '@angular/core';
import { MessagingService } from './shared/messaging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Chat';

  message;

  constructor(private messagingService: MessagingService) {}

  ngOnInit() {
    const userId = 'angular-chat';
    this.messagingService.requestPermission(userId);
    this.messagingService.receiveMessage();
    this.message = this.messagingService.currentMessage;
  }

}
