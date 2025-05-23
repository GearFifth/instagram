import {UserRole} from "./user-role.enum";
import {ImageDetails} from "../../../../shared/models/image-details.model";

// todo: reuse interface to get Id
export interface UpdateUserRequest {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  profileImageId: string;
}
