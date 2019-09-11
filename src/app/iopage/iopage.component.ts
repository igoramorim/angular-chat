import { ChatioService } from './../services/chatio.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-iopage',
  templateUrl: './iopage.component.html',
  styleUrls: ['./iopage.component.css']
})
export class IopageComponent implements OnInit {

  constructor(private ioService: ChatioService) { }

  ngOnInit() {
  }

}
