import {IdReference} from "../../../../shared/models/id-reference.model";
import {User} from "../../users/models/user.model";

export interface Message {
  sender: User,
  receiver: User,
  content: string,
  timestamp: string
}
