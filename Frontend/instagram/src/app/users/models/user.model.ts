import {UserRole} from "./user-role.enum";
import {ImageDetails} from "../../shared/images/image-details.model";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  role?: UserRole;
  profileImage: ImageDetails;
  followers: string[];
  following: string[];
}
