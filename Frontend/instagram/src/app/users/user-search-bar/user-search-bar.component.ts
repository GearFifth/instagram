import {Component, OnInit} from '@angular/core';
import {User} from "../models/user.model";
import {debounceTime, Subject} from "rxjs";
import {UserService} from "../user.service";

@Component({
  selector: 'app-user-search-bar',
  templateUrl: './user-search-bar.component.html',
  styleUrl: './user-search-bar.component.css'
})
export class UserSearchBarComponent implements OnInit {
  searchTerm = '';
  filteredUsers: User[] = [];
  isLoading = false;

  private searchSubject = new Subject<string>();

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.searchSubject.pipe(debounceTime(300)).subscribe(term => {
      this.searchUsers(term);
    });
  }

  onSearchChange(term: string) {
    this.searchSubject.next(term);
  }

  clearSearch() {
    this.searchTerm = '';
    this.filteredUsers = [];
  }

  private searchUsers(term: string) {
    if (!term || term.length < 2) {
      this.filteredUsers = [];
      return;
    }

    this.isLoading = true;
    this.userService.searchUsers(term).subscribe({
      next: (users) => {
        this.filteredUsers = users;
        this.isLoading = false;
      },
      error: () => {
        this.filteredUsers = [];
        this.isLoading = false;
      }
    });
  }

}
