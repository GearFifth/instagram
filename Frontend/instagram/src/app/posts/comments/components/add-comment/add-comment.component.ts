import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {CommentService} from "../../comment.service";
import {UserService} from "../../../../users/user.service";
import {AuthService} from "../../../../auth/auth.service";
import {CreateCommentRequestModel} from "../../models/create-comment-request.model";
import {User} from "../../../../users/models/user.model";
import {Post} from "../../../models/post.model";
import {CommentData} from "../../models/comment.model";

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrl: './add-comment.component.css'
})
export class AddCommentComponent implements OnInit, AfterViewInit {
  @Input() parentId: string | undefined = undefined;
  @Input() post!: Post;
  content: string = '';
  @Output() commentAdded = new EventEmitter<CommentData>();

  defaultProfileImagePath: string = '/assets/default-profile-image.png';
  profileImageUrl: SafeUrl | string = this.defaultProfileImagePath;

  loggedUser: User = {} as User;
  public htmlTextArea!: HTMLElement;

  constructor(private commentService: CommentService,
              private sanitizer: DomSanitizer,
              private userService: UserService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.loadLoggedUser();
    this.loadProfileImage();
  }

  ngAfterViewInit() {
    this.htmlTextArea = document.getElementById('comment-textarea') as HTMLElement;
  }

  onSendClick() {
    const createCommentRequest : CreateCommentRequestModel = {
      authorId: this.loggedUser.id,
      content: this.htmlTextArea.innerHTML,
      postId: this.post.id,
      parentCommentId: this.parentId
    };

    this.commentService.create(createCommentRequest).subscribe({
      next: (response: CommentData) => {
        this.commentAdded.emit(response);
        this.htmlTextArea.innerHTML = '';
        console.log("Comment created successfully:", response);
      },
      error: (err) => {
        console.error("Error loading loggedUser:", err);
      }
    });
  }

  loadLoggedUser(){
    const userId = this.authService.getId();
    if(userId === undefined){return;}
    this.userService.getById(userId).subscribe({
      next: (response: User) => {
        this.loggedUser = response;
      },
      error: (err) => {
        console.error("Error loading loggedUser:", err);
      }
    })
  }

  loadProfileImage() {

  }


  goToProfilePage() {
    // this.router.navigate(['/profile', this.loggedUser.email]);
  }
}
