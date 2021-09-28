import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MessageService } from './messages.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit {
  showMessages = false;
  error$: Observable<string[]>;

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.error$ = this.messageService.error$.pipe(tap(() => this.showMessages = true));
  }

  onClose() {
    this.showMessages = false;
  }
}
