export interface CreatePostRequest {
  description: string;
  authorId: string;
  image: File | null;
}
