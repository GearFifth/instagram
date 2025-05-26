export interface CreatePostRequest {
  description: string;
  authorId: string;
  image: Blob | null;
}
