export interface Reaction {
  userId: string;
  type: ReactionType;
}

export enum ReactionType {
  Like = 'Like',
  Dislike = 'Dislike',
  Love = 'Love',
  Laugh = 'Laugh',
  Wow = 'Wow',
  Angry = 'Angry',
  Sad = 'Sad'
}
