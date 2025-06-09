
export interface UpdateUserRequest {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  profileImage: File | null;
}
