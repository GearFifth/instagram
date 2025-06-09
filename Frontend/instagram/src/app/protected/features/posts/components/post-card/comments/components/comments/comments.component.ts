import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommentService} from "../../comment.service";
import {CommentData} from "../../models/comment.model";
import {Post} from "../../../../../models/post.model";
import {User} from "../../../../../../users/models/user.model";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent implements OnInit{
  @Input() post!: Post;
  @Input() loggedUser!: User;
  comments: CommentData[] = [] as CommentData[];

  @Output() commentAdded = new EventEmitter<CommentData>();

  constructor(private commentService: CommentService) {
  }

  ngOnInit() {
    this.loadComments()
  }

  loadComments(){
    this.commentService.getCommentsByPostId(this.post.id).subscribe({
      next: (comments: CommentData[]) => {
        this.comments = comments;
      },
      error: (error) => {
        console.error("Error loading comments:", error);
      }
    });
  }

  onCommentAdded(comment: CommentData) {
    this.loadComments();
    this.commentAdded.emit(comment);
  }
}
