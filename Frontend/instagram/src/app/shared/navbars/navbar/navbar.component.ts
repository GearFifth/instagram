import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../../auth/auth.service";
import {UserService} from "../../../users/user.service";
import {User} from "../../../users/models/user.model";
import {UserRole} from "../../../users/models/user-role.enum";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  roleName: string = 'USER';
  loggedUser!: User | undefined;

  constructor(
    private authService: AuthService,
    private userService: UserService) {

    this.subscription = this.authService.roleSubject.subscribe((role: UserRole) => {
      this.roleName = role.toString();
    });
  }

  ngOnInit() {
    this.getLoggedUser();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getLoggedUser() {
    const userId = this.authService.getId();
    if (userId) {
      this.userService.getById(userId).subscribe({
        next: (data: User) => {
          this.loggedUser = data;
        }
      });
    }
  }
}
