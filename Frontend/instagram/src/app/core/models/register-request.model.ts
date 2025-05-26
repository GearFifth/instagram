export interface RegisterRequest {
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  profileImage: Blob | null;
}
