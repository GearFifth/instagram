import {User} from "../../users/models/user.model";

export interface Comment{
  id: string;
  content: string;
  creationDate: Date;
  author: User;
}
