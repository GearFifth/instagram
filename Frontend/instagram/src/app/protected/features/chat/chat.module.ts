import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './components/chat/chat.component';
import { ChatWindowComponent } from './components/chat-window/chat-window.component';
import {SharedModule} from "../../../shared/shared.module";
import {RouterLink, RouterOutlet} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {ChatRoutingModule} from "./chat-routing.module";



@NgModule({
  declarations: [
    ChatComponent,
    ChatWindowComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterOutlet,
    RouterLink,
    FormsModule,
    ChatRoutingModule
  ]
})
export class ChatModule { }
