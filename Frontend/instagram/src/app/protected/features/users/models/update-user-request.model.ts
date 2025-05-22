import {UserRole} from "./user-role.enum";
import {ImageDetails} from "../../../../shared/models/image-details.model";

export interface UpdateUserRequest {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  profileImageId: string;
}
