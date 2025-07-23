export type CommentType = 'line' | 'block' | 'jsdoc';

export interface CommentBlock {
  value: string;
  type: CommentType;
  start: number;
  end: number;
}
