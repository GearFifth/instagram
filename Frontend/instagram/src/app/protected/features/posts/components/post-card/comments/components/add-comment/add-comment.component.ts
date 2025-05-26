import {AfterViewInit, Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {CommentService} from "../../comment.service";
import {UserService} from "../../../../../../users/user.service";
import {AuthService} from "../../../../../../../../core/services/auth.service";
import {CreateCommentRequestModel} from "../../models/create-comment-request.model";
import {User} from "../../../../../../users/models/user.model";
import {Post} from "../../../../../models/post.model";
import {CommentData} from "../../models/comment.model";
import {ImageService} from "../../../../../../../../core/services/image.service";
import {environment} from "../../../../../../../../../env/env";
import {ROUTE_PATHS} from "../../../../../../../../core/constants/routes";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrl: './add-comment.component.css'
})
export class AddCommentComponent implements OnInit, AfterViewInit {
  private _snackBar = inject(MatSnackBar);
  @Input() parentId: string | undefined = undefined;
  @Input() post!: Post;
  content: string = '';
  @Output() commentAdded = new EventEmitter<CommentData>();

  defaultProfileImagePath: string = '/assets/default-profile-image.png';

  loggedUser: User = {} as User;
  public htmlTextArea!: HTMLElement;

  constructor(private commentService: CommentService,
              private sanitizer: DomSanitizer,
              private userService: UserService,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.loadLoggedUser();
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
        this._snackBar.open("Comment created successfully", "OK");
      },
      error: (err) => {
        this._snackBar.open("Failed to create a comment", "OK");
      }
    });
  }

  loadLoggedUser(){
    const userId = this.authService.getId();
    if(userId === undefined){return;}
    this.userService.getById(userId).subscribe({
      next: (response: User) => {
        this.loggedUser = response;
      }
    })
  }


  goToProfilePage() {
    this.router.navigate([ROUTE_PATHS.USER_PROFILE, this.loggedUser.id] );
  }

  setDefaultProfileImage(event: Event) {
    (event.target as HTMLImageElement).src = this.defaultProfileImagePath;
  }

  protected readonly environment = environment;
}
