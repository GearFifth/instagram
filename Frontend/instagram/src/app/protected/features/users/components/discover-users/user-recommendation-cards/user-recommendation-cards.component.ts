import {Component, Input} from '@angular/core';
import {Post} from "../../../../posts/models/post.model";
import {User} from "../../../models/user.model";

@Component({
  selector: 'app-user-recommendation-cards',
  templateUrl: './user-recommendation-cards.component.html',
  styleUrl: './user-recommendation-cards.component.css'
})
export class UserRecommendationCardsComponent {
  @Input() users: User[] = [];
  @Input() isLoading: boolean = false;
}
