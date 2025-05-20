import {Component, Input} from '@angular/core';
import {CommentData} from "../../models/comment.model";
import {Post} from "../../../models/post.model";

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrl: './comment-list.component.css'
})
export class CommentListComponent{
  @Input() comments: CommentData[] = [];
  @Input() post!: Post;
  @Input() level: number = 0
}
