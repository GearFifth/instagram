import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../users/user.service";
import {User} from "../../../users/models/user.model";
import {AuthService} from "../../../../../core/services/auth.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit{
  users: User[] = []
  loggedUser: User = {} as User;

  constructor(private userService: UserService, private authService: AuthService) {
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    const loggedUserId = this.authService.getId();
    if (loggedUserId === null || loggedUserId === undefined) {
      console.error("User ID is not available.");
      return;
    }

    this.userService.getById(loggedUserId).subscribe((loggedUser: User) => {
      this.loggedUser = loggedUser;
      this.userService.getFollowedUsers(this.loggedUser.id).subscribe((users: User[]) => {
        console.log(users);
        this.users = users;
      })
    })
  }

  // users = [
  //   { id: "737a4f41-bfc5-40b2-ade3-582314e7b8d7", name: 'Jane' },
  //   { id: "c5d28102-004d-43ca-9f83-c6deae967aa8", name: 'John' },
  //   { id: "08729e52-5d32-453d-850d-4fe2316f8950", name: 'Ilija' }
  // ];
}
