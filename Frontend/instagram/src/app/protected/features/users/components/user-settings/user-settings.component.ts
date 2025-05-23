import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {User} from "../../models/user.model";
import {UserService} from "../../user.service";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../../../../shared/components/confirm-dialog/confirm-dialog.component";
import {AuthService} from "../../../../../core/services/auth.service";

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrl: './user-settings.component.css'
})
export class UserSettingsComponent implements OnInit{
  user: User = {} as User;
  readonly dialog = inject(MatDialog);

  constructor(private route: ActivatedRoute, private userService: UserService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.getLoggedUser();
  }

  getLoggedUser(){
    this.userService.getLoggedUser().subscribe({
      next: (user: User) => {
        this.user = user;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  onRemoveAccountClicked(){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: 'Are you sure you want to delete this user?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        console.log("Successfully removed user");
        this.removeUser();
      }
    });
  }

  removeUser(){
    this.userService.remove(this.user.id).subscribe({
      next: () => {
        this.authService.cleanLocalStorage();
      },
      error: () => {
        console.log("Error occured");
      }
    })
  }

  onChangePasswordClicked(){

  }
}
