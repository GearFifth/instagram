import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../models/post.model";
import {Reaction, ReactionType} from "../../models/reaction.model";
import {PostService} from "../../post.service";
import {AuthService} from "../../../../../core/services/auth.service";

@Component({
  selector: 'app-reactions',
  templateUrl: './reactions.component.html',
  styleUrl: './reactions.component.css'
})
export class ReactionsComponent implements OnInit {
  @Input() post!: Post;
  reactionsData: { name: ReactionType, icon: string, count: number }[] = [];
  currentUserReaction: ReactionType | null = null;
  loggedUserId: string;

  constructor(private postService: PostService, private authService: AuthService) {
    this.loggedUserId = authService.getId() || "";
  }

  ngOnInit() {
    this.initializeReactionsData();
  }

  initializeReactionsData() {
    const reactionTypes = Object.values(ReactionType);
    this.reactionsData = reactionTypes.map(type => {
      const count = Object.values(this.post.reactions).filter(reaction => reaction === type).length;
      if (this.loggedUserId.length > 0 && this.post.reactions[this.loggedUserId] === type) {
        this.currentUserReaction = type;
      }
      return { name: type, icon: this.getReactionIcon(type), count };
    });
  }

  getReactionIcon(reactionType: ReactionType): string {
    const icons = {
      [ReactionType.Like]: 'thumb_up',
      [ReactionType.Dislike]: 'thumb_down',
      [ReactionType.Love]: 'favorite',
      [ReactionType.Laugh]: 'sentiment_very_satisfied',
      [ReactionType.Wow]: 'emoji_objects',
      [ReactionType.Angry]: 'sentiment_dissatisfied',
      [ReactionType.Sad]: 'sentiment_very_dissatisfied',
    };

    return icons[reactionType];
  }

  react(reactionType: ReactionType) {

    const reaction: Reaction = {
      userId: this.loggedUserId,
      type: reactionType
    };

    this.currentUserReaction === reactionType ? this.removeReaction(reaction) : this.addReaction(reaction);
  }

  addReaction(reaction: Reaction) {
    this.postService.addReaction(this.post.id, reaction).subscribe({
      next: () => {
        this.currentUserReaction = reaction.type;
        this.post.reactions[this.loggedUserId] = reaction.type;
        this.initializeReactionsData();
      }
    });
  }

  removeReaction(reaction: Reaction) {
    this.postService.removeReaction(this.post.id, reaction).subscribe({
      next: () => {
        this.currentUserReaction = null;
        delete this.post.reactions[this.loggedUserId];
        this.initializeReactionsData();
      }
    });
  }

  getFilteredReactionsData() {
    return this.reactionsData.filter(reaction => reaction.count > 0);
  }
}
