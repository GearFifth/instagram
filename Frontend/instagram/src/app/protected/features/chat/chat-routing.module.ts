import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ChatComponent} from "./components/chat/chat.component";
import {ChatWindowComponent} from "./components/chat-window/chat-window.component";

const routes: Routes = [
  {
    path: '',
    component: ChatComponent,
    children: [
      { path: ':userId', component: ChatWindowComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule {}
