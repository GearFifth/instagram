import {AfterViewInit, Component, ElementRef, inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
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
export class DiscoverUsersComponent implements OnInit, OnDestroy, AfterViewInit {
  users: User[] = [];
  isLoading: boolean = false;
  loggedUserId: string = '';
  private loadingSubscription?: Subscription;
  private usersSubscription?: Subscription;
  itemsPerPage = 5;

  @ViewChild('wrapperDiv') wrapperDiv!: ElementRef;
  @ViewChild('windowBox') windowBox!: ElementRef;
  shouldCenter = false;

  constructor(
    private authService: AuthService,
    private recommendationService: RecommendationService,
    public infiniteScroll: InfiniteScrollService<User>) {
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.checkIfShouldCenter());
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

  checkIfShouldCenter(): void {
    const wrapperHeight = this.wrapperDiv.nativeElement.scrollHeight;
    const containerHeight = this.windowBox.nativeElement.clientHeight;

    this.shouldCenter = wrapperHeight <= containerHeight;
  }

  onScroll = () => {
    this.infiniteScroll.loadMore((page, size) => this.recommendationService.getPaginatedRecommendedUsers(page, size));
  }
}
