import {Component, OnInit} from '@angular/core';
import {Message} from "../../models/message.model";
import {ActivatedRoute} from "@angular/router";
import {ChatService} from "../../chat.service";
import {CreateMessageRequest} from "../../models/create-message-request.model";
import {AuthService} from "../../../../../core/services/auth.service";

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.css'
})
export class ChatWindowComponent implements OnInit{
  messages: Message[] = [];
  loggedUserId: string | undefined;
  userId!: string;
  newMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.userId = paramMap.get('userId')!;

      this.loggedUserId = this.authService.getId();
      if (this.loggedUserId === null || this.loggedUserId === undefined) {
        console.error("User ID is not available.");
        return;
      }

      this.chatService.getMessagesBetweenUsers(this.loggedUserId, this.userId).subscribe({
        next: (messages: Message[]) => {
          this.messages = messages;
        }
      })
    });

    this.chatService.connect();
    this.chatService.onMessage().subscribe((message: Message) => {
      const isBetweenLoggedInUsers =
        (message.sender.id === this.userId && message.receiver.id === this.loggedUserId) ||
        (message.sender.id === this.loggedUserId && message.receiver.id === this.userId);

      if (isBetweenLoggedInUsers) {
        this.messages.push(message);
      }
    });
  }

  sendMessage() {
    if (!this.newMessage.trim() || this.loggedUserId == undefined) return;

    const request: CreateMessageRequest = {
      senderId: this.loggedUserId,
      receiverId: this.userId,
      content: this.newMessage
    };

    this.chatService.sendMessage(request);
    this.newMessage = '';
  }
}
