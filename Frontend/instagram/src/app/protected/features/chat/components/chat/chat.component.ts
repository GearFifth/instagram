import { Component } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  users = [
    { id: "737a4f41-bfc5-40b2-ade3-582314e7b8d7", name: 'Jane' },
    { id: "c5d28102-004d-43ca-9f83-c6deae967aa8", name: 'John' },
    { id: "08729e52-5d32-453d-850d-4fe2316f8950", name: 'Ilija' }
  ];
}
