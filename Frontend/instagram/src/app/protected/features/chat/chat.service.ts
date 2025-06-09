import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {Message} from "./models/message.model";
import {CreateMessageRequest} from "./models/create-message-request.model";
import { Client, IMessage, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import {environment} from "../../../../env/env";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private stompClient!: Client;
  private messageSubject = new Subject<Message>();

  constructor(private http: HttpClient) {
  }

  connect(): void {
    const socket = new SockJS(`${environment.webSocketHost}`);
    this.stompClient = new Client({
      webSocketFactory: () => socket as WebSocket,
      reconnectDelay: 5000,
      debug: (str) => console.log(str)
    });

    this.stompClient.onConnect = () => {
      this.stompClient.subscribe('/messages', (message: any) => {
        const payload: Message = JSON.parse(message.body);
        this.messageSubject.next(payload);
      });
    };

    this.stompClient.activate();
  }

  sendMessage(request: CreateMessageRequest): void {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.publish({
        destination: '/app/chat',
        body: JSON.stringify(request)
      });
    }
  }

  onMessage(): Observable<Message> {
    return this.messageSubject.asObservable();
  }

  getMessagesBetweenUsers(user1Id: string, user2Id: string): Observable<Message[]> {
    return this.http.get<Message[]>(`chat/history?user1Id=${user1Id}&user2Id=${user2Id}`);
  }
}
