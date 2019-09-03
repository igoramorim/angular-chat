import { Component, OnInit, OnChanges } from '@angular/core';
import { ChatService } from './../services/chat.service';
import { Observable } from 'rxjs';
import { AngularFireList } from 'angularfire2/database';
import { ChatMessage } from './../models/chat-message.model';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  // feed: AngularFireList<ChatMessage>;
  feed: ChatMessage[];

  constructor(private chat: ChatService) { }

  ngOnInit() {
    this.chat.getMessages().valueChanges().subscribe(list => {
      this.feed = list;
    });
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges() {

  }

}
