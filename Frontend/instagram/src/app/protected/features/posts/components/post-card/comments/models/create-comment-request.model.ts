export interface CreateCommentRequestModel {
  content: string;
  postId: string;
  parentCommentId?: string;
  authorId: string;
}
