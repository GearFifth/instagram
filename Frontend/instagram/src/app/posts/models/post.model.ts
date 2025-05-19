import {ImageDetails} from "../../shared/images/image-details.model";
import {User} from "../../users/models/user.model";
import {IdReference} from "../../shared/id-reference.model";
import {ReactionType} from "./reaction.model";

export interface Post {
  id: string;
  description: string;
  creationDate: string;
  comments: IdReference[];
  image: ImageDetails | null;
  reactions: { [key: string]: ReactionType };
  author: User;
}
