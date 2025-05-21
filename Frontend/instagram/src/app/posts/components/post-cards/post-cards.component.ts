import {Component, Input} from '@angular/core';
import {Post} from "../../models/post.model";

@Component({
  selector: 'app-post-cards',
  templateUrl: './post-cards.component.html',
  styleUrl: './post-cards.component.css'
})
export class PostCardsComponent {
  @Input() posts: Post[] = [];
}
