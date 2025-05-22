import {Component, ElementRef, inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from "rxjs";
import {AuthService} from "../../../../../core/services/auth.service";
import {InfiniteScrollService} from "../../../../../core/services/infinite-scroll.service";
import {RecommendationService} from "../../recommendation.service";
import {User} from "../../models/user.model";

@Component({
  selector: 'app-discover-users',
  templateUrl: './discover-users.component.html',
  styleUrl: './discover-users.component.css',
  providers: [InfiniteScrollService<User>]
})
export class DiscoverUsersComponent implements OnInit, OnDestroy {
  users: User[] = [];
  isLoading: boolean = false;
  loggedUserId: string = '';
  private loadingSubscription?: Subscription;
  private usersSubscription?: Subscription;
  itemsPerPage = 5;

  constructor(
    private authService: AuthService,
    private recommendationService: RecommendationService,
    public infiniteScroll: InfiniteScrollService<User>) {
  }

  ngOnInit() {
    const loggedUserId = this.authService.getId();
    if (!loggedUserId) {
      console.error("User not logged in");
      return;
    }
    this.loggedUserId = loggedUserId;
    this.infiniteScroll.loadInitial((page, size) => this.recommendationService.getPaginatedRecommendedUsers(page, size), this.itemsPerPage);
    this.usersSubscription = this.infiniteScroll.items$.subscribe(users => this.users = users);
    this.loadingSubscription = this.infiniteScroll.isLoading$.subscribe(isLoading => this.isLoading = isLoading);
  }

  ngOnDestroy() {
    this.loadingSubscription?.unsubscribe();
    this.usersSubscription?.unsubscribe();
  }

  onScroll = () => {
    this.infiniteScroll.loadMore((page, size) => this.recommendationService.getPaginatedRecommendedUsers(page, size));
  }
}
