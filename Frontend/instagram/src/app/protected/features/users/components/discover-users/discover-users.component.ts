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
export class DiscoverUsersComponent implements OnInit, OnDestroy {
  users: User[] = [];
  isLoading: boolean = false;
  loggedUserId: string = '';
  private subscriptions: Subscription[] = [];
  itemsPerPage = 5;

  @ViewChild('wrapperDiv') wrapperDiv!: ElementRef;
  @ViewChild('contentDiv') contentDiv!: ElementRef;
  shouldCenter = false;

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

    this.subscriptions.push(
      this.infiniteScroll.items$.subscribe(users => {
        this.users = users
        setTimeout(() => this.checkIfShouldCenter());
      }),
      this.infiniteScroll.isLoading$.subscribe(isLoading => this.isLoading = isLoading)
    );

  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  checkIfShouldCenter(): void {
    const wrapperHeight = this.wrapperDiv.nativeElement.scrollHeight;
    const contentHeight = this.contentDiv.nativeElement.clientHeight;

    this.shouldCenter = contentHeight < wrapperHeight;
  }

  onScroll = () => {
    this.infiniteScroll.loadMore((page, size) => this.recommendationService.getPaginatedRecommendedUsers(page, size));
  }
}
