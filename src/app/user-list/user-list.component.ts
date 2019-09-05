import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  users: User[];

  constructor(private chat: ChatService) {
    this.chat.getUsers().valueChanges().subscribe(users => {
      const u: any[] = users;
      // this.users = u.filter((us) => {
      //   return us.status !== 'offline';
      // });
      this.users = u;
      console.log(this.users);
    });
  }
}
