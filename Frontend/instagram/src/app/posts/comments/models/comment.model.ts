import {User} from "../../../users/models/user.model";
import {IdReference} from "../../../shared/id-reference.model";

export interface CommentData {
  id: string;
  content: string;
  post: IdReference;
  parentCommentId: IdReference | null;
  replies: IdReference[];
  author: User;
  creationDate: string;
}
